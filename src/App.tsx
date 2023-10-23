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
import RequireAuth from "./middleware/RequireAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProduct from "./pages/AdminRetailProduct";
import AdminManageRetailProduct from "./pages/AdminManageRetailProduct";
import AdminExpenditure from "./pages/AdminExpenditure";
import AdminEmployee from "./pages/AdminEmployee";
import AdminReport from "./pages/AdminReport";
import CashierDashboard from "./pages/CashierDashboard";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="/new-outlet" element={<NewOutlet />} />

        <Route
          path="/work"
          element={
            <RequireAuth>
              <WorkOutlets />
            </RequireAuth>
          }
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/dashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path={"/work/:outletId/:employeeId/Admin/product"}
          element={
            <RequireAuth>
              <AdminProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/product/manage/:productId"
          element={
            <RequireAuth>
              <AdminManageRetailProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/expenditure"
          element={<AdminExpenditure />}
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/employee"
          element={<AdminEmployee />}
        />
        <Route
          path="/work/:outletId/:employeeId/Admin/report"
          element={<AdminReport />}
        />
        <Route
          path="/work/:outletId/:employeeId/Cashier/dashboard"
          element={
            <RequireAuth>
              <CashierDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/explore"
          element={
            <RequireAuth>
              <Explore />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/manual"
          element={
            <RequireAuth>
              <Manual />
            </RequireAuth>
          }
        />

        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
