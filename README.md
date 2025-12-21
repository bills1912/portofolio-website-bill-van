# Portfolio Website - Bill Van Ricardo Zalukhu

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive portfolio website showcasing my work as a Data Scientist and Web Developer specializing in data analysis, computer vision, and full-stack development.

## 🌟 Features

### Interactive Components
- **Dynamic Hero Section** with typing animation effect
- **Smooth Scroll Animations** powered by GSAP and ScrollTrigger
- **Achievement Carousel** with certificate preview and modal viewer
- **Theme Toggle** supporting Light, Dark, and System modes
- **Responsive Navigation** with mobile-friendly menu
- **Project Showcase** with interactive cards
- **Contact Form** with email integration

### Technical Highlights
- 🎨 Modern UI with Tailwind CSS
- 🌓 Advanced theme system with three modes (Light/Dark/System)
- 🎭 Smooth animations using GSAP
- 📱 Fully responsive design
- ⚡ Fast loading with Vite
- 🎯 SEO optimized
- ♿ Accessibility features
- 🖼️ Certificate viewer with PDF and image support

## 🚀 Live Demo

Visit the live website: [Portfolio Website](https://bills1912.github.io/portofolio-website-bill-van/)

## 📸 Screenshots

### Hero Section
Modern landing page with typing animation showcasing professional introduction.

### Achievement Carousel
Interactive carousel displaying certifications, awards, competitions, and patents with certificate preview functionality.

### Project Portfolio
Grid layout showcasing various projects including web applications, data science dashboards, and API services.

## 🛠️ Tech Stack

### Frontend Framework
- **React** 18.3.1 - UI library
- **Vite** 5.4.2 - Build tool and dev server

### Styling & Animation
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **GSAP** 3.12.5 - Animation library
- **Lenis** 1.1.17 - Smooth scroll library

### Additional Libraries
- **PropTypes** - Runtime type checking for React props
- **@gsap/react** - GSAP React integration

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/bills1912/portofolio-website-bill-van.git
cd portofolio-website-bill-van
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
portofolio-website-bill-van/
├── public/
│   ├── certificates/          # Certificate files (PDF and images)
│   │   ├── effective-leadership.pdf
│   │   ├── effective-leadership-thumb.jpg
│   │   ├── Finalis IRIFair_Bill Van Ricardo Zalukhu.jpg
│   │   ├── Favorite Poster IRIFair_Bill Van Ricardo Zalukhu.jpg
│   │   ├── patent-model-deteksi-jenis-kapal-laut.pdf
│   │   ├── patent-model-deteksi-jenis-kapal-laut-thumb.jpg
│   │   ├── Best Paper-2022 Comnetsat-Bil Van Ricardo Zalukhu.jpg
│   │   ├── MLOS22 - Certificate.pdf
│   │   └── MLOS22 - Certificate-thumb.jpg
│   ├── files/
│   │   └── resume.pdf         # Downloadable CV
│   └── images/                # Project and UI images
├── src/
│   ├── components/
│   │   ├── About.jsx          # About section
│   │   ├── Achievement.jsx    # Achievement carousel
│   │   ├── AchievementCard.jsx
│   │   ├── Button.jsx         # Reusable button components
│   │   ├── CertificateModal.jsx
│   │   ├── Contact.jsx        # Contact form
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx           # Hero section with typing animation
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Skill.jsx          # Skills showcase
│   │   ├── SkillCard.jsx
│   │   ├── ThemeToggle.jsx    # Theme switcher
│   │   ├── TypingText.jsx     # Custom typing animation
│   │   └── Work.jsx           # Project portfolio
│   ├── contexts/
│   │   └── ThemeContext.jsx   # Theme management
│   ├── App.jsx                # Main application component
│   ├── index.css              # Global styles
│   └── main.jsx               # Application entry point
├── LICENSE                     # Apache 2.0 License
├── README.md
├── package.json
├── tailwind.config.js
├── vite.config.js
└── index.html
```

## 🏆 Achievements Section

The achievements section showcases various certifications, awards, competitions, and patents. All certificate files are stored in the `public/certificates/` directory.

### Adding New Certificates

To add a new certificate to the Achievement section:

1. **Add certificate file** to `public/certificates/`:
   - For PDFs: Add both the PDF file and a thumbnail image (JPG format)
   - For images: Add the image file directly

2. **Update Achievement.jsx**:
   ```javascript
   {
     icon: <svg>...</svg>,
     title: "Certificate Title",
     organization: "Organization Name",
     year: "2025",
     description: "Certificate description",
     category: "Certification", // or "Competition", "Patent", etc.
     certificateType: "pdf", // or "image"
     certificateUrl: "/portofolio-website-bill-van/certificates/filename.pdf",
     thumbnailUrl: "/portofolio-website-bill-van/certificates/filename-thumb.jpg"
   }
   ```

## 🎨 Theme System

The website features a sophisticated three-mode theme system:

- **Light Mode** - Clean and bright interface
- **Dark Mode** - Eye-friendly dark interface (default)
- **System Mode** - Automatically matches OS preference

Theme preference is saved in localStorage and persists across sessions.

## 📧 Contact Form

The contact form uses [Getform.io](https://getform.io/) for email handling. Form submissions are sent to the configured endpoint.

To update the contact form endpoint:
1. Open `src/components/Contact.jsx`
2. Update the `action` attribute in the `<form>` tag

## 🌐 Deployment

### GitHub Pages
The site is deployed on GitHub Pages. To deploy updates:

```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Vercel/Netlify
The project is ready for deployment on Vercel or Netlify. Simply connect your repository and deploy.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Bill Van Ricardo Zalukhu**
- 📧 Email: billvanricardozalukhu@gmail.com
- 💼 LinkedIn: [Bill Van Ricardo Zalukhu](http://www.linkedin.com/in/bill-van-ricardo-zalukhu-796870272)
- 🐙 GitHub: [@bills1912](https://github.com/bills1912)
- 🐦 Twitter: [@V_dataalchemist](https://x.com/V_dataalchemist)
- 📷 Instagram: [@vandataalchemist](https://www.instagram.com/vandataalchemist/)

## 🙏 Acknowledgments

- Design inspiration and base template from [codewithsadee](https://github.com/codewithsadee)
- Icons from [Material Symbols](https://fonts.google.com/icons)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- Smooth scrolling by [Lenis](https://lenis.studiofreight.com/)

## 📝 Changelog

### Version 1.0.0 (Current)
- ✨ Initial release
- 🎯 Hero section with typing animation
- 🏆 Achievement carousel with certificate viewer
- 💼 Project portfolio showcase
- 🎨 Three-mode theme system
- 📱 Fully responsive design
- 📧 Contact form integration

## 🐛 Bug Reports

Found a bug? Please open an issue on [GitHub Issues](https://github.com/bills1912/portofolio-website-bill-van/issues) with:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 💡 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by Bill Van Ricardo Zalukhu** | **© 2024 vandataalchemist**