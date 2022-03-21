import {useLocation} from "react-router-dom";
import {useEffect} from "react";

import {logEvent} from "firebase/analytics";
import {analytics} from "../config/firebase";

export default function FirebaseAnalytics() {
    let location = useLocation();
    useEffect(() => {
        const page_path = location.pathname + location.search;

        logEvent(analytics, "page_view", {page_path});
    }, [location]);
    return null;
}
