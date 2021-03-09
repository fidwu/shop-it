import React from "react"
import { Redirect } from "react-router-dom";

const Private = ({ component: Component, props }) => {
    const token = localStorage.getItem("token");
    return (
        token ?
            <Component {...props} />
            : <Redirect to="/login" />
    )
}

export default Private;