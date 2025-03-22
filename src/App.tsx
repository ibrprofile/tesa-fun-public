
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import Marketplace from "./pages/Marketplace";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import SellerProfile from "./pages/SellerProfile";
import Messages from "./pages/Messages";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import News from "./pages/News";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Statistics from "./pages/admin/Statistics";
import Settings from "./pages/admin/Settings";
import AdminAuth from "./pages/admin/Auth";
import AdminNewsManagement from "./pages/admin/NewsManagement";
import AdminComments from "./pages/admin/Comments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/seller/:sellerId" element={<SellerProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/news" element={<News />} />
          
          {/* Admin routes */}
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/statistics" element={<Statistics />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/news" element={<AdminNewsManagement />} />
          <Route path="/admin/comments" element={<AdminComments />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
