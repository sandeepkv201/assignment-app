import { CssBaseline, Theme, ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './home/Home';

function App(): JSX.Element {

    const defaultTheme: Theme = createTheme({
        palette: {
            mode: 'light',
        }
    });

    const hashRouter = createHashRouter([
        { path: '/', Component: Home }
    ]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <RouterProvider router={hashRouter} />
        </ThemeProvider>
    );
}

export default App;
