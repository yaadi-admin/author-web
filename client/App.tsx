import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Author from "./pages/Author";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminBlog from "./pages/admin";
import Workshops from "./pages/Workshops";
import Foundation from "./pages/Foundation";
// Temporarily unpublished while the retreat is restructured (Oct online + Feb in-person).
// import LoverNeverEnds from "./pages/LoverNeverEnds";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/author" element={<Author />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminBlog />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/foundation" element={<Foundation />} />
          {/* Love Never Ends temporarily unpublished — restore route when details are finalized */}
          {/* <Route path="/lover-never-ends" element={<LoverNeverEnds />} /> */}
          {/* <Route path="/love-never-ends" element={<LoverNeverEnds />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
