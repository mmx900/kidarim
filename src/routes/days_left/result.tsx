import * as React from 'react';
import {Button, Container, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {Link, useSearchParams} from "react-router-dom";
import {differenceInDays, parse, startOfToday} from "date-fns";
import NumberFormat from "react-number-format";
import {formatWithOptions} from "date-fns/fp";
import koLocale from 'date-fns/locale/ko';

export default function Result() {
    const [searchParams,] = useSearchParams();
    const titleParam = searchParams.get("title");
    const targetDateParam = searchParams.get("target_date");
    if (targetDateParam == null) return <></>;

    // startOfToday()를 써서 시간 영향을 제거한다.
    const targetDate = parse(targetDateParam, "yyyy.MM.dd", startOfToday());
    const remainDays = differenceInDays(startOfToday(), targetDate);
    const strTargetDate = formatWithOptions({locale: koLocale}, 'y년 M월 d일')(targetDate)

    return (
        <Container maxWidth="xs">
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
                    {remainDays === 0 ? (<>
                        {titleParam && titleParam.trim() ?
                            (<>
                                오늘이 {titleParam} 입니다!
                            </>) : (<>
                                오늘입니다!
                            </>)}
                    </>) : (<>
                        {titleParam && titleParam.trim() ?
                            (<>
                                {strTargetDate} {titleParam}로부터 <NumberFormat
                                thousandSeparator={true} value={remainDays} displayType="text"/>일 지났습니다.
                            </>) : (<>
                                {strTargetDate}로부터 <NumberFormat
                                thousandSeparator={true} value={remainDays} displayType="text"/>일 지났습니다.
                            </>)}
                    </>)}
                </p>
                <Button component={Link} to={`/days_left/form?${searchParams}`}>다시 계산하기</Button>
            </Box>
        </Container>
    );
}
