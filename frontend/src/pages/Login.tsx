import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = (): React.ReactElement => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    let isValid = true;

    if (!userEmail) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!userPassword) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = (e: React.MouseEvent): void => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) {
      setIsAuthenticated(true);
      return;
    }

    // Check credentials in localStorage
    const credentials = localStorage.getItem("loginCredentials");
    if (credentials) {
      const { email, password } = JSON.parse(credentials);

      if (userEmail === email && userPassword === password) {
        setIsAuthenticated(true);
        navigate("/portfolio");
      } else {
        setIsAuthenticated(false);
      }
    } else {
      console.log("No credentials found in localStorage.");
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <div className="mb-2">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
              setEmailError(null);
              setIsAuthenticated(true);
            }}
            hasError={!!emailError}
            errorMessage={emailError}
          />
        </div>
        <div className="mb-2">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
              setPasswordError(null);
              setIsAuthenticated(true);
            }}
            hasError={!!passwordError}
            errorMessage={passwordError}
          />
        </div>
        <Button
          label="Sign In"
          onClick={(e: React.MouseEvent) => handleSubmit(e)}
          styleClass="w-full py-2 px-4 bg-black text-white font-medium rounded-lg shadow-md cursor-pointer hover:bg-gray-800 transition duration-300"
          testId="sign-in-button"
        />
        {!isAuthenticated && (
          <span className="text-red-500 text-center text-sm block mt-4">
            Invalid credentials
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
