
import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";
import { Layout } from "@/components/layout/Layout";

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
    element: <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>,
  },
  {
    path: "/app/assets",
    element: <ProtectedRoute><Layout><Assets /></Layout></ProtectedRoute>,
  }
];

export default routes;
