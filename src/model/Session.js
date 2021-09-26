import React from "react";
import * as Cookies from "js-cookie";

const SESSION_KEY = "session";

export const clearSession = () => {
    Cookies.remove(SESSION_KEY);
};

export const setSessionCookie = (session) => {
    Cookies.remove(SESSION_KEY);
    Cookies.set(SESSION_KEY, JSON.stringify(session), { expires: 14 });
};

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get(SESSION_KEY);

    if (sessionCookie === undefined) {
        return null;
    } else {
        return JSON.parse(sessionCookie);
    }
};

export const SessionContext = React.createContext(getSessionCookie());
