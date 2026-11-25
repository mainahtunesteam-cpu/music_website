import os
import sys
import numpy as np
from scipy.io import wavfile
import subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
SR = 44100

def create_synth_track(track_type, duration=16.0):
    t = np.linspace(0, duration, int(SR * duration), endpoint=False)
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    
    if track_type == 'braincrackerz': # Hip Hop 90 BPM
        bpm = 90
        beat_dur = 60.0 / bpm
        # 808 Sub bass & Kick
        for beat in range(int(duration / beat_dur)):
            t_beat = beat * beat_dur
            # Kick
            mask = (t >= t_beat) & (t < t_beat + 0.35)
            dt = t[mask] - t_beat
            kick = np.sin(2 * np.pi * (140 * np.exp(-dt * 25) + 42) * dt) * np.exp(-dt * 9)
            left[mask] += kick * 0.7
            right[mask] += kick * 0.7
            
            # Snare on 2 and 4
            if beat % 2 == 1:
                s_mask = (t >= t_beat) & (t < t_beat + 0.25)
                s_dt = t[s_mask] - t_beat
                noise = (np.random.rand(len(s_dt)) * 2 - 1) * np.exp(-s_dt * 18)
                snare_tone = np.sin(2 * np.pi * 220 * s_dt) * np.exp(-s_dt * 22)
                left[s_mask] += (noise * 0.4 + snare_tone * 0.3)
                right[s_mask] += (noise * 0.4 + snare_tone * 0.3)
        
        # 808 sub bassline note progression: A1 (55Hz), F1 (43.6Hz), C2 (65.4Hz), G1 (49Hz)
        chord_times = [0, 4 * beat_dur, 8 * beat_dur, 12 * beat_dur]
        chord_freqs = [55.0, 43.65, 65.41, 49.0]
        for ct, cf in zip(chord_times, chord_freqs):
            m = (t >= ct) & (t < ct + 4 * beat_dur)
            dt = t[m] - ct
            bass = np.sin(2 * np.pi * cf * dt) * 0.6 + np.sin(2 * np.pi * (cf * 2) * dt) * 0.25
            left[m] += bass
            right[m] += bass
            
        # Hi-hats 16th notes
        sixteenth = beat_dur / 4.0
        for h in range(int(duration / sixteenth)):
            ht = h * sixteenth
            m = (t >= ht) & (t < ht + 0.04)
            dt = t[m] - ht
            hh = (np.random.rand(len(dt)) * 2 - 1) * np.exp(-dt * 70) * (0.15 if h % 2 == 0 else 0.08)
            left[m] += hh * 0.8
            right[m] += hh * 1.2
            
    elif track_type == 'bibilon': # Atmospheric electronic 124 BPM
        bpm = 124
        beat_dur = 60.0 / bpm
        # Lush synth chords (Dm, Bb, F, C)
        chord_notes = [
            [146.83, 220.0, 261.63, 349.23], # Dm
            [116.54, 174.61, 233.08, 293.66], # Bb
            [174.61, 220.0, 261.63, 329.63], # F
            [130.81, 164.81, 196.0, 246.94]  # C
        ]
        for i, notes in enumerate(chord_notes):
            ct = i * (4 * beat_dur)
            m = (t >= ct) & (t < ct + 4 * beat_dur)
            dt = t[m] - ct
            for f in notes:
                saw_l = 0.08 * (2 * ((f * dt) % 1) - 1)
                saw_r = 0.08 * (2 * (((f * 1.004) * dt) % 1) - 1)
                left[m] += saw_l
                right[m] += saw_r
                
        # Kick every beat
        for b in range(int(duration / beat_dur)):
            bt = b * beat_dur
            m = (t >= bt) & (t < bt + 0.2)
            dt = t[m] - bt
            k = np.sin(2 * np.pi * (160 * np.exp(-dt * 30) + 50) * dt) * np.exp(-dt * 12)
            left[m] += k * 0.6
            right[m] += k * 0.6
            
    elif track_type == 'blinding_love': # Pop / R&B 100 BPM
        bpm = 100
        beat_dur = 60.0 / bpm
        # Electric Piano chords
        ep_chords = [
            [220.0, 261.63, 329.63, 392.0], # Am7
            [174.61, 220.0, 261.63, 329.63], # Fmaj7
            [130.81, 164.81, 196.0, 246.94], # Cmaj7
            [196.0, 246.94, 293.66, 392.0]   # G7
        ]
        for i, notes in enumerate(ep_chords):
            ct = i * (4 * beat_dur)
            m = (t >= ct) & (t < ct + 4 * beat_dur)
            dt = t[m] - ct
            for f in notes:
                bell = (np.sin(2 * np.pi * f * dt) + 0.4 * np.sin(2 * np.pi * f * 2 * dt)) * np.exp(-dt * 1.2) * 0.15
                left[m] += bell
                right[m] += bell
        # Bass & Drums
        for b in range(int(duration / beat_dur)):
            bt = b * beat_dur
            if b % 2 == 0: # Kick
                m = (t >= bt) & (t < bt + 0.3)
                dt = t[m] - bt
                k = np.sin(2 * np.pi * (130 * np.exp(-dt * 20) + 55) * dt) * np.exp(-dt * 10) * 0.6
                left[m] += k
                right[m] += k
            else: # Snare
                m = (t >= bt) & (t < bt + 0.2)
                dt = t[m] - bt
                sn = (np.random.rand(len(dt)) * 2 - 1) * np.exp(-dt * 25) * 0.3
                left[m] += sn
                right[m] += sn

    elif track_type == 'lets_go_move_around': # Funk Disco 122 BPM
        bpm = 122
        beat_dur = 60.0 / bpm
        # Four on floor
        for b in range(int(duration / beat_dur)):
            bt = b * beat_dur
            m = (t >= bt) & (t < bt + 0.25)
            dt = t[m] - bt
            k = np.sin(2 * np.pi * (150 * np.exp(-dt * 28) + 58) * dt) * np.exp(-dt * 11) * 0.7
            left[m] += k
            right[m] += k
            # Offbeat hat
            o_bt = bt + beat_dur / 2.0
            om = (t >= o_bt) & (t < o_bt + 0.12)
            odt = t[om] - o_bt
            oh = (np.random.rand(len(odt)) * 2 - 1) * np.exp(-odt * 35) * 0.25
            left[om] += oh * 0.7
            right[om] += oh * 1.3
        # Funky Bassline riff
        riff = [98.0, 116.54, 130.81, 146.83, 130.81, 116.54, 98.0, 73.42]
        step = beat_dur / 2.0
        for i, note in enumerate(riff * 4):
            st = i * step
            if st < duration:
                m = (t >= st) & (t < st + step * 0.8)
                dt = t[m] - st
                b_wave = (np.sin(2 * np.pi * note * dt) + 0.5 * np.sin(2 * np.pi * note * 2 * dt)) * np.exp(-dt * 6) * 0.4
                left[m] += b_wave
                right[m] += b_wave

    elif track_type == 'oath_of_light': # Cinematic Orchestral
        # Lush string swell in D minor
        d_chord = [73.42, 110.0, 146.83, 220.0, 293.66, 369.99, 440.0]
        for f in d_chord:
            swell = np.sin(2 * np.pi * f * t) * (0.5 - 0.5 * np.cos(2 * np.pi * t / duration)) * 0.08
            detune = np.sin(2 * np.pi * (f * 1.003) * t) * (0.5 - 0.5 * np.cos(2 * np.pi * t / duration)) * 0.08
            left += swell
            right += detune
        # Timpani roll at 8s
        m = (t >= 7.5) & (t < 11.5)
        dt = t[m] - 7.5
        timp = np.sin(2 * np.pi * (65 + 10 * np.exp(-dt)) * dt) * (dt / 4.0) * np.exp(-dt * 0.8) * 0.5
        left[m] += timp
        right[m] += timp

    else: # carousel_of_emotion (Acoustic Guitar & Piano)
        # Fingerpicking pattern
        chords = [
            [130.81, 164.81, 196.0, 261.63], # C
            [110.0, 130.81, 164.81, 220.0],  # Am
            [87.31, 130.81, 174.61, 220.0],  # F
            [98.0, 123.47, 146.83, 196.0]   # G
        ]
        note_dur = 0.5
        for c_idx, chord in enumerate(chords):
            for i, note in enumerate(chord * 2):
                nt = (c_idx * 4.0) + (i * note_dur)
                if nt < duration:
                    m = (t >= nt) & (t < nt + 1.2)
                    dt = t[m] - nt
                    string = (np.sin(2 * np.pi * note * dt) + 0.3 * np.sin(2 * np.pi * note * 3 * dt)) * np.exp(-dt * 3.5) * 0.18
                    left[m] += string * 0.8
                    right[m] += string * 1.1

    # Master limiter & normalization to -1.0 dBFS
    max_val = max(np.max(np.abs(left)), np.max(np.abs(right)), 1e-6)
    left = (left / max_val) * 0.88
    right = (right / max_val) * 0.88
    
    # Interleave to stereo 16-bit PCM
    stereo = np.column_stack((left, right))
    return (stereo * 32767).astype(np.int16)

def main():
    os.makedirs('public/audio', exist_ok=True)
    tracks = [
        ('az-alwayz-braincrackerz', 'braincrackerz'),
        ('bibilon', 'bibilon'),
        ('blinding-love', 'blinding_love'),
        ('michelle-bond-lets-go-move-around', 'lets_go_move_around'),
        ('oath-of-light', 'oath_of_light'),
        ('carousel-of-emotion', 'carousel_of_emotion')
    ]
    
    for filename, track_type in tracks:
        wav_path = f'public/audio/{filename}.wav'
        mp3_path = f'public/audio/{filename}.mp3'
        
        print(f"Synthesizing {filename}...")
        audio_data = create_synth_track(track_type)
        wavfile.write(wav_path, SR, audio_data)
        
        # Convert to high-quality MP3 using ffmpeg
        cmd = [FFMPEG, '-y', '-i', wav_path, '-b:a', '192k', mp3_path]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Generated: {mp3_path} ({os.path.getsize(mp3_path)} bytes)")

if __name__ == '__main__':
    main()
