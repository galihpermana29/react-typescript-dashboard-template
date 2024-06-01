import { AdminRoleManagementContainer } from '@/routes/admin/admin-management/admin-role-management/AdminRoleManagement';
import { ItemsDataI } from './types';
import { UserManagementContainer } from '@/routes/admin/user-management/UserManagement';
import { VendorContentContainer } from '@/routes/admin/vendor-management/vendor-content/VendorContent';
import { VendorMasterDataContainer } from '@/routes/admin/vendor-management/vendor-master-data/VendorMasterData';
import { VendorProductContainer } from '@/routes/vendor/product/VendorProduct';
import { VendorUserManagementContainer } from '@/routes/admin/vendor-management/vendor-user-management/VendorUserManagement';
import adminManagIconGray from '@/assets/icon/admin-manag-icon-gray.svg';
import adminRoleManagIconGray from '@/assets/icon/admin-role-manag-icon-gray.svg';
import ClientUserDetailContainer from '@/routes/admin/user-management/view/container/Detail/ClientUserDetail';
import ClientUserEditContainer from '@/routes/admin/user-management/view/container/Edit/ClientUserEdit';
import DashboardContainer from '../../../../../routes/admin/dashboard/Dashboard';
import dashboardIconGray from '@/assets/icon/dashboard-icon-gray.svg';
import userManagIconGray from '@/assets/icon/user-manag-gray-icon.svg';
import VendorContentDetailContainer from '@/routes/admin/vendor-management/vendor-content/view/container/Detail/VendorContentDetail';
import VendorContentEditContainer from '@/routes/admin/vendor-management/vendor-content/view/container/Edit/VendorContentEdit';
import vendorContentIconGray from '@/assets/icon/vendor-content-icon-gray.svg';
import VendorDashboardContainer from '@/routes/vendor/dashboard/VendorDashboard';
import vendorMasterDataIconGray from '@/assets/icon/vendor-master-data-gray-icon.svg';
import VendorProductCreateContainer from '@/routes/vendor/product/view/container/Create/VendorContentCreate';
import VendorProductDetailContainer from '@/routes/vendor/product/view/container/Detail/VendorContentDetail';
import VendorProductEditContainer from '@/routes/vendor/product/view/container/Edit/VendorContentEdit';
import vendorProductIconGray from '@/assets/icon/product-icon-gray.svg';
import VendorUserCreateContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import VendorUserDetailContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Detail/VendorUserDetail';
import VendorUserEditContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Edit/VendorUserEdit';
import vendorUserManagIconGray from '@/assets/icon/vendor-user-manag-icon-gray.svg';
import AdminUserManagementContainer from '@/routes/admin/admin-management/admin-user-management/AdminUserManagement';

export const vendorRoutes: ItemsDataI[] = [
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">
        Dashboard
      </div>
    ),
    key: '/home',
    path: 'home',
    children: [],
    icon: <img src={dashboardIconGray} alt="icon" />,
    components: <VendorDashboardContainer />,
    show: true,
  },
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
    ),
    key: '/vendor-product',
    path: 'vendor-product',
    children: [],
    icon: <img src={vendorProductIconGray} alt="icon" />,
    components: <VendorProductContainer />,
    show: true,
  },
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
    ),
    key: '/vendor-product/create',
    path: 'vendor-product/create',
    children: [],
    icon: <img src={vendorProductIconGray} alt="icon" />,
    components: <VendorProductCreateContainer />,
    show: false,
  },
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
    ),
    key: '/vendor-product/edit/:id',
    path: 'vendor-product/edit/:id',
    children: [],
    icon: <img src={vendorProductIconGray} alt="icon" />,
    components: <VendorProductEditContainer />,
    show: false,
  },
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
    ),
    key: '/vendor-product/detail/:id',
    path: 'vendor-product/detail/:id',
    children: [],
    icon: <img src={vendorProductIconGray} alt="icon" />,
    components: <VendorProductDetailContainer />,
    show: false,
  },
];

export const staffRoutes: ItemsDataI[] = [
  {
    label: (
      <div className="text-caption-1 font-[400] text-ny-gray-300">
        Dashboard
      </div>
    ),
    key: '/home',
    path: 'home',
    children: [],
    icon: <img src={dashboardIconGray} alt="icon" />,
    components: <DashboardContainer />,
    show: true,
  },
  {
    label: (
      <div>
        <div className="text-caption-1 font-[400] text-ny-gray-300">ADMIN</div>
      </div>
    ),
    key: '/admin-management',
    path: 'admin-management',
    children: [
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Admin Account
          </div>
        ),
        key: '/admin-account',
        path: 'admin-account',
        children: null,
        icon: <img src={adminManagIconGray} alt="icon" />,
        components: <AdminUserManagementContainer />,
        show: true,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Role Management
          </div>
        ),
        key: '/role-management',
        path: 'role-management',
        children: null,
        icon: <img src={adminRoleManagIconGray} alt="icon" />,
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
        <div className="text-caption-1 font-[400] text-ny-gray-300">VENDOR</div>
      </div>
    ),
    key: '/vendor-management',
    path: 'vendor-management',
    children: [
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor Account
          </div>
        ),
        key: '/vendor-account',
        path: 'vendor-account',
        children: null,
        icon: <img src={vendorUserManagIconGray} alt="icon" />,
        components: <VendorUserManagementContainer />,
        show: true,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor User Create
          </div>
        ),
        key: '/vendor-account/create-user',
        path: 'vendor-account/create-user',
        children: [],
        icon: <img src={vendorUserManagIconGray} alt="icon" />,
        components: <VendorUserCreateContainer />,
        show: false,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor User Create
          </div>
        ),
        key: '/vendor-account/detail-user',
        path: 'vendor-account/detail-user/:id',
        children: [],
        icon: <img src={vendorUserManagIconGray} alt="icon" />,
        components: <VendorUserDetailContainer />,
        show: false,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor Edit
          </div>
        ),
        key: '/vendor-account/edit-user',
        path: 'vendor-account/edit-user/:id',
        children: [],
        icon: <img src={vendorUserManagIconGray} alt="icon" />,
        components: <VendorUserEditContainer />,
        show: false,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor Product
          </div>
        ),
        key: '/vendor-product',
        path: 'vendor-product',
        children: null,
        icon: <img src={vendorContentIconGray} alt="icon" />,
        components: <VendorContentContainer />,
        show: true,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor Edit
          </div>
        ),
        key: '/vendor-product/edit-product',
        path: 'vendor-product/edit-product/:id',
        children: [],
        icon: <img src={vendorContentIconGray} alt="icon" />,
        components: <VendorContentEditContainer />,
        show: false,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Vendor Detail
          </div>
        ),
        key: '/vendor-product/detail-product',
        path: 'vendor-product/detail-product/:id',
        children: [],
        icon: <img src={vendorContentIconGray} alt="icon" />,
        components: <VendorContentDetailContainer />,
        show: false,
      },
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            Master Data
          </div>
        ),
        key: '/master-data',
        path: 'master-data',
        children: null,
        icon: <img src={vendorMasterDataIconGray} alt="icon" />,
        components: <VendorMasterDataContainer />,
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
        <div className="text-caption-1 font-[400] text-ny-gray-300">USER</div>
      </div>
    ),
    key: '/user-account',
    path: 'user-account',
    children: [
      {
        label: (
          <div className="text-caption-1 font-[400] text-ny-gray-300">
            User Account
          </div>
        ),
        key: '/user-account',
        path: 'user-account',
        children: null,
        icon: <img src={userManagIconGray} alt="icon" />,
        components: <UserManagementContainer />,
        show: true,
      },
      {
        label: null,
        key: '/user-account/detail-user',
        path: 'user-account/detail-user/:id',
        children: [],
        icon: <img src={userManagIconGray} alt="icon" />,
        components: <ClientUserDetailContainer />,
        show: false,
      },
      {
        label: null,
        key: '/user-account/edit-user',
        path: 'user-account/edit-user/:id',
        children: [],
        icon: <img src={userManagIconGray} alt="icon" />,
        components: <ClientUserEditContainer />,
        show: false,
      },
    ],
    icon: null,
    components: <DashboardContainer />,
    show: true,
  },
];
