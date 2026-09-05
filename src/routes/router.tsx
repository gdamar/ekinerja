import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter, useLocation } from 'react-router';
import App from 'App';
import AuthLayout from 'layouts/auth-layout';
import MainLayout from 'layouts/main-layout';
import PetugasLayout from 'layouts/petugas-layout';
import { InProgress } from 'pages/errors/InProgress';
import Page404 from 'pages/errors/Page404';
import { TaskHistory } from 'pages/petugas/task_history';
import { TaskInput } from 'pages/petugas/task_input';
import PageLoader from 'components/loading/PageLoader';
import { TaskList } from 'components/sections/petugas/TaskList';
import paths, { petugasPaths, rootPaths } from './paths';

const Analytics = lazy(() => import('pages/dashboard/Analytics'));
const UserList = lazy(() => import('pages/users/UserList'));
const Starter = lazy(() => import('pages/others/Starter'));
const Account = lazy(() => import('pages/others/Account'));

const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));

export const SuspenseOutlet = () => {
  const location = useLocation();

  return (
    <Suspense key={location.pathname} fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <MainLayout>
            <SuspenseOutlet />
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Analytics />,
          },
          {
            path: paths.users,
            element: <UserList />,
          },
          {
            path: paths.account,
            element: <Account />,
          },
          {
            path: paths.starter,
            element: <Starter />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <SuspenseOutlet />
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <Signup />,
          },
        ],
      },

      {
        path: paths['404'],
        element: <Page404 />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
      {
        path: paths.wip,
        element: <InProgress />,
      },
    ],
  },
  {
    path: 'petugas',
    element: (
      <PetugasLayout>
        <SuspenseOutlet />
      </PetugasLayout>
    ),
    children: [
      {
        path: petugasPaths.tasks,
        element: <TaskList />,
      },
      {
        path: petugasPaths.taskInput,
        element: <TaskInput />,
      },
      {
        path: petugasPaths.tasksHistory,
        element: <TaskHistory />,
      },
      {
        path: paths.users,
        element: <UserList />,
      },
      {
        path: paths.account,
        element: <Account />,
      },
      {
        path: paths.starter,
        element: <Starter />,
      },
      {
        path: petugasPaths.wip,
        element: <InProgress />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.MODE === 'production' ? import.meta.env.VITE_BASENAME : '/',
});

export default router;
