import { JSX } from 'react';
import { UserLocation } from 'components/sections/petugas/task_input/utils';

export interface Tasks {
  id?: number;
  label: string;
  title: string;
  value: string;
  icon?: string;
  date?: string;
  panelIcon?: string;
  tabPanel?: JSX.Element | null;
}

export interface TaskInputState {
  taskId: number;
  coordinates: UserLocation;
}
