// import React from 'react'
import { useSelector } from "react-redux";
import Loader from "../../../components/design/loading";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import { EUserRoles } from "../../../types";

const ToastProps: ToastOptions<{}> = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, status, AuthState } = useSelector(
    (state: any) => state.auth
  );
  useEffect(() => {
    // alert(`${AuthState}}`);
    if (AuthState === "UNAUTH") {
      toast.error(`You are not authorized to view this page`, ToastProps);
      navigate("/");
    } else if (
      AuthState === "AUTH" &&
      userInfo.user_role !== EUserRoles.consumer
    ) {
      toast.error(
        `You are not authorized as a ${userInfo.user_role} to view this page`,
        ToastProps
      );
      navigate("/");
    }
    return () => {};
  }, [AuthState, navigate, userInfo]);

  if (isAuthenticated)
    return (
      <Fragment>
        <div>Hey {userInfo.user_name}</div>
      </Fragment>
    );
  return <Loader status={status} styled />;
};

export default ConsumerDashboard;
