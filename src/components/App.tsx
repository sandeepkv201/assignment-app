import { CssBaseline, Theme, ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ForcedDirectedGraph from './charts/ForcedDirectedGraph';
import Dashboard from './dashboard/Dashboard';

function App(): JSX.Element {

    const defaultTheme: Theme = createTheme({
        palette: {
            mode: 'light',
        }
    });

    const routes = createBrowserRouter([
        { path: '', Component: ForcedDirectedGraph },
        { path: 'dashboard', Component: Dashboard },
    ]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <RouterProvider router={routes} />
        </ThemeProvider>
    );
}

export default App;
