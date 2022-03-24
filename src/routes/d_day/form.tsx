import * as React from 'react';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import {Button, Container, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {useNavigate, useSearchParams} from "react-router-dom";
import {formatWithOptions} from "date-fns/fp";
import koLocale from 'date-fns/locale/ko';
import {parse} from "date-fns";
import {Helmet} from "react-helmet";

export default function Form() {
    const initDate = new Date()
    const [targetDate, setTargetDate] = React.useState<Date | null>(initDate);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title');

        if (targetDate == null) return;
        // TODO 오늘 이전 날짜는 설정 안 되게
        const strDate = formatWithOptions({locale: koLocale}, 'yyyy.MM.dd')(targetDate)

        let queryString = new URLSearchParams({target_date: strDate});
        if (title && title.toString().trim()) queryString.append("title", title.toString());

        navigate(`/d_day/result?${queryString}`, {replace: true});
    };

    const [searchParams,] = useSearchParams();
    const titleParam = searchParams.get("title");
    const targetDateParam = searchParams.get("target_date");
    try {
        if (targetDateParam && targetDateParam.trim()) {
            const b = parse(targetDateParam, "yyyy.MM.dd", new Date());
            if (targetDate === initDate) setTargetDate(b);
        }
    } catch (e) {
        //ignore
    }

    return (
        <Container maxWidth="xs">
            <Helmet title="디데이"/>
            <Box
                sx={{
                    marginTop: 8,
                    paddingLeft: 2,
                    paddingRight: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
                component="form" onSubmit={handleSubmit}
            >
                <Typography component="h1" variant="h5" sx={{mb: 1}}>
                    디데이 계산
                </Typography>
                <DatePicker
                    label="목표일 *"
                    value={targetDate}
                    onChange={(newValue) => {
                        setTargetDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TextField id="title"
                           label="목표일 이름"
                           name="title"
                           margin="normal"
                           defaultValue={titleParam}
                />
                <Button variant="contained" type="submit">계산하기</Button>
            </Box>
        </Container>
    );
}
