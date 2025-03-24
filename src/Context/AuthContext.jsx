import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
    navigate("/"); // Redirect to home after login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
