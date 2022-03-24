import {addYears, differenceInDays, startOfDay, startOfToday, subSeconds} from "date-fns";

// startOfToday()/startOfDay()를 써서 시간 영향을 제거한다.
export function getDDay({sourceDate = startOfToday(), destDate}: { sourceDate?: Date, destDate: Date }): number {
    return differenceInDays(startOfDay(destDate), startOfDay(sourceDate));
}

export function getDeathDay(birthday: Date, lifespan: number): Date {
    // 해당 나이에서 다음 생일을 맞기 1초 전을 사망일시로 설정
    return subSeconds(addYears(birthday, lifespan), 1);
}

export function getRemainSurvivalTimeInDays(birthday: Date, lifespan: number): number {
    const deathDay = getDeathDay(birthday, lifespan);

    // startOfDay()를 써서 날짜 비교시 시간 영향을 제거한다.
    return differenceInDays(startOfDay(deathDay), startOfToday());
}
