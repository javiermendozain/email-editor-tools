// Components
import { Home, Multimedia } from "./pages";

// Add protected property as true to add security at component
// Add onlyAdmin property as true to add security at component

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
];

export default routes;
