import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import IntersectObserver from "@/components/common/IntersectObserver";
import StickyHeader from "@/components/layouts/StickyHeader";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";

import { routes } from "./routes";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <IntersectObserver />

      <StickyHeader />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
};

export default App;