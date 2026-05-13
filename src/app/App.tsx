import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeProvider } from 'next-themes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
