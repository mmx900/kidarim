import './App.css';
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {AppBar, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";

import koLocale from 'date-fns/locale/ko';
import DDayForm from "./routes/d_day/input_form";
import DDayResult from "./routes/d_day/result";
import SurvivalTimeForm from "./routes/survival_time/input_form";
import SurvivalTimeResult from "./routes/survival_time/result";

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
                                    <Button component={Link} to={`/d_day`}
                                            sx={{my: 2, color: 'white', display: 'block'}}>
                                        디데이
                                    </Button>
                                    <Button component={Link} to={`/survival_time`}
                                            sx={{my: 2, color: 'white', display: 'block'}}>
                                        잔여 생존일
                                    </Button>
                                </Box>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/d_day/form"/>}/>
                        <Route path="/d_day" element={<Navigate replace to="/d_day/form"/>}/>
                        <Route path="/d_day/form" element={<DDayForm/>}/>
                        <Route path="/d_day/result" element={<DDayResult/>}/>
                        <Route path="/survival_time" element={<Navigate replace to="/survival_time/form"/>}/>
                        <Route path="/survival_time/form" element={<SurvivalTimeForm/>}/>
                        <Route path="/survival_time/result" element={<SurvivalTimeResult/>}/>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
