import {formatWithOptions} from "date-fns/fp";
import koLocale from "date-fns/locale/ko";

export default function ({date}: { date: Date }) {
    const formatted = formatWithOptions({locale: koLocale}, 'y년 M월 d일')(date);
    return (<>{formatted}</>);
}
