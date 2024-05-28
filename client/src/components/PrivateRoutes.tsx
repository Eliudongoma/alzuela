import { Outlet, Navigate } from "react-router-dom"
import useUsers from "../hooks/useUsers"

export default function PrivateRoutes() {
  const { currentUser } = useUsers();
  return currentUser ? <Outlet/> : <Navigate to="/signin"/>  
}
