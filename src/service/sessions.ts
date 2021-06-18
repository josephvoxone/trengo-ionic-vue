import { secure } from "@/helper/secureApp";
// import { alert } from "ionicons/icons";
// import axios from "axios";

const SESSION_KEY = 'user_session'

const sessionService = {
    getSession() {
        return secure.decode(localStorage.getItem(SESSION_KEY));
    },
    setSession(value: any) {
        localStorage.setItem(SESSION_KEY, secure.encode(value));
    },
    clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }
};

export {
    sessionService
};
