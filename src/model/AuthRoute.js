import React from 'react';
import { Redirect, Route } from "react-router-dom";

import { getSessionCookie } from "../model/Session";

const AuthRoute = ({isEnabled, ...props}) => {
    return (getSessionCookie()) ? <Route {...props} /> : <Redirect to="/login"/>;
};

export default AuthRoute;