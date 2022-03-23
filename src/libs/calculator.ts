import {differenceInDays, startOfDay, startOfToday} from "date-fns";

// startOfToday()/startOfDay()를 써서 시간 영향을 제거한다.
export function getDDay({sourceDate = startOfToday(), destDate}: { sourceDate?: Date, destDate: Date }): number {
    return differenceInDays(startOfDay(destDate), startOfDay(sourceDate));
}
