import { useNavigate } from 'react-router';
import { Box, Chip, Typography } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { petugasPaths } from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import TaskTab from './TaskTab';
import {
  TASK_PROGRESS_LABELS,
  TaskProgressStatus,
  getTaskProgressStore,
  petugasTasks,
} from './taskData';
import { getLocation } from './task_input/utils';

export const TaskList = () => {
  const navigate = useNavigate();
  const { currentBreakpoint } = useBreakpoints();
  const taskProgress = getTaskProgressStore();

  const handleOnclick = async (taskId: number) => {
    const { lat, long } = await getLocation();

    navigate(`/petugas/${petugasPaths.taskInput}`, {
      state: { taskId, coordinates: { lat, long } },
    });
  };

  return (
    <Box
      sx={{
        gap: 1,
        display: currentBreakpoint === 'sm' ? 'grid' : 'flex',
        gridTemplateColumns: currentBreakpoint === 'sm' ? 'repeat(2, 1fr)' : undefined,
        flexDirection: 'column',
      }}
    >
      {petugasTasks.map((task) => (
        <TaskTab
          key={task.id}
          sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
          onClick={() => handleOnclick(task.id)}
        >
          <div>
            <Typography
              noWrap
              fontWeight={700}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flexGrow: 1,
                textAlign: 'left',
              }}
            >
              {task.label}
            </Typography>
            <Typography
              noWrap
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flexGrow: 1,
                textAlign: 'left',
                mt: 0.5,
              }}
            >
              {task.title}
            </Typography>
            <Typography
              noWrap
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                opacity: '70%',
                whiteSpace: 'nowrap',
                flexGrow: 1,
                textAlign: 'left',
              }}
            >
              {task.date}
            </Typography>
            <Chip
              label={
                TASK_PROGRESS_LABELS[(taskProgress[task.id] || 'before') as TaskProgressStatus]
              }
              color={(taskProgress[task.id] || 'before') === 'finished' ? 'success' : 'warning'}
              size="small"
              sx={{ mt: 1 }}
            />
          </div>
          <Box
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconifyIcon icon="material-symbols:edit-square-outline" fontSize={20} />
          </Box>
        </TaskTab>
      ))}
    </Box>
  );
};
