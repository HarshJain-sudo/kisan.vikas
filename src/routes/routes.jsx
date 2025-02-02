import { lazy } from "react";
const ComingSoonPage = lazy(() => import("../pages/ComingSoon"));
const KisanVikasAbout = lazy(() => import("../pages/KisanVikasAbout"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AgriBazarRoutes = lazy(() => import("../products/AgriBazar/AgriBazarRoutes"));
const Home = lazy(() => import("../pages/Home"));


const routes = [
  { path: "/", component: Home },
  { path: "/coming-soon", component: ComingSoonPage },
  { path: "/about", component: KisanVikasAbout },
  { path: "/contact", component: ContactPage },
  { path: "/agribazar/*", component: AgriBazarRoutes },
];

export default routes;
