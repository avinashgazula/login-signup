import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Home() {
    const { user, getActiveUsers, logoutUser } = useContext(GlobalContext);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.state == null) {
            history.push("/");
        }
        getActiveUsers();
    }, [Home]);

    return (
        <React.Fragment>
            <h3>Home</h3>
            <br />

            {user == undefined ? (
                <h5>No active users</h5>
            ) : (
                <div>
                    <h4>Active Users</h4>
                    {user.map((x) => (
                        <p key={x.id}>{x.email}</p>
                    ))}
                </div>
            )}

            <br />
            <Button
                onClick={() => {
                    logoutUser(location.state).then((data) => {
                        console.log(data);
                        if (data) {
                            history.push("/");
                        }
                    });
                }}
                variant="contained"
                color="primary"
                type="submit"
            >
                Logout
            </Button>
        </React.Fragment>
    );
}
