import { MdDashboardCustomize } from "react-icons/md";
import { FaBox, FaUser } from "react-icons/fa";
import { FaTag, FaShoppingBag } from "react-icons/fa";

export const navLinks =
  [
    {
      url: "/",
    //   icon: <MdDashboardCustomize  />,
      label: "Dashboard",
    },
    {
      url: "/collections",
    //   icon: <FaBox />,
      label: "Collections",
    },
    {
      url: "/products",
    //   icon: <FaTag />,
      label: "Products",
    },
    {
      url: "/orders",
    //   icon: <FaShoppingBag />,
      label: "Orders",
    },
    {
      url: "/customers",
    //   icon: <FaUser />,
      label: "Customers",
    },
  ];
