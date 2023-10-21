import { ChakraProvider } from "@chakra-ui/react";

import "./globalStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { globalTheme } from "./chakraTheme/globalTheme";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NewOutlet from "./pages/NewOutlet";
import WorkOutlets from "./pages/WorkOutlets";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Manual from "./pages/Manual";
import Settings from "./pages/Settings";
import RequireRole from "./middleware/RequireAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProduct from "./pages/AdminRetailProduct";
import AdminManageRetailProduct from "./pages/AdminManageRetailProduct";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/home"
          element={
            <RequireRole allowedRoles={[]}>
              <Home />
            </RequireRole>
          }
        />

        <Route path="/new-outlet" element={<NewOutlet />} />

        <Route
          path="/work"
          element={
            <RequireRole allowedRoles={[]}>
              <WorkOutlets />
            </RequireRole>
          }
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/product"
          element={<AdminProduct />}
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/product/manage/:productId"
          element={<AdminManageRetailProduct />}
        />

        <Route
          path="/explore"
          element={
            <RequireRole allowedRoles={[]}>
              <Explore />
            </RequireRole>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireRole allowedRoles={[]}>
              <Profile />
            </RequireRole>
          }
        />

        <Route
          path="/manual"
          element={
            <RequireRole allowedRoles={[]}>
              <Manual />
            </RequireRole>
          }
        />

        <Route
          path="/settings"
          element={
            <RequireRole allowedRoles={[]}>
              <Settings />
            </RequireRole>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
