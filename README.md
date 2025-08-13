# Joy Vaghela Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean blue and white theme with smooth animations
- **Responsive**: Optimized for all devices and screen sizes
- **Fast Performance**: Built with Vite for optimal loading speeds
- **Interactive Elements**: Custom cursor, smooth scrolling, and hover effects
- **Professional Sections**: Hero, About, Education, Projects, Skills, and Contact

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Animations
- **Build Tool**: Vite
- **UI Components**: Radix UI, Shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd joy-vaghela-animated-playground-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Netlify Deployment

This project is configured for easy deployment on Netlify:

### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### Environment Variables
No environment variables are required for this project.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── LoadingScreen.tsx
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── EducationSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── ContactSection.tsx
│   └── CustomCursor.tsx
├── pages/              # Page components
├── assets/             # Images and static files
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css           # Global styles
```

## 🎨 Customization

### Colors
The project uses a blue and white color scheme defined in `src/index.css`:
- Primary blue: `#3b82f6`
- Background: Light blue to white gradients
- Text: Various shades of blue

### Content
Update the content in each component file:
- `HeroSection.tsx` - Main hero content
- `AboutSection.tsx` - Personal information
- `ProjectsSection.tsx` - Project showcase
- `SkillsSection.tsx` - Skills and expertise
- `ContactSection.tsx` - Contact information

## 🐛 Troubleshooting

### Build Issues
- Ensure Node.js version 18 or higher
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### Netlify Issues
- Verify build command is `npm run build`
- Check publish directory is `dist`
- Ensure all dependencies are in `package.json`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

- **Name**: Joy Vaghela
- **Email**: joy@example.com
- **Portfolio**: [Live Demo](https://your-netlify-url.netlify.app)
