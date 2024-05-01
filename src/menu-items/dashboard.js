// assets
import { IconDashboard, IconForms } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconForms };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'leave-request',
      title: 'Leave Request',
      type: 'item',
      url: '/leave-request',
      icon: icons.IconForms,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
