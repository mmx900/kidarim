import * as React from 'react';
import {Button, Container, Stack, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {Link, useSearchParams} from "react-router-dom";
import {parse, startOfToday} from "date-fns";
import NumberFormat from "react-number-format";
import {Helmet} from "react-helmet";
import DateFormat from "../../components/DateFormat";
import {getDeathDay, getRemainSurvivalTimeInDays} from "../../libs/calculator";
import {ShareButton} from "../../components/ShareButton";

export default function Result() {
    const [searchParams,] = useSearchParams();
    const lifespanParam = searchParams.get("lifespan");
    const titleParam = searchParams.get("title");
    const birthdayParam = searchParams.get("birthday");
    if (lifespanParam == null || birthdayParam == null) return <></>;

    const lifespan = parseInt(lifespanParam);
    // startOfToday()를 써서 날짜 비교시 시간 영향을 제거한다.
    const birthday = parse(birthdayParam, "yyyy.MM.dd", startOfToday());
    const deathDay = getDeathDay(birthday, lifespan);
    const remainDays = getRemainSurvivalTimeInDays(birthday, lifespan);

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
            >
                <Typography component="h1" variant="h5" sx={{mb: 1}}>
                    계산 결과
                </Typography>
                <p>
                    {titleParam && titleParam.trim() ?
                        (<>
                            만 {lifespan}세까지 생존한다고 가정했을 때, {titleParam}은 <DateFormat date={deathDay}/>로 <NumberFormat
                            thousandSeparator={true} value={remainDays} displayType="text"/>일 남았습니다.
                        </>) : (<>
                            만 {lifespan}세까지 생존한다고 가정했을 때, 예정 사망일은 <DateFormat date={deathDay}/>로 <NumberFormat
                            thousandSeparator={true} value={remainDays} displayType="text"/>일 남았습니다.
                        </>)}
                </p>
                <Stack direction="column" spacing={2}>
                    <Button variant="outlined" component={Link} to={`/survival_time?${searchParams}`}>다시 계산하기</Button>
                    <ShareButton/>
                </Stack>
            </Box>
        </Container>
    );
}
