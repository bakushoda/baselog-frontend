import api from "@lib/api";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return { token, logout };
};
