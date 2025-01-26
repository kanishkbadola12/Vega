import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";


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

  useEffect(() => {
    if (!localStorage.getItem('loginCredentials')) {
      const credentials = {
        fullName: 'Kanishk Badola',
        email: 'admin@vega.com',
        password: 'vega123'
      };
  
      localStorage.setItem('loginCredentials', JSON.stringify(credentials));
    }
  }, []);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Enter your email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Enter your password"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <Button
            label="Sign In"
            onClick={(e: React.MouseEvent) => handleSubmit(e)}
            styleClass="w-full py-2 px-4 bg-black text-white font-medium rounded-lg shadow-md focus:outline-none cursor-pointer"
          />
      </div>
    </div>
  );
}

export default Login;
