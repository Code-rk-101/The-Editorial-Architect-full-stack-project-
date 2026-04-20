import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import AuthContext from "../auth.context";
import {
  getMe,
  login,
  logout,
  register,
  updateProfile,
} from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  async function handleLogin({ email, password }) {
    setLoading(true);
    const toastId = toast.loading("Logging in...");
    try {
      const data = await login({ email, password });
      setUser(data.user);
      toast.success("Logged in successfully!", { id: toastId });
      return null;
    } catch (error) {
      let errorMessage = error?.response?.data?.message || "Failed to login";

      if (error?.errors && typeof error.errors === "object") {
        errorMessage = Object.values(error.errors)[0][0] || errorMessage;
      }
      console.log(errorMessage);
      toast.error(errorMessage, { id: toastId });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      toast.success("Account created successfully!", { id: toastId });
      return null;
    } catch (error) {
      console.log(error);
      let errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to register";

      if (error?.errors && typeof error.errors === "object") {
        errorMessage = Object.values(error.errors)[0][0] || errorMessage;
      }

      toast.error(errorMessage, { id: toastId });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const toastId = toast.loading("Logging out...");
    try {
      const data = await logout();
      console.log(data);
      setUser(null);
      toast.success("Logged out successfully!", { id: toastId });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Failed to logout";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async ({ formData }) => {
    setLoading(true);
    const toastId = toast.loading("Updating profile...");
    try {
      const data = await updateProfile(formData);
      setUser(data.user);
      toast.success("Profile updated successfully!", { id: toastId });
    } catch (error) {
      console.log(error);
      let errorMessage = error?.message || "Failed to update profile";
      
      if (error?.errors && typeof error.errors === 'object') {
        errorMessage = Object.values(error.errors)[0][0]|| errorMessage;
      }
      console.log(errorMessage);
      
      toast.error(errorMessage, { id: toastId });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
        // Intentionally not showing a toast error here because it's expected for unauthenticated users
      } finally {
        setLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateProfile,
  };
};
