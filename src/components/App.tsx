import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './home/Home';

function App(): JSX.Element {

    const defaultTheme = createTheme({
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
