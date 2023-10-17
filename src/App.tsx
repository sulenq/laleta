import { ChakraProvider } from "@chakra-ui/react";

import "./globalStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { globalTheme } from "./chakraTheme/globalTheme";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
