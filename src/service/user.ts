import { secure } from "@/helper/secureApp";
// import { alert } from "ionicons/icons";
// import axios from "axios";

const SESSION_KEY = 'user'

const userService = {
    getItem() {
        return secure.decode(localStorage.getItem(SESSION_KEY));
    },
    setItem(value: any) {
        localStorage.setItem(SESSION_KEY, secure.encode(value));
    },
    clear() {
        localStorage.removeItem(SESSION_KEY);
    }
};

export {
    userService
};
