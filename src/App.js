import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Loader from "./components/Loader";
import { Analytics } from "@vercel/analytics/react"

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));

// Layout Wrapper (Ensures Header and Footer are always there)
const Layout = ({ children }) => (
  <>
    {/* <Header /> */}
    {children}
    {/* <FooterSection /> */}
  </>
);
  
function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
          <Analytics />
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
