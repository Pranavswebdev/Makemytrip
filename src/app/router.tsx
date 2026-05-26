import { createBrowserRouter, Navigate } from "react-router-dom";
import { PhoneLayout, TabLayout } from "./Layouts";
import { LoginPage } from "../features/auth/LoginPage";
import { SignUpPage } from "../features/auth/SignUpPage";
import { VerifyPage } from "../features/auth/VerifyPage";
import { HomePage } from "../features/home/HomePage";
import { DiscoverPage } from "../features/discover/DiscoverPage";
import { WhereToPage } from "../features/discover/WhereToPage";
import { SearchPage } from "../features/search/SearchPage";
import { SpaceDetailPage } from "../features/space/SpaceDetailPage";
import { ChooseDatePage } from "../features/booking/ChooseDatePage";
import { PaymentPage } from "../features/booking/PaymentPage";
import { SuccessPage } from "../features/booking/SuccessPage";
import { ProfilePage } from "../features/profile/ProfilePage";
import { ChatPage } from "../features/chat/ChatPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  {
    element: <PhoneLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/verify", element: <VerifyPage /> },
      { path: "/where-to", element: <WhereToPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/space/:id", element: <SpaceDetailPage /> },
      { path: "/booking/date", element: <ChooseDatePage /> },
      { path: "/booking/payment", element: <PaymentPage /> },
      { path: "/booking/success", element: <SuccessPage /> },
    ],
  },
  {
    element: <TabLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/discover", element: <DiscoverPage /> },
      { path: "/chat", element: <ChatPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);
