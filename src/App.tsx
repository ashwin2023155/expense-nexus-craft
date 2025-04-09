
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import EventsPage from "./pages/events/EventsPage";
import EventsCreate from "./pages/events/EventsCreate";
import EventDetail from "./pages/events/EventDetail";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import ExpensesCreate from "./pages/expenses/ExpensesCreate";
import AllocationsPage from "./pages/allocations/AllocationsPage";
import BillsPage from "./pages/bills/BillsPage";
import BillsUpload from "./pages/bills/BillsUpload";
// Import these pages when they're created
// import ReportsPage from "./pages/reports/ReportsPage";
// import UsersPage from "./pages/users/UsersPage";
// import SettingsPage from "./pages/settings/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          
          {/* Auth routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          
          {/* App routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Events routes */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/new" element={<EventsCreate />} />
          <Route path="/events/:id" element={<EventDetail />} />
          
          {/* Expenses routes */}
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/expenses/new" element={<ExpensesCreate />} />
          
          {/* Allocations route */}
          <Route path="/allocations" element={<AllocationsPage />} />
          
          {/* Bills routes */}
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/bills/upload" element={<BillsUpload />} />
          
          {/* Reports route */}
          {/* Route temporarily disabled until ReportsPage is created */}
          {/* <Route path="/reports" element={<ReportsPage />} /> */}
          
          {/* Users management */}
          {/* Route temporarily disabled until UsersPage is created */}
          {/* <Route path="/users" element={<UsersPage />} /> */}
          
          {/* Settings */}
          {/* Route temporarily disabled until SettingsPage is created */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
