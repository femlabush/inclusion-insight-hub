import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataUpload from "./pages/admin/DataUpload";
import Analytics from "./pages/analyst/Analytics";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes with dashboard layout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/upload" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <DataUpload />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/processing" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Processing Status</h2>
                    <p className="text-muted-foreground">Processing status page coming soon...</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">User Management</h2>
                    <p className="text-muted-foreground">User management page coming soon...</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Analyst routes */}
            <Route path="/analyst/analytics" element={
              <ProtectedRoute allowedRoles={['analyst']}>
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/analyst/reports" element={
              <ProtectedRoute allowedRoles={['analyst']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Report Export</h2>
                    <p className="text-muted-foreground">Report export page coming soon...</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Shared routes */}
            <Route path="/data-sources" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
                    <p className="text-muted-foreground">Data sources page coming soon...</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Settings</h2>
                    <p className="text-muted-foreground">Settings page coming soon...</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
