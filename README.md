# 💰 Financial Tracking App

A modern, feature-rich financial goal tracking application built with Next.js, Firebase, and Tailwind CSS. Track your financial goals, monitor progress, and stay motivated with a beautiful glassmorphism UI design.

![Financial Tracker](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B3AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎯 **Goal Management**
- **Create & Track Goals**: Set financial goals with target amounts, deadlines, and categories
- **Priority System**: Manage goals by priority levels (1-5)
- **Category Organization**: Organize goals by categories (Transportation, Entertainment, Education, Health, Shopping, Others)
- **Progress Tracking**: Visual progress bars with real-time updates
- **Transaction History**: Track individual contributions for each goal

### 📊 **Dashboard Overview**
- **Statistics Overview**: Total saved amount, goals completed, active goals
- **Top 3 Urgent Goals**: Smart carousel showing most urgent goals based on deadline and priority
- **Glassmorphism Design**: Modern, elegant UI with translucent cards and smooth animations
- **Responsive Layout**: Fully mobile-friendly interface

### ⚙️ **Settings & Personalization**
- **User Profile**: Name, email, and account management
- **Currency Support**: Indian Rupees (₹) formatting throughout the app
- **Timezone Settings**: Configure your preferred timezone
- **Theme Toggle**: Dark/Light mode with smooth transitions
- **Password Management**: Secure password updates with validation

### 🔔 **Notifications System**
- **Goal Deadlines**: Automated reminders for approaching deadlines
- **Goal Completion**: Celebrate when goals are achieved
- **Real-time Updates**: Instant notifications for all goal activities
- **Notification Management**: Mark as read, delete, or clear all notifications

### 🌙 **Advanced UI Features**
- **Dark/Light Mode**: Beautiful theme switching with CSS variables
- **Luxury Finance Aesthetic**: Gold, emerald, and crimson accent colors
- **Cinzel Typography**: Elegant serif headings with Geist Sans body text
- **Smooth Animations**: Fluid transitions and hover effects
- **Loading States**: Skeleton screens and loading indicators

## 🛠️ **Technology Stack**

- **Frontend**: Next.js 15.2.4 with App Router
- **Styling**: Tailwind CSS with custom CSS variables
- **Backend**: Firebase Firestore
- **Language**: TypeScript
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## 🚀 **Getting Started**

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ksomani56/Financial-Tracking-App.git
   cd Financial-Tracking-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Get your Firebase configuration

4. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Set up Firestore Security Rules**
   In Firebase Console → Firestore → Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // For development only
       }
     }
   }
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 📁 **Project Structure**

```
Financial-Tracking-App/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles with CSS variables
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home dashboard
│   ├── notifications/           # Notifications page
│   └── settings/                # Settings page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── dashboard-header.tsx     # Header with navigation
│   ├── goal-card.tsx            # Individual goal display
│   ├── goals-grid.tsx           # Goals grid layout
│   ├── stats-overview.tsx       # Statistics cards
│   ├── theme-toggle.tsx         # Dark/light mode toggle
│   ├── transaction-dialog.tsx   # Transaction form
│   └── new-goal-dialog.tsx      # New goal creation form
├── lib/                         # Utility libraries
│   ├── firebase.ts              # Firebase configuration
│   ├── goals-context.tsx        # Goals state management
│   ├── settings-context.tsx     # Settings state management
│   ├── notifications-context.tsx # Notifications state management
│   ├── utils.ts                 # Utility functions
│   └── forecasting.ts           # Financial forecasting algorithms
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── styles/                      # Additional stylesheets
└── README.md                    # Project documentation
```

## 🎨 **Design System**

### Colors
- **Primary**: Gold (`#F59E0B`)
- **Success**: Emerald (`#10B981`) 
- **Danger**: Crimson (`#DC2626`)
- **Background**: Light (`#F8F9FA`) / Dark (`#0A0A0A`)
- **Glass Effect**: Translucent backgrounds with blur

### Typography
- **Headings**: Cinzel (Serif)
- **Body**: Geist Sans
- **Weights**: Light, Regular, Medium, Bold

### Spacing
- **Glass Cards**: 16px padding, 8px border radius
- **Grid**: 24px gap between elements
- **Components**: 8px, 16px, 24px, 32px spacing scale

## 🔧 **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 **Key Features Explained**

### Real-time Data Sync
All data is synchronized in real-time with Firebase Firestore. Changes made on one device instantly reflect on all other devices.

### Smart Goal Prioritization
Goals are automatically sorted by:
1. Priority level (1 = highest)
2. Days until deadline
3. Progress percentage

### Responsive Design
The app works seamlessly on:
- Desktop (1200px+)
- Tablet (768px - 1199px) 
- Mobile (320px - 767px)

### Currency Formatting
All monetary values are automatically formatted in Indian Rupees (₹) with proper locale formatting.

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons

## 📧 **Contact**

**Developer**: Krushna Somani
- GitHub: [@Ksomani56](https://github.com/Ksomani56)
- Repository: [Financial-Tracking-App](https://github.com/Ksomani56/Financial-Tracking-App)

---

<div align="center">

**Built with ❤️ and lots of ☕**

**[⬆ Back to Top](#-financial-tracking-app)**

</div>