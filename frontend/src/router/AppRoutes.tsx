import AppLayout from "@/layouts/AppLayout";
import LoginPage from "@/pages/auth/Auth";
import LandingPage from "@/pages/landingPage/LandingPage";
import EditProfile from "@/pages/profile/editProfile";
import Profile from "@/pages/profile/Profile";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    { path: "/", element: <LandingPage/> },
    {
      path: "/",
      element:<AppLayout />,
      children: [
        { path: "home" , element: <div> Feeds </div>},
        { path: "explore" , element: <div> Explore </div>},
        { path: "activity" , element: <div> Activity </div>},
        { path: "profile", element: <Profile /> },
      ],
    },
    { path: "auth", element: < LoginPage /> },
    { path:"editProfile", element: <EditProfile/> }

  ]);

