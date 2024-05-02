import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeaveRequest = Loadable(lazy(() => import('views/leave-request')));
const CreateLeave = Loadable(lazy(() => import('views/leave-request/create')));
const LeaveList = Loadable(lazy(() => import('views/leave-request/list')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'leave-request',
      children: [
        {
          path: 'leave-calendar',
          element: <LeaveRequest />
        },
        {
          path: 'create',
          element: <CreateLeave />
        },
        {
          path: 'leave-list',
          element: <LeaveList />
        }
      ]
    }
  ]
};

export default MainRoutes;
