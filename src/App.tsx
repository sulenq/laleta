import { ChakraProvider } from "@chakra-ui/react";

import "./globalStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { globalTheme } from "./chakraTheme/globalTheme";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/home" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
