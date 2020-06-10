import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
    user: [],
    error: null,
    success: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function registerUser(user) {
        try {
            const res = await axios.post(
                "https://register-service-njeftlxetq-de.a.run.app/api/register",
                {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                }
            );
            dispatch({
                type: "ADD_USER",
                payload: res.data.success,
            });
            return res.data.success;
        } catch (error) {
            console.log(error);
            dispatch({
                type: "ERROR_USER",
                payload: error,
            });
        }
        return false;
    }

    async function verifyUser(user) {
        try {
            const res = await axios.post(
                "https://login-service-njeftlxetq-de.a.run.app/api/login",
                {
                    email: user.email,
                    password: user.password,
                }
            );

            dispatch({
                type: "LOGIN_USER",
                payload: res.data.success,
            });
            return res.data.success;
        } catch (error) {
            console.log(error);
            dispatch({
                type: "ERROR_USER",
                payload: error,
            });
        }

        return false;
    }

    async function getActiveUsers() {
        try {
            const res = await axios.get(
                "https://session-service-njeftlxetq-de.a.run.app/api/session/activeusers"
            );

            dispatch({
                type: "ACTIVE_USERS",
                payload: res.data.users,
            });
            return res.data.success;
        } catch (error) {
            console.log(error);
            dispatch({
                type: "ERROR_USER",
                payload: error,
            });
        }

        return false;
    }

    async function logoutUser(email) {
        try {
            const res = await axios.post(
                "https://session-service-njeftlxetq-de.a.run.app/api/session/logout",
                { email }
            );

            dispatch({
                type: "LOGOUT_USER",
                payload: res.data.success,
            });
            return res.data.success;
        } catch (error) {
            console.log(error);
            dispatch({
                type: "ERROR_USER",
                payload: error,
            });
        }

        return false;
    }

    return (
        <GlobalContext.Provider
            value={{
                success: state.success,
                user: state.user,
                error: state.error,
                registerUser,
                verifyUser,
                getActiveUsers,
                logoutUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
