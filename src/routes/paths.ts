import { documentationPath } from 'lib/constants';

export const rootPaths = {
  root: '/',
  authRoot: 'auth',
};

const paths = {
  root: rootPaths.root,
  starter: `starter`,
  users: `users`,
  account: `account`,
  login: `${rootPaths.authRoot}/login`,
  signup: `${rootPaths.authRoot}/sign-up`,
  notifications: `notifications`,
  documentation: documentationPath,
  wip: 'wip',
  404: `404`,
};

export const petugasPaths = {
  root: rootPaths.root,
  starter: `starter`,
  users: `users`,
  account: `account`,
  login: `${rootPaths.authRoot}/login`,
  signup: `${rootPaths.authRoot}/sign-up`,
  notifications: `notifications`,
  documentation: documentationPath,
  tasks: 'tasks',
  taskInput: 'task_input',
  tasksHistory: 'riwayat_tugas',
  wip: 'wip',
  404: `404`,
};

export default paths;
