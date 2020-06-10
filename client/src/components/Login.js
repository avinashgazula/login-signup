import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { verifyUser } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        const user = {
            email,
            password,
        };
        verifyUser(user).then((data) => {
            if (data) {
                history.push("/home", email);
            }
        });
    };

    return (
        <div>
            <h3>Login</h3>
            <br />
            <form onSubmit={onSubmit}>
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormControl>
                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">
                    Login
                </Button>
            </form>
            <br />
            <br />
            <Link to="/register">New User? Register here</Link>
        </div>
    );
}
