import os
import math
import numpy as np
from PIL import Image, ImageDraw
import subprocess
import imageio_ffmpeg
from scipy.io import wavfile

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

def generate_video(title, artist, tag, out_path, audio_track_path, duration=8.0, fps=24):
    width, height = 960, 540
    total_frames = int(duration * fps)
    
    # We will write frames to ffmpeg via pipe
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    temp_video = out_path + '.temp.mp4'
    
    cmd_video = [
        FFMPEG, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{width}x{height}',
        '-pix_fmt', 'rgb24',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        temp_video
    ]
    
    proc = subprocess.Popen(cmd_video, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    print(f"Rendering frames for {title}...")
    for frame_idx in range(total_frames):
        t = frame_idx / fps
        progress = frame_idx / total_frames
        
        # Create frame
        img = Image.new('RGB', (width, height), (8, 12, 22))
        draw = ImageDraw.Draw(img)
        
        # Center glow
        cx, cy = width // 2, height // 2
        pulse = math.sin(t * 3.0) * 15
        sun_r = int(75 + pulse)
        
        # Draw concentric animated rings
        for r_ring in range(220, 80, -25):
            angle = (t * 40.0) % 360
            draw.ellipse([cx - r_ring, cy - r_ring, cx + r_ring, cy + r_ring], outline=(244, 119, 19, 50), width=2)
            
        # Draw central orb
        draw.ellipse([cx - sun_r, cy - sun_r, cx + sun_r, cy + sun_r], fill=(244, 119, 19))
        draw.ellipse([cx - (sun_r - 20), cy - (sun_r - 20), cx + (sun_r - 20), cy + (sun_r - 20)], fill=(255, 175, 50))
        
        # Draw animated audio visualizer bars across bottom
        bar_count = 32
        bar_w = 14
        start_x = (width - (bar_count * (bar_w + 6))) // 2
        for b in range(bar_count):
            bar_h = int(20 + 75 * abs(math.sin(t * 4.0 + b * 0.35)))
            bx = start_x + b * (bar_w + 6)
            by = height - 120
            draw.rectangle([bx, by - bar_h, bx + bar_w, by], fill=(244, 119, 19))
            
        # Agency Header
        draw.text((40, 35), "MAINAHTUNESTEAM AI VISUAL PRODUCTION", fill=(244, 119, 19))
        draw.text((width - 240, 35), "OFFICIAL AI VIDEO REEL", fill=(180, 190, 205))
        draw.line([(40, 58), (width - 40, 58)], fill=(30, 45, 70), width=1)
        
        # Title and Artist
        draw.text((40, height - 75), title, fill=(255, 255, 255))
        draw.text((40, height - 50), f"DIRECTION: {artist} · {tag}", fill=(244, 119, 19))
        
        # Write bytes
        proc.stdin.write(img.tobytes())
        
    proc.stdin.close()
    proc.wait()
    
    # Now merge video with audio using ffmpeg
    cmd_mux = [
        FFMPEG, '-y',
        '-i', temp_video,
        '-i', audio_track_path,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-shortest',
        out_path
    ]
    subprocess.run(cmd_mux, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    if os.path.exists(temp_video):
        os.remove(temp_video)
        
    print(f"Produced video: {out_path} ({os.path.getsize(out_path)} bytes)")

def main():
    os.makedirs('public', exist_ok=True)
    os.makedirs('public/videos', exist_ok=True)
    
    # Video 1: /ai-music-video-sample.mp4
    generate_video(
        title="AI-ASSISTED MUSIC VIDEO — PORTFOLIO SAMPLE 01",
        artist="MAINAHTUNESTEAM VISUAL LAB",
        tag="GENERATIVE 3D CINEMATOGRAPHY",
        out_path="public/ai-music-video-sample.mp4",
        audio_track_path="public/audio/bibilon.wav",
        duration=6.0
    )
    
    # Video 2: /videos/love-kills.mp4
    generate_video(
        title="LOVE KILLS — OFFICIAL AI MUSIC VIDEO",
        artist="MAINAHTUNESTEAM PRODUCTION",
        tag="CINEMATIC CHARACTER MOTION",
        out_path="public/videos/love-kills.mp4",
        audio_track_path="public/audio/az-alwayz-braincrackerz.wav",
        duration=6.0
    )

if __name__ == '__main__':
    main()
