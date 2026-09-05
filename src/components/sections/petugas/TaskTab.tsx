import { MouseEventHandler, ReactNode } from 'react';
import { Card, CardProps } from '@mui/material';

interface TaskTabProps extends CardProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const TaskTab = ({ children, ...props }: TaskTabProps) => {
  return (
    <Card
      {...props}
      sx={{
        px: 3,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 2,
        borderRadius: 2,
        cursor: 'pointer',
        backgroundColor: 'background.elevation2',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'background.elevation3',
          boxShadow: 2,
        },
        ...props.sx,
      }}
    >
      {children}
    </Card>
  );
};

export default TaskTab;
