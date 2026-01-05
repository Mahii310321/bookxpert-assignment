# Employee Management Dashboard

A modern, feature-rich Employee Management System built with React, TypeScript, and Tailwind CSS.



---
## 🎥 Screen Recording (Mandatory Demo)


Watch the complete application walkthrough here:  

👉 https://drive.google.com/file/d/1oS2yFsoYZCTuBt5UpxwW0EawW364Cs9C/view?usp=sharing


The video demonstrates:

- Login flow & authentication

- Dashboard overview

- Add / Edit / Delete employee

- Image upload with preview

- Search & combined filters

- Active / Inactive toggle

- Print functionality
---

## 🚀 Tech Stack

* **Frontend** : React 19 + TypeScript
* **Styling** : Tailwind CSS 4 + shadcn/ui
* **State Management** : React Context API
* **Routing** : React Router DOM v7
* **Data Fetching** : TanStack Query (React Query)
* **Form Validation** : Custom validation
* **Print** : react-to-print
* **UI Components** : Radix UI primitives
* **Notifications** : Sonner
* **Theme** : next-themes (dark/light mode)
* **Data Storage** : LocalStorage (mock persistence)

## ✨ Features

### Authentication

* Login page with form validation
* Protected routes (dashboard requires login)
* Session persistence with localStorage
* Demo credentials: `admin@company.com` / `admin123`

### Dashboard

* Summary cards showing total, active, and inactive employees
* Employee list in a responsive table format
* Profile images with fallback avatars
* Dark/Light theme toggle

### Employee Management

* **Add Employee** : Full form with image upload preview
* **Edit Employee** : Pre-populated form for updates
* **Delete Employee** : Confirmation dialog before deletion
* **Toggle Status** : Quick active/inactive toggle

### Search & Filters

* Search by employee name
* Filter by gender (Male/Female/Other)
* Filter by status (Active/Inactive)
* Combined filters work together
* Clear all filters button

### Print Functionality

* Print entire employee list
* Print individual employee record
* Clean print-optimized layout

### Additional Features

* Toast notifications for user actions
* Responsive design for all screen sizes
* Smooth animations and transitions
* Accessible UI components using Radix UI

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
│   ├── ProtectedRoute.tsx      # Auth guard component
│   └── ThemeProvider.tsx       # Theme context provider
├── contexts/
│   ├── AuthContext.tsx         # Authentication state
│   └── EmployeeContext.tsx     # Employee data management
├── data/
│   ├── mockEmployees.ts        # Initial mock data
│   └── states.ts               # Indian states list
├── pages/
│   ├── Dashboard.tsx           # Main dashboard page
│   ├── AuthRedirect.tsx        # Root redirect logic
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
   cd bookxpert-assignment
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

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🔍 Preview Production Build

```bash
npm run preview
```

## 🎨 Design Decisions

1. **Color Palette** : Professional blue as primary color with OKLCH color space for better perceptual uniformity and dark mode support
2. **Component Architecture** : Reusable components with clear separation of concerns using composition pattern
3. **State Management** :

* Context API for global state (auth + employees)
* TanStack Query for server state management (future-ready for API integration)

1. **Responsive Design** : Mobile-first approach with responsive breakpoints and touch-friendly UI
2. **Theme Support** : System-aware dark/light mode with smooth transitions
3. **Accessibility** : Radix UI primitives ensure ARIA-compliant, keyboard-navigable components
4. **Print Optimization** : Separate print-optimized view with clean, minimal styling
5. **Developer Experience** : TypeScript for type safety, ESLint for code quality, and Vite for fast builds

## 🔐 Security Note

This is a demo application using mock authentication. In a production environment, you would:

* Implement proper backend authentication (JWT, OAuth, etc.)
* Use secure session management with httpOnly cookies
* Add proper API endpoints with rate limiting
* Implement server-side validation and sanitization
* Use environment variables for sensitive configuration
* Add CSRF protection

## 🚀 Future Enhancements

* [ ] Backend API integration
* [ ] Real-time updates with WebSockets
* [ ] Advanced filtering and sorting options
* [ ] Export to CSV/Excel functionality
* [ ] Bulk employee operations
* [ ] Employee attendance tracking
* [ ] Role-based access control (RBAC)
* [ ] Audit logs for all operations
* [ ] Advanced analytics dashboard

## 📝 License

MIT License - feel free to use this for learning or as a starter template!
