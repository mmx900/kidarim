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

export default function InputForm() {
    const initDate = new Date()
    const [birthday, setBirthday] = React.useState<Date | null>(initDate);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const lifespan = data.get('lifespan');
        const title = data.get('title');

        if (lifespan == null || birthday == null) return;
        // TODO 오늘 이전 날짜는 설정 안 되게
        const strDate = formatWithOptions({locale: koLocale}, 'yyyy.MM.dd')(birthday)

        let queryString = new URLSearchParams({birthday: strDate, lifespan: lifespan.toString()});
        if (title && title.toString().trim()) queryString.append("title", title.toString());

        navigate(`/survival_time/result?${queryString}`, {replace: true});
    };

    const [searchParams,] = useSearchParams();
    const lifespanParam = searchParams.get("lifespan");
    const titleParam = searchParams.get("title");
    const birthdayParam = searchParams.get("birthday");
    try {
        if (birthdayParam && birthdayParam.trim()) {
            const b = parse(birthdayParam, "yyyy.MM.dd", new Date());
            if (birthday === initDate) setBirthday(b);
        }
    } catch (e) {
        //ignore
    }

    return (
        <Container maxWidth="xs">
            <Helmet title="잔여 생존일"/>
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
                    잔여 생존일 계산
                </Typography>
                <DatePicker
                    label="생일 *"
                    value={birthday}
                    onChange={(newValue) => {
                        setBirthday(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                    id="lifespan"
                    name="lifespan"
                    label="예상 수명(년)"
                    margin="normal"
                    type="number"
                    defaultValue={lifespanParam}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: 150
                    }}
                    required
                />
                <TextField id="title"
                           label="기일 이름"
                           helperText="당신의 기일을 뭐라고 부르길 원하나요?"
                           name="title"
                           margin="normal"
                           defaultValue={titleParam}
                />
                <Button variant="contained" type="submit">계산하기</Button>
            </Box>
        </Container>
    );
}
