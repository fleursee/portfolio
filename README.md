# Fleur's Portfolio

Welcome to my personal portfolio! This project showcases a modern full-stack application built with the latest technologies, focusing on a my own "cute but professional" aesthetic.

🔗 **Repository:** [github.com/fleursee/portfolio](https://github.com/fleursee/portfolio)
  
- ⚠️ Even though there is blog functionalities, this is unused (for now) in production.

## 🛠 Tech Stack & Tools

This project moves beyond standard single-page application architecture, utilizing Next.js for optimized performance and SEO.

| Domain | Technologies |
| :--- | :--- |
| **Core** | [Next.js 16](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/) |
| **Database & Auth** | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/), [NextAuth.js v5](https://next-auth.js.org/) |
| **UI & Styling** | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [GSAP](https://gsap.com/) (Animations) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [Resend](https://resend.com/) (Email API) |
| **Content** | MDX (Markdown + JSX), Server Actions |

## ✨ Key Features

* **🛡️ Type-Safe Architecture:** Full TypeScript integration from database schema (Prisma) to frontend components.
* **📝 MDX-Powered Blog:** Dynamic content management allowing React components directly inside markdown files.
* **🔐 Secure Admin Dashboard:** Protected routes utilizing NextAuth.js middleware for managing projects and blog posts.
* **⚡ Server Actions:** Native Next.js server actions for handling form submissions (Contact, Auth) without API bloat.
* **📧 Email Integration:** Contact form powered by the Resend API for reliable delivery.
* **🎨 Responsive & Accessible:** Built with mobile-first principles and accessible UI primitives (Radix/Shadcn).

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fleursee/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root directory.

```
# Database Connection (PostgreSQL)
DATABASE_URL=""

# Authentication (NextAuth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# Email Service
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""
RESEND_TO_EMAIL=""
```

### 4. Database Setup

Ensure your PostgreSQL instance is running, then sync the schema:

```bash
# Generate Prisma Client types
npm run postinstall

# Push schema to your local database
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

The website should be hosted in http://localhost:3000.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fleursee/portfolio)

1. Connect your GitHub repository
2. Vercel auto-detects Next.js
3. Deploy!

#### ⚠️ Other hosting sites such as Netlify and Cloudflare Pages have not been tested at this time.

## 📁 Project Structure
The project uses route groups (public) and (admin) to organize layouts and pages logically without affecting the URL paths.

```
src/
├── app/
│   ├── (admin)/
│   │   ├── admin/             # URL: /admin
│   │   │   ├── blog/          # URL: /admin/blog
│   │   │   ├── projects/      # URL: /admin/projects
│   │   │   └── skills/        # URL: /admin/skills
│   │   └── layout.tsx         # Admin sidebar and layout
│   └── (public)/
│       ├── blog/              # URL: /blog
│       ├── contact/           # URL: /contact
│       ├── projects/          # URL: /projects
│       ├── layout.tsx         # Public Header/Footer layout
│       └── page.tsx           # URL: / (Homepage)
├── components/
│   ├── layout/                # Header, Footer components
│   └── ui/                    # Shadcn/ui components (Button, Input, Textarea)
├── lib/
│   ├── actions.ts             # Server actions (CRUD, email sending)
│   └── prisma.ts              # Prisma client setup
└── ... (other root files like next.config.ts, package.json)
```

## 👤 Admin Access
The admin panel is accessible at http://localhost:3000/admin. Authentication will be required here once NextAuth is fully configured.

## 📜 Handy Development Scripts
All commands are run from the root of the project:

`npm run dev`: Starts the development server.

`npm run build`: Builds the application for production.

`npm run lint`: Runs ESLint to check for code quality.

`npm run postinstall`: Automatically generates the Prisma client after installation.

## 🙏 Acknowledgments

- Inspired by [bloomfolio](https://github.com/lauroguedes/bloomfolio)

## 💬 Support

- 🐛 [Report Issues](https://github.com/fleursee/portfolio/issues)
- 💬 [Discussions](https://github.com/fleursee/portfolio/discussions)

---
Please if you find this project helpful, consider giving it a ⭐ on GitHub!