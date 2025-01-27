import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/Not Found";

const App = (): React.ReactElement => {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
