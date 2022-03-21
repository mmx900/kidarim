import './App.css';
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {AppBar, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";

import koLocale from 'date-fns/locale/ko';
import InputForm from "./routes/input_form";
import Result from "./routes/result";

function App() {
    const theme = createTheme();
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" sx={{mr: 2, display: "flex"}}>
                                    기다림 계산기
                                </Typography>
                                <Box sx={{flexGrow: 1, display: 'flex'}}>
                                    <Button  component={Link} to={`/input_form`} sx={{my: 2, color: 'white', display: 'block'}}>
                                        잔여 생존일
                                    </Button>
                                </Box>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/input_form"/>}/>
                        <Route path="input_form" element={<InputForm/>}/>
                        <Route path="result" element={<Result/>}/>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
