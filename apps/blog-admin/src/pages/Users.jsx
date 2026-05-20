import { AuthContext } from "@blog/shared";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import User from "../components/User";

export default function Users() {
    const [users, setUsers] = useState(null);
    const [usersLoading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState(null);
    const {
        auth: { data, loading, error },
    } = useContext(AuthContext);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users",
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setUsers(result);
                setUsersLoading(false);
            } catch (err) {
                console.log(err);
                setUsersError(err.message);
                setUsersLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (usersLoading || loading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <ul>
                    <li>⠀</li>
                </ul>
            </article>
        );
    }

    if (!data?.username) {
        return (
            <article>
                <h1>Users</h1>
                <p>
                    You must <Link to="/login">login</Link> first.
                </p>
            </article>
        );
    }

    if (usersError || error) {
        return (
            <article className="error">
                <h1>Users</h1>
                <p>Error: {usersError?.message || error?.message}</p>
            </article>
        );
    }

    if (!users) {
        return (
            <article>
                <h1>Users</h1>
                <p>There are no users yet.</p>
            </article>
        );
    }

    if (!data?.admin) {
        return (
            <article>
                <h1>Users</h1>
                <p>You must be an admin to access this page.</p>
            </article>
        );
    }

    return (
        <article>
            <h1>Users</h1>
            <ul className="users-admin">
                {users
                    .sort()
                    .filter((user) => user.id != data.id)
                    .map((user) => {
                        return (
                            <User
                                key={user.id}
                                user={user}
                                users={users}
                                setUsers={setUsers}
                            />
                        );
                    })}
            </ul>
        </article>
    );
}
