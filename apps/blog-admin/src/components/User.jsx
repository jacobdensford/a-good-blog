import { useState } from "react";

export default function User({ user, users, setUsers }) {
    const [error, setError] = useState(null);
    const [admin, setAdmin] = useState(user.admin);
    const [author, setAuthor] = useState(user.author);

    async function handlePromote() {
        if (user.admin) {
            return;
        }
        if (user.author) {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + user.id,
                    {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            admin: true,
                        }),
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                const newUsers = users;
                newUsers.find((user) => {
                    return user.id == result.id;
                }).admin = true;
                setUsers(newUsers);
                setAdmin(true);
            } catch (err) {
                console.log(err);
                setError(err.message);
            }
        } else {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + user.id,
                    {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            author: true,
                        }),
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                const newUsers = users;
                newUsers.find((user) => {
                    return user.id == result.id;
                }).author = true;
                setUsers(newUsers);
                setAuthor(true);
            } catch (err) {
                console.log(err);
                setError(err.message);
            }
        }
    }

    async function handleDemote() {
        if (!user.author) {
            return;
        }
        if (user.admin) {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + user.id,
                    {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            admin: false,
                        }),
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                const newUsers = users;
                newUsers.find((user) => {
                    return user.id == result.id;
                }).admin = false;
                setUsers(newUsers);
                setAdmin(false);
            } catch (err) {
                console.log(err);
                setError(err.message);
            }
        } else {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/users/" + user.id,
                    {
                        method: "PUT",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            author: false,
                        }),
                    },
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                const newUsers = users;
                newUsers.find((user) => {
                    return user.id == result.id;
                }).author = false;
                setUsers(newUsers);
                setAuthor(false);
            } catch (err) {
                console.log(err);
                setError(err.message);
            }
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/users/" + user.id,
                {
                    method: "DELETE",
                    credentials: "include",
                },
            );
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            const newUsers = users.filter((user) => user.id != result.id);
            setUsers(newUsers);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <li>
            <p>
                <b>{user.username}</b>
                <span className="info">
                    {author ? "" : "not "}author | {admin ? "" : "not "}admin
                </span>
            </p>
            <div>
                <span className="button user-button" onClick={handlePromote}>
                    promote
                </span>
                <span className="button user-button" onClick={handleDemote}>
                    demote
                </span>
                <span className="button user-button" onClick={handleDelete}>
                    delete user
                </span>
            </div>
            {error ? <div className="error">{error}</div> : ""}
        </li>
    );
}
