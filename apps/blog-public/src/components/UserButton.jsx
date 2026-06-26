import { useContext } from "react";
import { AuthContext } from "@blog/shared";
import { Link, NavLink, useNavigate } from "react-router";

export default function UserButton() {
    const {
        auth: { data, loading },
        setAuth,
    } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                },
            );
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            setAuth({ loading: false, data: [] });
            navigate("/");
        } catch (err) {
            console.error(err.message);
            setAuth({ loading: false, error: err });
        }
    }

    if (loading) {
        return <p></p>;
    }

    if (data?.username && data?.author) {
        return <Link to={"/authors/" + data.id}>{data.username}</Link>;
    }

    if (data?.username) {
        return <Link onClick={handleLogout}>logout</Link>;
    }

    return <NavLink to={"/login"}>login</NavLink>;
}
