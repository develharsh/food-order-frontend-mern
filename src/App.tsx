// import React from "react";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Header from "./components/design/navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { noToken, validateAuthSession } from "./store/authSlice";
import cookie from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConsumerDashboard from "./pages/consumer/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  // const { theme } = useSelector((state: any) => state.common);
  // const { isAuthenticated, userInfo } = useSelector((state: any) => state.auth);
  const token = cookie.get("authToken");

  useEffect(() => {
    // alert("y");
    if (token) dispatch(validateAuthSession());
    else dispatch(noToken());
  }, [dispatch, token]);

  return (
    <NextUIProvider>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Login />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="c">
              <Route index element={<ConsumerDashboard />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
