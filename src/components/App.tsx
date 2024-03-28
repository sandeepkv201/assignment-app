import { CssBaseline, Theme, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './dashboard/Dashboard';

function App(): JSX.Element {

    const defaultTheme: Theme = createTheme({
        palette: {
            mode: 'light',
        }
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Dashboard />
        </ThemeProvider>
    );
}

export default App;
