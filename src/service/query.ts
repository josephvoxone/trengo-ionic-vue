// import { modulComp } from "@/helper/modulComponent";
// import { alert } from "ionicons/icons";
// import axios from "axios";

const QUERY_KEY = 'user_query'

const queryService = {
    getQuery() {
        return localStorage.getItem(QUERY_KEY);
    },
    getCity() {
        return JSON.parse(localStorage.getItem(QUERY_KEY) || "{}").city
    },
    setQuery(data: any) {
        localStorage.setItem(QUERY_KEY, JSON.stringify(data));
    },
    clearQuery() {
        localStorage.removeItem(QUERY_KEY);
    }
};

export {
    queryService
};
