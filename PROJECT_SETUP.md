# ATM Banking System - Setup Guide

A modern, secure ATM banking system built with React, TypeScript, Vite, and Tailwind CSS.

## 🏗️ Project Structure

```
atm-frontend/
│
├── index.html                  ✅ Main HTML entry point
├── package.json                ✅ Dependencies and scripts
├── tsconfig.json               ✅ TypeScript configuration
├── tsconfig.node.json          ✅ Node TypeScript config
├── vite.config.ts              ✅ Vite configuration with React
├── postcss.config.cjs          ✅ PostCSS configuration
├── tailwind.config.ts          ✅ Tailwind CSS configuration
│
└── src/
    │
    ├── main.tsx                ✅ Application entry point
    ├── App.tsx                 ✅ Main app with routing
    ├── index.css               ✅ Global styles + Tailwind + animations
    │
    ├── assets/
    │   └── atm.png             ✅ ATM machine image
    │
    ├── components/
    │   ├── Layout.tsx          ✅ Page layout wrapper
    │   ├── Navbar.tsx          ✅ Navigation bar
    │   ├── Card.tsx            ✅ Custom card component
    │   ├── Modal.tsx           ✅ Modal dialog component
    │   └── TransactionList.tsx ✅ Transaction history display
    │
    ├── routes/
    │   ├── ProtectedRoute.tsx  ✅ Route authentication guard
    │   ├── Login.tsx           ✅ Login page
    │   ├── Dashboard.tsx       ✅ Main dashboard
    │   ├── Withdraw.tsx        ✅ Withdraw money page
    │   ├── Deposit.tsx         ✅ Deposit money page
    │   ├── Transfer.tsx        ✅ Transfer funds page
    │   ├── MiniStatement.tsx   ✅ Transaction history
    │   └── ChangePin.tsx       ✅ PIN change page
    │
    ├── services/
    │   └── accountService.ts   ✅ localStorage service (mock backend)
    │
    ├── context/
    │   └── ATMContext.tsx      ✅ Global state management
    │
    ├── data/
    │   └── users.ts            ✅ Mock user data
    │
    ├── types/
    │   └── index.ts            ✅ TypeScript interfaces
    │
    └── utils/
        └── helpers.ts          ✅ Utility functions
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or bun

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Step 3: Build for Production

```bash
npm run build
```

### Step 4: Preview Production Build

```bash
npm run preview
```

## 🚀 Features

### ✅ Implemented Features

1. **User Authentication**
   - Secure PIN-based login
   - Session management
   - Protected routes

2. **Dashboard**
   - Balance display
   - Quick access to all features
   - Account information

3. **Withdraw Money**
   - Custom amount entry
   - Quick amount selection
   - Balance validation
   - Transaction recording

4. **Deposit Money**
   - Custom amount entry
   - Quick amount selection
   - Transaction recording

5. **Transfer Funds**
   - Account number validation
   - Recipient verification
   - Secure transfer
   - Transaction recording

6. **Mini Statement**
   - Last 10 transactions
   - Transaction details
   - Download option (UI ready)

7. **Change PIN**
   - Secure PIN update
   - PIN validation
   - Confirmation required

## 👥 Demo Accounts

Use these credentials to test the application:

| Account Number | PIN  | Balance   | Name         |
|---------------|------|-----------|--------------|
| 1234567890    | 1234 | ₹50,000   | John Doe     |
| 0987654321    | 5678 | ₹75,000   | Jane Smith   |
| 1111222233    | 9999 | ₹1,00,000 | Bob Johnson  |

## 🎨 Design System

The application uses a professional banking theme:

- **Primary Color**: Banking Blue (`hsl(210, 90%, 45%)`)
- **Secondary Color**: Teal Accent (`hsl(180, 70%, 50%)`)
- **Typography**: Poppins font family
- **Effects**: Glass morphism, smooth animations, gradients
- **Responsive**: Works on all screen sizes

## 🔧 Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Storage**: localStorage (mock backend)

## 📁 Key Files Explained

### `src/context/ATMContext.tsx`
Global state management for:
- Current user session
- Authentication status
- Balance updates
- Transaction history

### `src/services/accountService.ts`
Mock backend service using localStorage:
- User data persistence
- Transaction storage
- Account operations

### `src/types/index.ts`
TypeScript interfaces for:
- User data
- Transactions
- ATM context

### `src/utils/helpers.ts`
Utility functions:
- Currency formatting
- Date formatting
- Account masking
- Validation

## 🔐 Security Features

- PIN-based authentication
- Session management
- Protected routes
- Input validation
- Secure PIN change flow

## 🎯 Future Enhancements

- [ ] Biometric authentication
- [ ] Receipt printing
- [ ] Transaction limits
- [ ] Multi-language support
- [ ] Real backend integration
- [ ] Email notifications
- [ ] Transaction search/filter
- [ ] Account statements (PDF)

## 📝 Development Notes

### Adding New Features

1. Create new route component in `src/routes/`
2. Add route in `src/App.tsx`
3. Update navigation in `Dashboard.tsx`
4. Add transaction type if needed in `src/types/index.ts`

### Styling Guidelines

- Use semantic tokens from design system
- Never use direct colors in components
- Leverage Tailwind utility classes
- Follow glass morphism theme

### State Management

- Use `useATM()` hook to access global state
- Update balance via `updateBalance()`
- Add transactions via `addTransaction()`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080
npx kill-port 8080
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type Errors
```bash
# Run TypeScript check
npm run type-check
```

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Author
ADITYA PRIYADARSHI

Created as a software engineering project demonstrating modern web development practices.

---

**Happy Banking! 🏦**
