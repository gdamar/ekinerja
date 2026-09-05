import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import router from 'routes/router';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <ThemeProvider>
          <BreakpointsProvider>
            <SettingsPanelProvider>
              <RouterProvider router={router} />
            </SettingsPanelProvider>
          </BreakpointsProvider>
        </ThemeProvider>
      </SettingsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
