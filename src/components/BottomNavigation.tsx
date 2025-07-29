import { Home, Dumbbell, MessageCircle, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BottomNavigationProps {
  activePage?: string;
}

const BottomNavigation = ({ activePage = "Home" }: BottomNavigationProps) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", active: activePage === "Home", path: "/" },
    { icon: Dumbbell, label: "Workouts", active: activePage === "Workouts", path: "/workouts" },
    { icon: MessageCircle, label: "Chat", active: activePage === "Chat", path: "/chat" },
    { icon: Calendar, label: "Programs", active: activePage === "Programs", path: "/programs" },
    { icon: User, label: "Profile", active: activePage === "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                item.active
                  ? "text-purple-600 bg-purple-50"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              }`}
              aria-label={`Navigate to ${item.label} page`}
              tabIndex={0}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
