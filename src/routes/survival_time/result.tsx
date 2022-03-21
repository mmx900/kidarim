import * as React from 'react';
import {Button, Container, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {Link, useSearchParams} from "react-router-dom";
import {addYears, differenceInDays, parse, startOfDay, startOfToday, subSeconds} from "date-fns";
import NumberFormat from "react-number-format";
import {formatWithOptions} from "date-fns/fp";
import koLocale from 'date-fns/locale/ko';
import {Helmet} from "react-helmet";

export default function Result() {
    const [searchParams,] = useSearchParams();
    const lifespanParam = searchParams.get("lifespan");
    const titleParam = searchParams.get("title");
    const birthdayParam = searchParams.get("birthday");
    if (lifespanParam == null || birthdayParam == null) return <></>;

    const lifespan = parseInt(lifespanParam);
    const birthday = parse(birthdayParam, "yyyy.MM.dd", startOfToday());
    // 해당 나이에서 다음 생일을 맞기 1초 전을 사망일시로 설정
    const deathDay = subSeconds(addYears(birthday, lifespan), 1);
    const strDeathDay = formatWithOptions({locale: koLocale}, 'y년 M월 d일')(deathDay)
    // startOfToday()를 써서 날짜 비교시 시간 영향을 제거한다.
    const remainDays = differenceInDays(startOfDay(deathDay), startOfToday());

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
                            만 {lifespan}세까지 생존한다고 가정했을 때, {titleParam}은 {strDeathDay}로 <NumberFormat
                            thousandSeparator={true} value={remainDays} displayType="text"/>일 남았습니다.
                        </>) : (<>
                            만 {lifespan}세까지 생존한다고 가정했을 때, 예정 사망일은 {strDeathDay}로 <NumberFormat
                            thousandSeparator={true} value={remainDays} displayType="text"/>일 남았습니다.
                        </>)}
                </p>
                <Button component={Link} to={`/survival_time/form?${searchParams}`}>다시 계산하기</Button>
            </Box>
        </Container>
    );
}
