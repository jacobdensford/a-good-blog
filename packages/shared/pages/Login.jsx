import { useState, useContext } from "react";
import { AuthContext } from "../data/context";
import { Link, useNavigate } from "react-router";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState(null);
    const {
        auth: { loading, data: authData },
        setAuth,
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const formUrl = import.meta.env.VITE_API_URL + "/auth/login";
    const signupLink = import.meta.env.VITE_PUBLIC_URL ? <a href={import.meta.env.VITE_PUBLIC_URL + "/signup"}>Sign up for one!</a> : <Link to={"/signup"}>Sign up for one!</Link>;

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleFormSubmit() {
        try {
            const response = await fetch(formUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setFormError(errorData);
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setAuth({ loading: false, data: result });
            navigate(-1);
        } catch (err) {
            console.error(err.message);
            setAuth({ loading: false, error: err });
            setPassword("");
            setUsername("");
        }
    }

    if (!loading && authData?.name) {
        return (
            <article>
                <h1>Login</h1>
                <p>
                    You're already logged in,{" "}
                    {authData?.name || authData.username}.
                </p>
            </article>
        );
    }

    return (
        <article>
            <h1>Login</h1>
            {formError && <p className="error">{formError.errors}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <label htmlFor="username">
                    Username:{" "}
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </label>
                <label htmlFor="password">
                    Password:{" "}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <input type="submit" value="Login" />
            </form>
            <p>
                Don't have an account?{" "}
                {signupLink}
            </p>
        </article>
    );
}
