import { ChakraProvider } from "@chakra-ui/react";

import "./globalStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { globalTheme } from "./chakraTheme/globalTheme";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NewStore from "./pages/NewStore";
import Work from "./pages/Work";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Manual from "./pages/Manual";
import Settings from "./pages/Settings";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/home" element={<Home />} />
        <Route path="/new-store" element={<NewStore />} />
        <Route path="/work" element={<Work />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
