
import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/app",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/app/assets",
    element: <ProtectedRoute><Assets /></ProtectedRoute>,
  }
];

export default routes;
