import {
  CircleAlert,
  LogOutIcon,
  Moon,
  Home,
  Compass,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import BioInput from "@/components/user/editProfile/BioInput";
import EmailInput from "@/components/user/editProfile/EmailInput";
import FullName from "@/components/user/editProfile/FullName";
import PictureInput from "@/components/user/editProfile/PictureInput";
import UsernameInput from "@/components/user/editProfile/UsernameInput";

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Home" },
  { icon: <Compass className="w-5 h-5" />, label: "Explore" },
  { icon: <Bell className="w-5 h-5" />, label: "Notifications" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings" },
];

const EditProfile: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar - responsive */}
      <aside
        className={cn(
          "w-full md:w-64 bg-white h-screen  border-r shadow-md p-4 flex flex-col fixed top-0",
          "z-40 transition-transform duration-300 ease-in-out overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col gap-6 mt-12 md:mt-0">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content - responsive */}
      <div className="flex-1 p-4 md:p-6 min-h-screen overflow-y-auto mt-0 md:mt-0">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b gap-4">
            <h1 className="text-xl md:text-2xl font-semibold">Profile</h1>

            {/* Icons Section */}
            <div className="flex gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <LogOutIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
                <CircleAlert className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
              {/* Profile Picture Placeholder */}
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-300 text-white font-bold">
                AP
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-xs md:text-sm mt-4">
            Manage your account settings and set e-mail preferences. This is how
            others will see you on the site.
          </p>

          {/* Profile Fields */}
          <div className="space-y-4 mt-6">
            <PictureInput />
            <UsernameInput />
            <EmailInput />
            <FullName />
            <BioInput />
          </div>

          {/* Update Button - Responsive */}
          <div className="mt-6 flex justify-center">
            <button className="w-full md:w-auto px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-100 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default EditProfile;
