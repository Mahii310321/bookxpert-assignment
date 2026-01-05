# Employee Management Dashboard

A modern, feature-rich Employee Management System built with React, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Form Validation**: Custom validation
- **Print**: react-to-print
- **Data Storage**: LocalStorage (mock persistence)

## ✨ Features

### Authentication

- Login page with form validation
- Protected routes (dashboard requires login)
- Session persistence with localStorage
- Demo credentials: `admin@company.com` / `admin123`

### Dashboard

- Summary cards showing total, active, and inactive employees
- Employee list in a responsive table format
- Profile images with fallback avatars

### Employee Management

- **Add Employee**: Full form with image upload preview
- **Edit Employee**: Pre-populated form for updates
- **Delete Employee**: Confirmation dialog before deletion
- **Toggle Status**: Quick active/inactive toggle

### Search & Filters

- Search by employee name
- Filter by gender (Male/Female/Other)
- Filter by status (Active/Inactive)
- Combined filters work together
- Clear all filters button

### Print Functionality

- Print entire employee list
- Print individual employee record
- Clean print-optimized layout

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── EmployeeForm.tsx    # Add/Edit modal form
│   │   ├── EmployeeTable.tsx   # Employee list table
│   │   ├── Header.tsx          # Navigation header
│   │   ├── PrintView.tsx       # Print-optimized view
│   │   ├── SearchFilter.tsx    # Search and filter bar
│   │   └── StatCard.tsx        # Dashboard stat cards
│   ├── ui/                     # shadcn/ui components
│   └── ProtectedRoute.tsx      # Auth guard component
├── contexts/
│   ├── AuthContext.tsx         # Authentication state
│   └── EmployeeContext.tsx     # Employee data management
├── data/
│   ├── mockEmployees.ts        # Initial mock data
│   └── states.ts               # Indian states list
├── pages/
│   ├── Dashboard.tsx           # Main dashboard page
│   ├── Index.tsx               # Root redirect
│   ├── Login.tsx               # Login page
│   └── NotFound.tsx            # 404 page
├── types/
│   └── employee.ts             # TypeScript interfaces
├── App.tsx                     # Route configuration
├── index.css                   # Global styles & design system
└── main.tsx                    # Entry point
```

## 🛠️ Running Locally

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd employee-management-dashboard
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start the development server**

   ```bash
   npm run dev
   ```
4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📋 Git Commit Steps

Here's how to make commits in logical order:

### Commit 1: Project Setup & Design System

```bash
git add src/index.css tailwind.config.ts
git commit -m "feat: setup design system with custom colors and components"
```

### Commit 2: Types & Data

```bash
git add src/types/ src/data/
git commit -m "feat: add employee types and mock data"
```

### Commit 3: Context Providers

```bash
git add src/contexts/
git commit -m "feat: add auth and employee context providers"
```

### Commit 4: Authentication

```bash
git add src/pages/Login.tsx src/components/ProtectedRoute.tsx
git commit -m "feat: implement login page and protected routes"
```

### Commit 5: Dashboard Components

```bash
git add src/components/dashboard/
git commit -m "feat: add dashboard components (header, stats, table, filters)"
```

### Commit 6: Dashboard Page & Routing

```bash
git add src/pages/Dashboard.tsx src/pages/Index.tsx src/App.tsx
git commit -m "feat: implement dashboard page with full CRUD functionality"
```

### Commit 7: Documentation

```bash
git add README.md
git commit -m "docs: add comprehensive README with setup instructions"
```

## 🎨 Design Decisions

1. **Color Palette**: Professional blue (#2563eb) as primary, with success green and warning orange for status indicators
2. **Component Architecture**: Reusable components with clear separation of concerns
3. **State Management**: Context API for global state (auth + employees) to avoid prop drilling
4. **Responsive Design**: Mobile-first approach with responsive breakpoints
5. **Print Optimization**: Separate print-optimized view with clean, minimal styling

## 🔐 Security Note

This is a demo application using mock authentication. In a production environment, you would:

- Implement proper backend authentication (JWT, OAuth, etc.)
- Use secure session management
- Add proper API endpoints
- Implement server-side validation

## 📝 License

MIT License - feel free to use this for learning or as a starter template!
