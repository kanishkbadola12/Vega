import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


const Login = (): React.ReactElement => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent): void => {
    e.preventDefault();
    const credentials = localStorage.getItem('loginCredentials');

    if (credentials) {
      const { email, password } = JSON.parse(credentials);

      if(userEmail === email && userPassword === password) {
        navigate('/portfolio');
      } else {
        console.log("Invalid credentials");
      }
    } else {
      console.log("No credentials found in localStorage.");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
          <div className="mb-4">
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <Button
            label="Sign In"
            onClick={(e: React.MouseEvent) => handleSubmit(e)}
            styleClass="w-full py-2 px-4 bg-black text-white font-medium rounded-lg shadow-md focus:outline-none cursor-pointer"
            testId="sign-in-button"
          />
      </div>
    </div>
  );
}

export default Login;
