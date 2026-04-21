# MasteringMoney 🏦
### An Interactive Financial Literacy & Strategy Platform

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**MasteringMoney** is a premium, interactive web application designed to educate users on financial literacy through gamified modules and real-time simulations. Built with a focus on modern aesthetics and seamless user experience, it allows users to track their progress, complete financial challenges, and discover their "Financial Persona."

---

## 🌟 Key Features

### 1. Interactive Curriculum
- **VelocityEngine (Savings):** Understand the mechanics of compound interest and emergency funds.
- **LeakHunter (Budgeting):** Identify and patch "financial leaks" in daily spending habits.
- **MarketPulse (Investing):** Experience market volatility and learn the fundamentals of long-term asset growth.
- **ChallengeCase:** High-stakes scenarios that test your ability to balance stability, growth, and efficiency.

### 2. Persona System
Based on your performance across the curriculum, the system generates a **Financial Persona**:
- 🏰 **The Fortress:** Prioritizes security and resilience.
- 🏗️ **The Architect:** Focused on long-horizon compounding and growth.
- ⚡ **The Optimizer:** Maximizes cash flow and capital turnover.
- ⚖️ **The Specialist:** Maintains a sophisticated balance across all dimensions.

### 3. Real-time Cloud Sync
- **Firebase Authentication:** Secure user login and personalized sessions.
- **Firestore Integration:** Progress is automatically synced to the cloud, allowing for a seamless experience across devices.
- **Local Fallback:** Robust local storage caching ensures no progress is lost even during connectivity issues.

### 4. Premium Design Language
- **Typography:** Elegant pairing of *Playfair Display* (serif) and *Inter* (sans-serif).
- **Animations:** Smooth, physics-based transitions powered by *Framer Motion*.
- **Visuals:** Minimalist "Glassmorphism" UI with subtle atmospheric glows and high-contrast accessibility.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** React Hooks (useState, useEffect, AnimatePresence)
- **Database & Auth:** [Firebase](https://firebase.google.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Firebase project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mastering-money.git
   cd mastering-money
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory (you can use `.env.example` as a template) and add your Firebase credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── components/        # Specialized UI modules (MarketPulse, LeakHunter, etc.)
├── data/              # Curriculum content and simulation logic
├── lib/               # Firebase configuration and utility libraries
├── assets/            # Static images and branding assets
├── App.jsx            # Main application state and routing
├── index.css          # Global styles and Tailwind configuration
└── main.jsx           # Application entry point
```

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run preview`: Previews the production build locally.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ for PromptWars 2026*
