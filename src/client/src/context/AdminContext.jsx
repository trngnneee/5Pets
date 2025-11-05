import { useAdminAuth } from "@/hooks/useAdminAuth";
import { createContext, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { userInfo, isLogin } = useAdminAuth();
  
  return (
    <AdminContext.Provider value={{ userInfo }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}