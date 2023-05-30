import { Fragment, useEffect, useState } from "react";
import "./Login.css";
import { Modal, Button, Text, Input, Radio, Row } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthAlert, signup } from "../../store/authSlice";
import { toggleLoginModal, toggleSignupModal } from "../../store/commonSlice";
import { EUserRoles } from "../../types";
import { ToastOptions, toast } from "react-toastify";
import Loader from "../design/loading";

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

const Login = () => {
  const dispatch = useDispatch();
  const { showLoginModal, showSignupModal } = useSelector(
    (state: any) => state.common
  );
  const { AuthAlert, status } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (AuthAlert) {
      if (AuthAlert.type == "success") {
        toast.success(AuthAlert.msg, ToastProps);
        showLoginModal
          ? dispatch(toggleLoginModal())
          : dispatch(toggleSignupModal());
      } else if (AuthAlert.type == "warn") {
        toast.warn(AuthAlert.msg, ToastProps);
      } else if (AuthAlert.type == "info") {
        toast.info(AuthAlert.msg, ToastProps);
      } else if (AuthAlert.type == "error") {
        toast.error(AuthAlert.msg, ToastProps);
      }
      dispatch(resetAuthAlert());
    }
    return () => {};
  }, [AuthAlert]);

  const [data, setData] = useState({
    user_email: "",
    user_password: "",
    user_name: "",
    user_role: EUserRoles.consumer,
  });

  const handleSubmit = async () => {
    showLoginModal ? dispatch(login(data)) : dispatch(signup(data));
  };
  const closeHandler = () => {
    if (showLoginModal) dispatch(toggleLoginModal());
    if (showSignupModal) dispatch(toggleSignupModal());
  };
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Modal
        closeButton
        aria-labelledby="modal-login"
        open={showLoginModal}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Login
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            name="user_email"
            value={data.user_email}
            onChange={handleChange}
            // contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            name="user_password"
            value={data.user_password}
            onChange={handleChange}
            // contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            {/* <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox> */}
            <Text size={14}>Forgot password?</Text> <Loader status={status} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={handleSubmit}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-signup"
        open={showSignupModal}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            New User?{" "}
            <Text b size={18}>
              Signup
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
            name="user_name"
            value={data.user_name}
            onChange={handleChange}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            name="user_email"
            value={data.user_email}
            onChange={handleChange}
            // contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            name="user_password"
            value={data.user_password}
            onChange={handleChange}
            // contentLeft={<Password fill="currentColor" />}
          />
          <Radio.Group
            orientation="horizontal"
            label="Who you are?"
            defaultValue="consumer"
            onChange={(e: any) => setData({ ...data, user_role: e })}
          >
            <Radio value="consumer" color="primary">
              {getTitle(EUserRoles.consumer)}
            </Radio>
            <Radio value="provider" color="primary">
              {getTitle(EUserRoles.provider)}
            </Radio>
            <Radio value="delivery" color="primary">
              {getTitle(EUserRoles.delivery)}
            </Radio>
          </Radio.Group>
          <Row justify="flex-start">
            {/* <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox> */}
            <Loader status={status} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={handleSubmit}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const getTitle = (str: string): string => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

export default Login;
