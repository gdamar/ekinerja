import { getItemFromStore, setItemToStore } from 'lib/utils';

export type TaskProgressStatus = 'before' | 'onGoing' | 'finished';

export interface PetugasTask {
  id: number;
  label: string;
  title: string;
  value: string;
  date: string;
  region: string;
  coordinate: string;
}

export const TASK_PROGRESS_STEPS: TaskProgressStatus[] = ['before', 'onGoing', 'finished'];

export const TASK_PROGRESS_LABELS: Record<TaskProgressStatus, string> = {
  before: 'Before',
  onGoing: 'On Going',
  finished: 'Finished',
};

export const PETUGAS_TASK_PROGRESS_STORE_KEY = 'petugas-task-progress';
export const PETUGAS_TASK_SUBMISSIONS_STORE_KEY = 'petugas-task-submissions';

export const petugasTasks: PetugasTask[] = [
  {
    id: 1,
    label: 'Pemeliharaan Jalan',
    title: 'Jalan Pahlawan',
    value: 'Perbaikan rambu lalu lintas',
    date: 'Senin, 27 Juli 2026',
    region: 'Jl. Pahlawan',
    coordinate: '-6.2088, 106.8456',
  },
  {
    id: 12,
    label: 'Pembersihan Area',
    title: 'Taman Publik',
    value: 'Pembersihan sampah area taman',
    date: 'Selasa, 28 Juli 2026',
    region: 'Taman Publik',
    coordinate: '-6.2000, 106.8166',
  },
  {
    id: 13,
    label: 'Pengecekan Fasilitas',
    title: 'Lapangan Utama',
    value: 'Pemeriksaan lampu taman',
    date: 'Rabu, 29 Juli 2026',
    region: 'Lapangan Utama',
    coordinate: '-6.1754, 106.8272',
  },
];

export type TaskProgressStore = Partial<Record<number, TaskProgressStatus>>;

export const getTaskProgressStore = () => {
  const progress = getItemFromStore(
    PETUGAS_TASK_PROGRESS_STORE_KEY,
    {},
  ) as TaskProgressStore | null;
  return progress && typeof progress === 'object' ? progress : {};
};

export const setTaskProgressStatus = (taskId: number, status: TaskProgressStatus) => {
  const current = getTaskProgressStore();
  setItemToStore(PETUGAS_TASK_PROGRESS_STORE_KEY, JSON.stringify({ ...current, [taskId]: status }));
};
