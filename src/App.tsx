// import React from "react";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Header from "./components/design/navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validateAuthSession } from "./store/authSlice";
import cookie from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  // const { theme } = useSelector((state: any) => state.common);
  const token = cookie.get("authToken");

  useEffect(() => {
    if (token) dispatch(validateAuthSession(null));
  }, []);

  return (
    <NextUIProvider>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Login />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
