import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icons,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "ui";

const menuItems = [
  {
    label: "Dashboard",
    icon: <Icons.Dashboard className="h-6 w-6" />,
    path: "/",
  },
  {
    label: "Estoque",
    icon: <Icons.Stock />,
    path: "pantry",
  },
  {
    label: "Lista de compras",
    icon: <Icons.ShoppingCart />,
    path: "",
  },
];

export function Sidebar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const sidebarWidth = isSidebarExpanded ? "w-60" : "w-20";
  const rotateArrow = isSidebarExpanded ? "rotate-180" : "";
  const showMenuText = isSidebarExpanded ? "inline" : "hidden";
  const showTooltip = isSidebarExpanded ? "hidden" : "inline";

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <aside
      className={`duration-300 ${sidebarWidth} bg-gray-800 text-white p-5 pt-6 relative`}
    >
      <Button
        className="rounded-full w-6 h-6 absolute -right-3 top-9 border"
        size="icon"
        onClick={toggleSidebar}
      >
        <Icons.ArrowRight className={` duration-300 ${rotateArrow} `} />
      </Button>
      <nav className="mt-8">
        <ul>
          <TooltipProvider>
            {menuItems.map(({ icon, label, path }, index) => (
              <li
                key={index}
                className="text-sm flex items-center gap-x-4 p-2 rounded-md"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full h-full text-2xl p-2 gap-4 items-center duration-300"
                    >
                      <Link to={path}>
                        <span className="text-2xl block float-left">
                          {icon}
                        </span>
                        <span
                          className={`text-base font-medium flex-1 duration-300 ${showMenuText} `}
                        >
                          {label}
                        </span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={1} className={`${showTooltip}`}>
                    {label}
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </TooltipProvider>
        </ul>
      </nav>
    </aside>
  );
}
