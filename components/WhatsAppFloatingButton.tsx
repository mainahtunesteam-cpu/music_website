'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Direct WhatsApp Contact">
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        aria-label="Chat with MainahtunesTeam on WhatsApp"
        title="Chat with MainahtunesTeam on WhatsApp"
      >
        <span className="whatsapp-tooltip">Chat on WhatsApp</span>
        <div className="whatsapp-icon-wrap">
          <MessageCircle size={26} color="#ffffff" strokeWidth={2.2} />
        </div>
      </a>
    </aside>
  );
}
