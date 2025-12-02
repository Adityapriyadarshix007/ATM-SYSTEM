# ATM Banking System - Complete Installation Guide

## 🚀 Quick Start (3 Steps)

If you already have the codebase from Lovable, just run:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:8080
```

That's it! The app is ready to use.

---

## 📦 Detailed Installation Steps

### Step 1: Prerequisites Check

Make sure you have Node.js installed (v18 or higher):

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org/)

### Step 2: Project Setup

The project is already set up with all necessary configurations:

- ✅ `package.json` - All dependencies configured
- ✅ `vite.config.ts` - Vite with React plugin
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.ts` - Tailwind CSS setup
- ✅ `index.html` - HTML entry point

### Step 3: Install All Dependencies

Run this command in your project root:

```bash
npm install
```

This installs all required packages:
- React & React DOM (v18.3.1)
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- React Router
- Lucide icons
- And more...

### Step 4: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:8080
```

---

## 🧪 Testing the Application

### Demo Accounts Available

| Account Number | PIN  | Balance   | Name         |
|---------------|------|-----------|--------------|
| 1234567890    | 1234 | ₹50,000   | John Doe     |
| 0987654321    | 5678 | ₹75,000   | Jane Smith   |
| 1111222233    | 9999 | ₹1,00,000 | Bob Johnson  |

### Test Scenarios

1. **Login**
   - Enter account number: `1234567890`
   - Enter PIN: `1234`
   - Click "Login"

2. **View Dashboard**
   - See your balance
   - View quick action buttons

3. **Withdraw Money**
   - Click "Withdraw"
   - Enter amount or use quick select
   - Confirm withdrawal

4. **Deposit Money**
   - Click "Deposit"
   - Enter amount
   - Confirm deposit

5. **Transfer Money**
   - Click "Transfer"
   - Enter recipient account: `0987654321`
   - Enter amount
   - Confirm transfer

6. **View Statement**
   - Click "Mini Statement"
   - See recent transactions

7. **Change PIN**
   - Click "Change PIN"
   - Enter current PIN
   - Enter new PIN (4 digits)
   - Confirm new PIN

---

## 🛠️ Available npm Scripts

```bash
# Development
npm run dev          # Start dev server on port 8080

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint

# Type Checking
npx tsc --noEmit     # Check TypeScript types
```

---

## 📁 All Project Files Created

### Core Configuration Files (Already Exists)
- ✅ `package.json` - Dependencies
- ✅ `vite.config.ts` - Vite config
- ✅ `tsconfig.json` - TypeScript config
- ✅ `tailwind.config.ts` - Tailwind config
- ✅ `index.html` - HTML entry

### Source Files (Created)

**Entry Points:**
- ✅ `src/main.tsx` - App bootstrap
- ✅ `src/App.tsx` - Routing setup
- ✅ `src/index.css` - Global styles + design system

**Types & Data:**
- ✅ `src/types/index.ts` - TypeScript interfaces
- ✅ `src/data/users.ts` - Mock user data

**Services & Context:**
- ✅ `src/services/accountService.ts` - localStorage service
- ✅ `src/context/ATMContext.tsx` - Global state management

**Utilities:**
- ✅ `src/utils/helpers.ts` - Helper functions

**Components:**
- ✅ `src/components/Layout.tsx` - Page layout
- ✅ `src/components/Navbar.tsx` - Navigation bar
- ✅ `src/components/Card.tsx` - Custom card component
- ✅ `src/components/Modal.tsx` - Modal dialog
- ✅ `src/components/TransactionList.tsx` - Transaction list

**Route Components:**
- ✅ `src/routes/ProtectedRoute.tsx` - Auth guard
- ✅ `src/routes/Login.tsx` - Login page
- ✅ `src/routes/Dashboard.tsx` - Dashboard
- ✅ `src/routes/Withdraw.tsx` - Withdraw page
- ✅ `src/routes/Deposit.tsx` - Deposit page
- ✅ `src/routes/Transfer.tsx` - Transfer page
- ✅ `src/routes/MiniStatement.tsx` - Statement page
- ✅ `src/routes/ChangePin.tsx` - Change PIN page

**Assets:**
- ✅ `src/assets/atm.png` - ATM machine image

---

## 🎨 Design System Features

The application includes a professional design system with:

- **Colors**: Banking blue theme with teal accents
- **Typography**: Poppins font family
- **Effects**: Glass morphism cards
- **Animations**: Smooth transitions and fades
- **Gradients**: Professional gradient backgrounds
- **Shadows**: Elegant shadow effects

All defined in `src/index.css` and `tailwind.config.ts`

---

## 💾 Data Persistence

The application uses **localStorage** to persist:
- User account data
- Transaction history
- Session information

Data persists across page refreshes but is stored locally in your browser.

---

## 🔧 Troubleshooting

### Problem: Port 8080 already in use

**Solution:**
```bash
# Option 1: Kill the process
npx kill-port 8080

# Option 2: Use different port
npm run dev -- --port 3000
```

### Problem: Module not found errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: TypeScript errors

**Solution:**
```bash
# Check for type errors
npx tsc --noEmit

# If errors persist, try:
npm run build
```

### Problem: Styling not working

**Solution:**
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

### Problem: Login not working

**Solution:**
- Make sure you're using the correct demo credentials
- Clear browser localStorage:
  - Open DevTools (F12)
  - Go to Application tab
  - Clear localStorage
  - Refresh page

---

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 🎯 What You Can Do Now

After successful installation, you can:

1. ✅ Login with demo accounts
2. ✅ View account balance
3. ✅ Withdraw money
4. ✅ Deposit money
5. ✅ Transfer funds between accounts
6. ✅ View transaction history
7. ✅ Change your PIN
8. ✅ Experience smooth animations
9. ✅ Use responsive design on any device

---

## 📚 Project Structure Summary

```
atm-frontend/
├── src/
│   ├── routes/          # Page components
│   ├── components/      # Reusable UI components
│   ├── context/         # Global state
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── data/            # Mock data
│   ├── utils/           # Helper functions
│   └── assets/          # Images and static files
├── public/              # Static assets
└── [config files]       # Various configuration files
```

---

## 🚦 Next Steps

Now that everything is installed:

1. **Explore the Code**: Check out the well-organized file structure
2. **Test Features**: Try all the ATM operations
3. **Customize**: Modify colors, add features, or integrate real backend
4. **Learn**: Study the React patterns, TypeScript usage, and state management

---

## 💡 Tips

- The app uses **Context API** for state management
- **localStorage** simulates a backend database
- All styling uses **Tailwind CSS** with custom design tokens
- **TypeScript** provides type safety throughout
- **React Router** handles navigation
- **Shadcn/ui** provides accessible UI components

---

## ✅ Verification Checklist

After installation, verify:
- [ ] Dev server starts without errors
- [ ] Browser opens to login page
- [ ] Can login with demo account
- [ ] Dashboard shows balance
- [ ] Can perform transactions
- [ ] Transactions are recorded
- [ ] Navigation works smoothly
- [ ] No console errors
- [ ] Responsive design works on mobile

---

**🎉 You're all set! Happy coding!**

For questions or issues, check the PROJECT_SETUP.md file for more details.
