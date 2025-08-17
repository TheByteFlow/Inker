import { SidebarTrigger } from "../../ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { DEFAULT_IMG } from "@/utils/constents";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { showConfirmDialog } from "@/store/slices/confirmDialogSlice";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast.error("Logout failed");
      return;
    }
    navigate("/auth");
  };

  return (
    <header className="px-0 sm:px-6 py-4 w-full sticky top-0 border-b bg-white dark:bg-black z-20">
      <div className="flex justify-end md:justify-between items-center">
        <SidebarTrigger className="-translate-x-4 hidden md:flex items-center justify-center" />
        <div className="flex items-center gap-4 mr-2">
          <SearchBar />
          <ThemeToggle />
          {isAuthenticated && (
            <>
              {/* Mobile View: Dropdown Menu */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-10 h-10 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="User Menu"
                    >
                      <img
                        className="w-full h-full rounded-md object-cover"
                        src={user?.profilePicture || DEFAULT_IMG}
                        alt="User Profile"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                  >
                    <DropdownMenuItem
                      onClick={() => navigate(`/profile/${user?.username}`)}
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        dispatch(
                          showConfirmDialog({
                            title: "Logout",
                            confirmText: "Logout",
                            cancelText: "Cancel",
                            description: "Are you sure you want to logout?",
                            onConfirm: () => handleLogout(),
                          })
                        )
                      }
                      className="flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Desktop View: Direct Profile Link */}
              <Link to={`/profile/${user?.username}`} className="hidden md:block">
                <img
                  className="w-10 h-10 rounded-md border-2"
                  src={user?.profilePicture || DEFAULT_IMG}
                  alt="User Profile"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
