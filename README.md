# Pratik Sharma — Portfolio Website

A full-stack Next.js portfolio with blog, admin panel, contact form, analytics, and SEO optimization.

---

## 🚀 Quick Start (5 minutes)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and fill in your values (see section below).

### 3. Add your resume PDF (Optional)
Place your resume as `public/Pratik_Sharma_Resume.pdf`, OR set `NEXT_PUBLIC_RESUME_URL` in `.env.local` to link to a Google Drive or other online PDF file.

### 4. Run development server
```bash
npm run dev
```
Open http://localhost:3000

---

## ⚙️ Environment Variables (.env.local)

```env
# Admin password — choose something strong
ADMIN_PASSWORD=your_strong_password

# JWT secret — generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_64_char_random_string

# Gmail credentials for contact form emails
GMAIL_USER=pratik.sde16@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # Google App Password (NOT your gmail password)
CONTACT_RECEIVER=pratik.sde16@gmail.com

# Google Analytics (optional — get from analytics.google.com)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Your deployed URL (no trailing slash)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Resume URL (optional - Google Drive share link, or local path fallback)
NEXT_PUBLIC_RESUME_URL=https://drive.google.com/file/d/your_drive_file_id/view?usp=sharing
```

### Setting up Gmail App Password:
1. Go to myaccount.google.com > Security
2. Enable 2-Factor Authentication
3. Search "App Passwords" > Create one for "Mail"
4. Copy the 16-character password into GMAIL_APP_PASSWORD

---

## 📁 Project Structure

```
pratik-portfolio/
├── pages/
│   ├── index.tsx           ← Home page (Hero, About, Skills, Experience, Projects, Contact)
│   ├── blog/
│   │   ├── index.tsx       ← Blog listing
│   │   └── [slug].tsx      ← Blog post
│   ├── admin/
│   │   ├── index.tsx       ← Admin login (/admin)
│   │   ├── dashboard.tsx   ← Admin dashboard
│   │   ├── new.tsx         ← Create new post
│   │   └── edit/[id].tsx   ← Edit post
│   ├── privacy-policy.tsx
│   ├── 404.tsx
│   └── api/
│       ├── admin/login.ts   ← Auth
│       ├── admin/logout.ts
│       ├── blog/save.ts     ← Blog CRUD
│       ├── blog/toggle.ts
│       ├── blog/delete.ts
│       ├── contact.ts       ← Contact form + email
│       └── sitemap.xml.ts   ← Dynamic sitemap
├── components/
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   ├── sections/Hero.tsx
│   ├── sections/Skills.tsx
│   ├── sections/Experience.tsx
│   ├── sections/Projects.tsx
│   ├── sections/Contact.tsx
│   └── ui/ThemeToggle.tsx, SEOHead.tsx
├── data/
│   ├── portfolio.ts        ← ⭐ EDIT THIS — all your info is here
│   └── blogs.json          ← Blog posts stored here (auto-managed)
├── lib/
│   ├── blog.ts             ← Blog utilities
│   ├── auth.ts             ← Auth utilities
│   └── seo.ts              ← Schema/structured data
└── styles/globals.css
```

---

## ✏️ Customization

### Update your info
Edit `data/portfolio.ts` — this is the single source of truth for all your content:
- Personal info, links, email
- Skills (name, level, icon)
- Experience
- Projects
- Education
- Stats

### Add your photo (optional)
Add `public/avatar.jpg` and update the Hero component to show it.

### Add your resume
Place `public/Pratik_Sharma_Resume.pdf` (local file), or set `NEXT_PUBLIC_RESUME_URL` in your environment variables to use an external link (like Google Drive). The download/view buttons in the navbar and hero section will dynamically link to it.

### Update robots.txt
Change `yourdomain.com` in `public/robots.txt` to your actual domain.

---

## 🖊️ Blog Admin

1. Go to `/admin`
2. Enter your ADMIN_PASSWORD
3. Dashboard shows all posts with status
4. Actions per post:
   - **Edit** — full markdown editor
   - **Publish / Unpublish** — toggle visibility
   - **Delete** — permanent removal
   - **View** — open live post
5. Create posts with Markdown (supports code blocks, headings, etc.)

---

## 🌐 Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to vercel.com > New Project > Import repo
3. Add all `.env.local` variables in Vercel dashboard (Settings > Environment Variables)
4. Deploy — Vercel handles everything else

### After deploy:
- Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
- Update `public/robots.txt` sitemap URL
- Submit sitemap to Google Search Console: `yourdomain.com/api/sitemap.xml`

---

## 🔍 SEO Checklist

- [x] Meta title + description on every page
- [x] Open Graph + Twitter cards
- [x] JSON-LD structured data (Person schema on home, BlogPosting on each post)
- [x] Dynamic sitemap at `/api/sitemap.xml`
- [x] robots.txt (admin + API routes blocked)
- [x] Canonical URLs
- [x] Semantic HTML (section, article, header, main)
- [x] Alt text ready for images
- [x] Mobile responsive
- [x] Core Web Vitals friendly (minimal JS, optimized fonts)
- [ ] Submit sitemap to Google Search Console after deploy
- [ ] Add your Google Analytics ID to env

---

## 📊 Google Analytics Setup

1. Go to analytics.google.com
2. Create account → Property → Web stream
3. Copy the Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local` as `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

---

## 🔒 Security Notes

- Admin password is stored in environment variables, never in code
- JWT tokens expire after 7 days
- Admin cookies are httpOnly + secure (HTTPS only in production)
- Admin routes are blocked in robots.txt
- Admin pages return 401 without valid token
