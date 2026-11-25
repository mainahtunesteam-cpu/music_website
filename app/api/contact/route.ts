import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Spam honeypot detection
    if (data._hp || data.website_url) {
      // Quietly return success to fool bots
      return NextResponse.json({ success: true, message: 'Enquiry received' });
    }

    const {
      name,
      artistOrBusiness,
      email,
      country,
      service,
      budget,
      deadline,
      referenceLinks,
      message,
    } = data;

    // Field validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and project description are required fields.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // In a live environment with an email delivery provider (e.g. Resend / SendGrid / SMTP),
    // we send the formatted email directly to contact.mainahtunesteam@gmail.com.
    // If RESEND_API_KEY is configured in process.env, we can dispatch via Resend:
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'MainahtunesTeam Enquiries <onboarding@resend.dev>',
            to: ['contact.mainahtunesteam@gmail.com'],
            reply_to: email,
            subject: `[Project Enquiry] ${service || 'General Service'} — ${artistOrBusiness || name}`,
            html: `
              <h2>New Project Enquiry — MainahtunesTeam</h2>
              <p><strong>Client Name:</strong> ${name}</p>
              <p><strong>Artist / Business Name:</strong> ${artistOrBusiness || 'Not specified'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Country / Region:</strong> ${country || 'Not specified'}</p>
              <p><strong>Required Service:</strong> ${service || 'General Discussion'}</p>
              <p><strong>Estimated Budget:</strong> ${budget || 'Not specified'}</p>
              <p><strong>Preferred Deadline:</strong> ${deadline || 'Flexible'}</p>
              <p><strong>Reference Files / Links:</strong> ${referenceLinks || 'None provided'}</p>
              <hr />
              <h3>Project Description</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            `,
          }),
        });
      } catch (err) {
        console.error('Error dispatching via Resend:', err);
      }
    }

    // Log the enquiry for records
    const enquiryRecord = {
      recipient: 'contact.mainahtunesteam@gmail.com',
      id: `MT-${Date.now().toString(36).toUpperCase()}`,
      receivedAt: new Date().toISOString(),
      name,
      artistOrBusiness: artistOrBusiness || 'N/A',
      email,
      country: country || 'N/A',
      service: service || 'General Enquiry',
      budget: budget || 'Flexible',
      deadline: deadline || 'Flexible',
      referenceLinks: referenceLinks || 'None',
      messageLength: message.length,
    };
    console.log('Project Enquiry Logged:', enquiryRecord);

    return NextResponse.json({
      success: true,
      referenceId: enquiryRecord.id,
      message:
        'Thank you! Your project enquiry has been submitted successfully to MainahtunesTeam. Our team will review your requirements and respond within 24–48 hours.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'We encountered an issue submitting your enquiry. Please reach out directly to contact.mainahtunesteam@gmail.com.',
      },
      { status: 500 }
    );
  }
}
