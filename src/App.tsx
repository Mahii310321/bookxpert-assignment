import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { EmployeeProvider } from "./contexts/EmployeeContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import AuthRedirect from "./pages/AuthRedirect.jsx"
import Login from "./pages/Login.js"
import NotFound from "./pages/NotFound.js"
import { Toaster } from "sonner"
import { ThemeProvider } from "./components/ThemeProvider.js"

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="employee-manager-theme">
        <AuthProvider>
          <EmployeeProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AuthRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </EmployeeProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
