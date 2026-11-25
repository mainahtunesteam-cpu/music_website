import { NextRequest, NextResponse } from 'next/server';
import { getCustomProjects, deleteCustomProject } from '@/lib/projectsRegistry';
import {
  artworkCatalog as baselineArtworks,
  audioCatalog as baselineAudio,
  videoCatalog as baselineVideos,
  webProjectsCatalog as baselineWeb,
  promotionCaseStudies as baselineCampaigns,
} from '@/data/portfolio';

export async function GET() {
  try {
    const customProjects = await getCustomProjects();

    // Transform custom artworks into ArtworkProject structure
    const customArtworks = customProjects
      .filter((p) => p.category === 'artwork')
      .map((p) => ({
        id: p.id,
        title: p.title,
        artist: p.artist,
        style: p.style || 'Custom Commission',
        image: p.fileUrl, // Full permanent external URL
        concept: p.concept || p.description || 'Custom client commission',
        deliverables: p.deliverables || ['Digital Master', 'Commercial License'],
      }));

    // Transform custom audio into AudioTrackProject structure
    const customAudio = customProjects
      .filter((p) => p.category === 'audio')
      .map((p) => ({
        id: p.id,
        title: p.title,
        artist: p.artist,
        type: 'mastering' as const,
        src: p.fileUrl,
        format: p.format || 'Commercial Streaming Master',
        lufs: p.lufs || '-9.0 LUFS',
        description: p.description || 'Custom audio mastering commission',
        engineerNotes: 'Processed with analogue dynamic EQ and precision limiting.',
        beforeNotes: 'Raw mix before mastering enhancement.',
        afterNotes: 'Mastered with commercial loudness and punch.',
      }));

    // Transform custom videos into VideoProject structure
    const customVideos = customProjects
      .filter((p) => p.category === 'video')
      .map((p) => ({
        id: p.id,
        title: p.title,
        type: 'AI-Assisted Music Video',
        videoSrc: p.fileUrl,
        description: p.description || 'Custom music video reel commission',
        duration: p.duration || '02:30',
        aspectRatio: '16:9',
        relatedServiceSlug: 'ai-assisted-music-videos',
      }));

    return NextResponse.json({
      success: true,
      artworks: [...customArtworks, ...baselineArtworks],
      audio: [...customAudio, ...baselineAudio],
      videos: [...customVideos, ...baselineVideos],
      websites: baselineWeb,
      campaigns: baselineCampaigns,
      customProjects,
    });
  } catch (err: any) {
    console.error('Error in /api/portfolio GET:', err);
    return NextResponse.json(
      {
        success: false,
        artworks: baselineArtworks,
        audio: baselineAudio,
        videos: baselineVideos,
        websites: baselineWeb,
        campaigns: baselineCampaigns,
        customProjects: [],
      },
      { status: 200 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing project ID in delete request' }, { status: 400 });
    }

    const updated = await deleteCustomProject(id);
    return NextResponse.json({
      success: true,
      message: `Project ${id} removed successfully.`,
      customProjects: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Delete failed' }, { status: 500 });
  }
}
