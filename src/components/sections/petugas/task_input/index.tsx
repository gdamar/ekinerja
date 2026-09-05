import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getItemFromStore, setItemToStore } from 'lib/utils';
import { petugasPaths } from 'routes/paths';
import { TaskInputState } from 'types/task';
import { Maps } from 'components/common/Maps';
import {
  PETUGAS_TASK_SUBMISSIONS_STORE_KEY,
  TASK_PROGRESS_LABELS,
  TASK_PROGRESS_STEPS,
  TaskProgressStatus,
  getTaskProgressStore,
  petugasTasks,
  setTaskProgressStatus,
} from '../taskData';
import { createPhotoCollagePayload } from './utils';

interface TaskInputFormValue {
  taskDescription: string;
  photos: File[];
}

interface TaskInputSubmission {
  taskId: number;
  submittedAt: string;
  steps: {
    status: TaskProgressStatus;
    taskDescription: string;
    collage: ReturnType<typeof createPhotoCollagePayload>;
  }[];
}

const initialStepFormValue: TaskInputFormValue = {
  taskDescription: '',
  photos: [],
};

const initialStepsValue: Record<TaskProgressStatus, TaskInputFormValue> = {
  before: { ...initialStepFormValue, photos: [] },
  onGoing: { ...initialStepFormValue, photos: [] },
  finished: { ...initialStepFormValue, photos: [] },
};

const TaskInputSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as TaskInputState;
  const taskId = locationState.taskId;
  const coordinates = locationState.coordinates;
  const task = useMemo(() => petugasTasks.find((item) => item.id === taskId), [taskId]);
  const progressStore = useMemo(() => getTaskProgressStore(), []);

  const initialActiveStep = useMemo(() => {
    if (!task) {
      return 0;
    }

    const status = progressStore[task.id];
    const statusIndex = status ? TASK_PROGRESS_STEPS.indexOf(status) : 0;

    return statusIndex >= 0 ? statusIndex : 0;
  }, [progressStore, task]);

  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [stepsValue, setStepsValue] = useState(initialStepsValue);
  const [errorMessage, setErrorMessage] = useState('');
  // const [ coordinates ] = useState<number>();

  if (!task) {
    return <Navigate to={`/petugas/${petugasPaths.tasks}`} replace />;
  }

  const currentStatus = TASK_PROGRESS_STEPS[activeStep];
  const currentValue = stepsValue[currentStatus];

  // const coordinate = getLocation();

  // console.log("coordinate", coordinate);

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStepsValue((prev) => ({
      ...prev,
      [currentStatus]: {
        ...prev[currentStatus],
        taskDescription: value,
      },
    }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []).slice(0, 3);
    setStepsValue((prev) => ({
      ...prev,
      [currentStatus]: {
        ...prev[currentStatus],
        photos: selectedFiles,
      },
    }));
  };

  const saveSubmission = (payload: TaskInputSubmission) => {
    const currentSubmissions = (getItemFromStore(PETUGAS_TASK_SUBMISSIONS_STORE_KEY, []) ||
      []) as TaskInputSubmission[];
    setItemToStore(
      PETUGAS_TASK_SUBMISSIONS_STORE_KEY,
      JSON.stringify([...currentSubmissions, payload]),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!currentValue.taskDescription.trim()) {
      setErrorMessage('Tugas yang dikerjakan wajib diisi.');
      return;
    }

    if (!currentValue.photos.length) {
      setErrorMessage('Foto wajib diunggah minimal 1 gambar.');
      return;
    }

    const nextStep = activeStep + 1;

    if (nextStep < TASK_PROGRESS_STEPS.length) {
      const nextStatus = TASK_PROGRESS_STEPS[nextStep];
      setTaskProgressStatus(task.id, nextStatus);
      setActiveStep(nextStep);
      return;
    }

    const payload: TaskInputSubmission = {
      taskId: task.id,
      submittedAt: new Date().toISOString(),
      steps: TASK_PROGRESS_STEPS.map((status) => ({
        status,
        taskDescription: stepsValue[status].taskDescription,
        collage: createPhotoCollagePayload(stepsValue[status].photos),
      })),
    };

    saveSubmission(payload);
    setTaskProgressStatus(task.id, 'finished');
    navigate(`/petugas/${petugasPaths.tasksHistory}`);
  };

  return (
    <Paper
      sx={{
        width: 1,
        maxWidth: { xs: '100%', md: 720 },
        mx: 'auto',
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: { xs: 1.5, sm: 2 },
      }}
    >
      <Stack direction="column" spacing={{ xs: 2, sm: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Input Tugas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.label} - {task.title}
          </Typography>
        </Box>

        <Box sx={{ pb: 0.5 }}>
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? 'horizontal' : 'vertical'}
            alternativeLabel={isMobile}
            sx={{
              px: { xs: 1, sm: 0 },
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                display: { xs: 'none', sm: 'block' },
              },
              '& .MuiStepConnector-root': {
                display: { xs: 'block', sm: 'none' },
              },
            }}
          >
            {TASK_PROGRESS_STEPS.map((step) => (
              <Step key={step}>
                <StepLabel>{TASK_PROGRESS_LABELS[step]}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: 1 }}>
          <Stack direction="column" spacing={{ xs: 2, sm: 2.5 }}>
            <Stack direction="column" spacing={2}>
              <TextField label="Wilayah" value={task.region} disabled fullWidth />
              {/* <TextField id="coordinate" label="Koordinat" value={`${coordinates.lat}, ${coordinates.long}`} disabled fullWidth /> */}
              <Maps lat={coordinates.lat} long={coordinates.long} zoom={11} />
            </Stack>
            <TextField
              label="Tugas yang dikerjakan"
              value={currentValue.taskDescription}
              onChange={handleDescriptionChange}
              fullWidth
              multiline
              minRows={3}
            />

            <Stack direction="column" spacing={1}>
              <Button
                component="label"
                variant="outlined"
                sx={{
                  width: { xs: 1, sm: 'auto' },
                  alignSelf: { xs: 'stretch', sm: 'flex-start' },
                }}
              >
                Unggah Foto (Maks 3)
                <input hidden accept="image/*" multiple type="file" onChange={handlePhotoChange} />
              </Button>
              <Typography variant="body2" color="text.secondary">
                {currentValue.photos.length
                  ? `${currentValue.photos.length} foto dipilih`
                  : 'Belum ada foto dipilih'}
              </Typography>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: { xs: 1, sm: 2 },
                alignSelf: { xs: 'stretch', sm: 'flex-end' },
                width: { xs: 1, sm: 'auto' },
              }}
            >
              {activeStep < TASK_PROGRESS_STEPS.length - 1 ? 'Simpan dan Lanjut' : 'Simpan Tugas'}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default TaskInputSection;
