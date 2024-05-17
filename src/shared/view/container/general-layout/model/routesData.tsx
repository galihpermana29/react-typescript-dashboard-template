import adminManagIconGray from "@/assets/icon/admin-manag-icon-gray.svg";
import dashboardIconGray from "@/assets/icon/dashboard-icon-gray.svg";
import AdminUserManagementContainer from "@/routes/admin-management/admin-user-management/AdminUserManagement";
import { VendorContentContainer } from "@/routes/vendor-management/vendor-content/VendorContent";
import { VendorUserManagementContainer } from "@/routes/vendor-management/vendor-user-management/VendorUserManagement";
import DashboardContainer from "../../../../../routes/dashboard/Dashboard";
import { ItemsDataI } from "./types";


export const staffRoutes: ItemsDataI[] = [
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">
        Dashboard
      </div>
    ),
    key: "/home",
    path: "home",
    children: [],
    icon: <img src={dashboardIconGray} alt="icon" />,
    components: <DashboardContainer />,
    show: true,
  },
  {
    label: (
      <div>
        <div className="text-caption-1 font-[400] text-ny-gray-300">
          ADMIN MANAGEMENT
        </div>
      </div>
    ),
    key: "/admin-management",
    path: "admin-management",
    children: [
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Admin User Management
          </div>
        ),
        key: "/admin-user-management",
        path: "admin-user-management",
        children: null,
        icon: <img src={adminManagIconGray} alt="icon" />,
        components: <AdminUserManagementContainer />,
        show: true,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Admin Role Management
          </div>
        ),
        key: "/admin-role-management",
        path: "admin-role-management",
        children: null,
        icon: <img src={adminManagIconGray} alt="icon" />,
        components: <AdminRoleManagementContainer />,
        show: true,
      },
    ],
    icon: null,
    components: <DashboardContainer />,
    show: true,
  },
  {
    label: (
      <div>
        <div className="text-caption-1 font-[400] text-ny-gray-300">
          VENDOR MANAGEMENT
        </div>
      </div>
    ),
    key: "/vendor-management",
    path: "vendor-management",
    children: [
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor User Management
          </div>
        ),
        key: "/vendor-user-management",
        path: "vendor-user-management",
        children: null,
        icon: <img src={adminManagIconGray} alt="icon" />,
        components: <VendorUserManagementContainer />,
        show: true,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor Content
          </div>
        ),
        key: "/vendor-content",
        path: "vendor-content",
        children: null,
        icon: <img src={adminManagIconGray} alt="icon" />,
        components: <VendorContentContainer />,
        show: true,
      },
    ],
    icon: null,
    components: <DashboardContainer />,
    show: true,
  },
];
