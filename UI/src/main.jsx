import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AppProvider } from './context/AppContext';
import App from './App';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error('Błąd pobierania danych', { description: error.message }),
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
