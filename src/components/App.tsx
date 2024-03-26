import { CssBaseline, Theme, ThemeProvider, createTheme } from '@mui/material';
import { Router } from '@remix-run/router';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

function App(): JSX.Element {

    const defaultTheme: Theme = createTheme({
        palette: {
            mode: 'light',
        }
    });

    const hashRouter: Router = createHashRouter([
        { path: '/', Component: Dashboard }
    ]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <RouterProvider router={hashRouter} />
        </ThemeProvider>
    );
}

export default App;
