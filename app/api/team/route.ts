import { NextRequest, NextResponse } from 'next/server';
import { uploadToStorage } from '@/lib/storage';
import {
  getCustomTeamMembers,
  saveCustomTeamMember,
  deleteCustomTeamMember,
} from '@/lib/teamRegistry';
import { teamMembers as baselineTeam, TeamMember } from '@/data/team';

export async function GET() {
  try {
    const customTeam = await getCustomTeamMembers();
    const customIds = new Set(customTeam.map((m) => m.id));
    const merged = [...customTeam, ...baselineTeam.filter((m) => !customIds.has(m.id))];

    // Guarantee the Founder is sorted to the top
    merged.sort((a, b) => {
      const aIsFounder = a.role.toLowerCase().includes('founder') || a.name.toLowerCase().includes('amelia');
      const bIsFounder = b.role.toLowerCase().includes('founder') || b.name.toLowerCase().includes('amelia');
      if (aIsFounder && !bIsFounder) return -1;
      if (!aIsFounder && bIsFounder) return 1;
      return 0;
    });

    return NextResponse.json({
      success: true,
      teamMembers: merged,
      customTeamMembers: customTeam,
      baselineCount: baselineTeam.length,
      customCount: customTeam.length,
    });
  } catch (err: any) {
    console.error('Error fetching team members:', err);
    return NextResponse.json(
      {
        success: false,
        teamMembers: baselineTeam,
        customTeamMembers: [],
      },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photo = formData.get('photo') as File | null;
    const name = (formData.get('name') as string)?.trim();
    const role = (formData.get('role') as string)?.trim();
    const department = (formData.get('department') as string)?.trim() || 'Creative & Operational Roster';
    const bio = (formData.get('bio') as string)?.trim() || 'Creative specialist at Mainahtunes Team.';
    const credentialsRaw = formData.get('credentials') as string | null;

    const existingId = (formData.get('id') as string)?.trim();
    const existingImage = (formData.get('existingImage') as string)?.trim();

    if (!name || !role) {
      return NextResponse.json(
        { error: 'Name and Role are required to add or update a team member.' },
        { status: 400 }
      );
    }

    let imageUrl = existingImage || '/team/amelia-clarke.jpeg';

    // 1. Upload photo to permanent external cloud storage if provided
    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadToStorage(buffer, photo.name, 'artwork', photo.type);
      imageUrl = uploadResult.url;
    }

    // 2. Parse credentials / responsibilities
    let credentials: string[] = [];
    if (credentialsRaw) {
      try {
        const parsed = JSON.parse(credentialsRaw);
        if (Array.isArray(parsed)) credentials = parsed;
      } catch {
        credentials = credentialsRaw
          .split('\n')
          .flatMap((line) => line.split(','))
          .map((c) => c.trim())
          .filter(Boolean);
      }
    }

    if (credentials.length === 0) {
      credentials = [
        'Creative Direction & Project Delivery',
        'Direct Client Communication & Support',
        'Quality Assurance & Milestone Review',
      ];
    }

    // 3. Create or update structured TeamMember record
    const memberId = existingId || `member-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString(36)}`;
    const newMember: TeamMember = {
      id: memberId,
      name,
      role,
      department,
      image: imageUrl,
      bio,
      credentials,
    };

    // 4. Save to permanent registry
    const updated = await saveCustomTeamMember(newMember);

    return NextResponse.json({
      success: true,
      member: newMember,
      teamMembers: updated,
      message: `Team member "${newMember.name}" published successfully!`,
    });
  } catch (err: any) {
    console.error('Error adding team member:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to add team member.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing team member ID in delete request.' }, { status: 400 });
    }

    const updated = await deleteCustomTeamMember(id);

    return NextResponse.json({
      success: true,
      message: `Team member ${id} removed successfully.`,
      customTeamMembers: updated,
    });
  } catch (err: any) {
    console.error('Error deleting team member:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete team member.' }, { status: 500 });
  }
}
