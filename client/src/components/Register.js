import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { registerUser } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        const user = {
            name,
            email,
            password,
        };
        registerUser(user).then((data) => {
            if (data) {
                history.push("/");
            }
        });
    };

    return (
        <div>
            <h3>Register</h3>
            <br />
            <form onSubmit={onSubmit}>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        id="name"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </FormControl>
                <br />
                <br />
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
                    Register
                </Button>
            </form>
            <br />
            <br />
            <Link to="/">Already have an account? Login Here</Link>
            <br />
        </div>
    );
}
