import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ErrorPage from "./pages/ErrorPage";
import AdminPage from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/blog",
    Component: BlogPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/blog/:id",
    Component: BlogPostPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/admin",
    Component: AdminPage,
    ErrorBoundary: ErrorPage,
  },
]);
