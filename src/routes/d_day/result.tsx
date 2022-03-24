import * as React from 'react';
import {Button, Container, Typography} from "@mui/material";
import Box from '@mui/material/Box';
import {Link, useSearchParams} from "react-router-dom";
import {parse, startOfToday} from "date-fns";
import NumberFormat from "react-number-format";
import {Helmet} from "react-helmet";
import {getDDay} from "../../libs/calculator";
import DateFormat from "../../components/DateFormat";
import {ShareButton} from "../../components/ShareButton";

export default function Result() {
    const [searchParams,] = useSearchParams();
    const titleParam = searchParams.get("title");
    const targetDateParam = searchParams.get("target_date");
    if (targetDateParam == null) return <></>;

    // startOfToday()를 써서 시간 영향을 제거한다.
    const targetDate = parse(targetDateParam, "yyyy.MM.dd", startOfToday());
    const remainDays = getDDay({destDate: targetDate});

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
                                오늘이 D-Day 입니다!
                            </>)}
                    </>) : (<>
                        {titleParam && titleParam.trim() ?
                            (<>
                                <DateFormat date={targetDate}/> {titleParam}까지 <NumberFormat
                                thousandSeparator={true} value={remainDays} displayType="text"/>일 남았습니다.
                            </>) : (<>
                                D-Day인 <DateFormat date={targetDate}/>까지 <NumberFormat
                                thousandSeparator={true} value={remainDays} displayType="text"/>일 남았습니다.
                            </>)}
                    </>)}
                </p>
                <Button component={Link} to={`/d_day?${searchParams}`}>다시 계산하기</Button>
                <ShareButton/>
            </Box>
        </Container>
    );
}
