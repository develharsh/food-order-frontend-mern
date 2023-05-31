import "./Navbar.css";

// import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../../../store/authSlice";
import {
  toggleLoginModal,
  toggleSignupModal,
} from "../../../store/commonSlice";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
const collapseItems = [
  "Features",
  "Customers",
  "Pricing",
  "Company",
  "Legal",
  "Team",
  "Help & Feedback",
  "Login",
  "Sign Up",
];

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  // const location = useLocation();

  // const isActive = (key: string): string => {
  //   if (key === location.pathname) return "active";
  //   else return "";
  // };

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Navbar.Toggle aria-label="toggle navigation" />
        <Logo />
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        <Navbar.Link isActive href="/features">
          Features
        </Navbar.Link>
        <Navbar.Link href="#">Customers</Navbar.Link>
        <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        <Navbar.Link href="/company">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!isAuthenticated ? (
          <>
            <Navbar.Item>
              <Button
                auto
                color="primary"
                onPress={() => dispatch(toggleLoginModal())}
              >
                Log In
              </Button>
            </Navbar.Item>
            <Navbar.Item>
              <Button
                auto
                color="success"
                onPress={() => dispatch(toggleSignupModal())}
              >
                Sign Up
              </Button>
            </Navbar.Item>
          </>
        ) : (
          <Navbar.Item>
            <Button auto color="error" onPress={() => dispatch(removeAuth())}>
              Log Out
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

const Logo = () => {
  return (
    <svg
      className=""
      fill="none"
      height="36"
      viewBox="0 0 32 32"
      width="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Header;
