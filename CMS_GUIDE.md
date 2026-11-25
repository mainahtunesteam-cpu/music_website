# MainahtunesTeam — Content Management System (CMS) & Handover Guide

Welcome to the **MainahtunesTeam Agency Content Management Guide**. This guide explains how to add new portfolio artwork, audio samples, AI music videos, team members, client testimonials, and services without writing code.

---

## 1. Visual In-App Admin Studio
Your platform includes a built-in **Agency Content Management Studio** accessible directly at:
👉 **`https://yourdomain.com/admin`** (or `http://localhost:3000/admin` locally)

### Security & Login Credentials:
The admin page is protected with authentication:
* **Default Username:** `admin`
* **Default Password:** `helloworld`
* **Change Password Functionality:** Once logged in, go to the **Security & Credentials** tab (or click **Change Password** in the top hero bar) to set your own custom password.
* **Persistent Sessions:** Your updated password persists across logins. If you ever forget it, you can reset it to `helloworld` using the reset button or by clearing site data.

The studio gives you:
* **Services Directory**: Overview of all 53 live services, category mappings, and direct page links.
* **Cover Artworks**: Inspection of the 19 preserved cover designs, concepts, and deliverable specs.
* **Audio Engineering Console**: Inspection of the 6 studio mixing and mastering tracks, LUFS calibrations, and A/B notes.
* **Team & Leadership**: Operational directory featuring **Afolabi Ayodeji (Financial Manager)**.
* **Testimonials Manager**: Real-time review of client testimonials and verified results.
* **Security & Credentials Manager**: Immediate in-app password changes, session status, and credentials control.
* **Interactive Code Generator**: Form allowing non-developers to generate properly formatted entries for new artworks, team members, or testimonials with 1-click clipboard copying.

---

## 2. Decap CMS Integration (Headless Git-Based CMS)
Your site is also pre-configured with **Decap CMS** at:
👉 **`https://yourdomain.com/admin/index.html`**

### Decap CMS Capabilities:
* **Zero Database Fees**: All content is stored directly in your Git repository.
* **Media Uploads**: Upload images and artwork directly from your computer into `/public/uploads`.
* **Instant Publishing**: When you click **Save / Publish**, your Git repo commits the change and Vercel automatically redeploys your live website in seconds.

---

## 3. How to Add New Content (Step-by-Step)

### A. Adding a New Album Cover Artwork
1. Place your 3000x3000px artwork image into:
   `public/artwork/your-artwork-filename.png`
2. Open `data/portfolio.ts` (or use the Code Generator at `/admin`):
3. Add the following entry to `artworkCatalog`:
```typescript
{
  id: 'art-20',
  title: 'Neon Horizon',
  artist: 'Marcus Vance',
  style: 'Synthwave / Retro',
  image: 'neon-horizon.png',
  concept: 'Analog dusk aesthetics blending neon violet and chrome accents.',
  deliverables: ['3000x3000px Digital Master', 'Spotify Canvas Cut', 'Social Story Kit'],
},
```
4. Save the file. The new artwork automatically appears in:
   * The **Review My Works** catalog (`/visuals` and `/portfolio`)
   * The **Cover Artwork** service detail page (`/services/album-single-cover-artwork`)
   * The interactive full-resolution lightbox modal.

---

### B. Adding a New Team Member
1. Add the team photo (4:5 portrait ratio) into:
   `public/team/firstname-lastname.png`
2. Open `data/team.ts`:
3. Add the member to the `teamMembers` array:
```typescript
{
  id: 'firstname-lastname',
  name: 'Firstname Lastname',
  role: 'Creative Director',
  department: 'Visual Production & Branding',
  image: '/team/firstname-lastname.png',
  bio: 'A brief 2–3 sentence professional biography outlining background and agency responsibilities.',
  credentials: [
    'Brand Identity Strategy',
    'Creative Production Direction',
    'Artist Rollout Campaigns',
  ],
},
```
4. Save the file. The new member automatically appears in:
   * The dedicated **Our Team** page (`/team`)
   * The **Homepage Team Preview** section (`/`)

---

### C. Adding a New Client Testimonial
1. Open `data/testimonials.ts`:
2. Add a new entry to the `testimonials` array:
```typescript
{
  id: 't-05',
  clientName: 'Artist or Label Name',
  role: 'Vocalist / Label Founder',
  location: 'City, Country',
  serviceEngaged: 'Music Mixing & Spotify Promotion',
  quote: "Direct client quote explaining how MainahtunesTeam elevated their release.",
  verifiedOutcome: '150K+ organic streams & playlist placements',
},
```
3. Save the file. The review automatically appears in the **Homepage Testimonials Grid**.

---

### D. Adding or Modifying a Service
All 53 services are defined in `data/services.ts`. To edit deliverables, benefits, or overview text for any service, update its entry in `data/services.ts`. Next.js automatically regenerates the corresponding static page (`/services/[slug]`) during the next build!

---

## 4. Deploying to Vercel

### Option 1: Automatic Git Deployment (Recommended)
1. Push your updated code to your GitHub/GitLab repository connected to Vercel:
   ```bash
   git add .
   git commit -m "Upgrade MainahtunesTeam website to 53 services & complete portfolio"
   git push origin main
   ```
2. Vercel automatically detects the push, runs `npm run build`, and updates your live site at your custom domain with zero downtime.

### Option 2: Deploying via Vercel CLI
If deploying from your terminal:
```bash
npx vercel --prod
```
When prompted:
* Set up and deploy: **Yes**
* Scope: Select your Vercel account
* Link to existing project: **Yes** (select your existing project)

---

## 5. Summary of Built Features
* ✅ All **53 Services** included and organized into 6 official disciplines
* ✅ Dedicated service detail page for every single service (`/services/[slug]`)
* ✅ Embedded **Portfolio Samples** (Audio A/B compare, Video, Artwork, Web, Case Studies)
* ✅ Searchable and filterable **Review My Works** catalog (`/visuals` & `/portfolio`)
* ✅ Full-resolution **Artwork Lightbox Modal**
* ✅ Interactive **Website Development Portfolio** with responsive desktop & mobile frames
* ✅ Verified **Music Promotion Case Studies** with performance metric cards
* ✅ Fully functional **9-Field Contact System** with spam honeypot and API handler
* ✅ **Dark / Light Theme Switcher**
* ✅ Responsive **Mobile Hamburger Navigation Drawer**
* ✅ Dedicated **Artist Growth & Career Development Framework** (`/artist-growth`)
* ✅ Executive **Team Leadership Page** featuring Afolabi Ayodeji (`/team`)
* ✅ **SEO Foundation**: OpenGraph tags, Twitter cards, `sitemap.xml`, `robots.txt`, and Schema.org JSON-LD
* ✅ Content Management System (Decap CMS config & in-app Admin Studio at `/admin`)
