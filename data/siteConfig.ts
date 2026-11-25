/**
 * Global Site Configuration & Direct Contact Channels
 */

export const siteConfig = {
  agencyName: 'MainahtunesTeam',
  tagline: 'Music · Branding · Digital Solutions',
  email: 'contact.mainahtunesteam@gmail.com',
  // WhatsApp Contact Number supplied by client
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+447888610336',
  get whatsappUrl() {
    const defaultMsg = encodeURIComponent('Hello MainahtunesTeam, I am interested in your creative and digital services.');
    const cleanNum = this.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${defaultMsg}`;
  },
};
