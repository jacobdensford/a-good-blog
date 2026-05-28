import { useContext } from "react";
import { Link } from "react-router";
import { UsersContext } from "../context";

export default function Authors() {
    const { data: users, loading, error } = useContext(UsersContext);

    if (loading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <ul>
                    <li>⠀</li>
                </ul>
            </article>
        );
    }

    if (error) {
        return (
            <article className="error">
                <h1>Authors</h1>
                <p>Error: {error.message}</p>
            </article>
        );
    }

    if (users?.length < 1) {
        return (
            <article>
                <h1>Authors</h1>
                <p>There are no authors yet.</p>
            </article>
        );
    }

    return (
        <article>
            <h1>Authors</h1>
            <ul>
                {users
                    .filter((user) => user.author == true)
                    .map((author) => (
                        <li key={author.id}>
                            <Link to={`/authors/${author.id}`}>
                                {author.username}
                            </Link>
                        </li>
                    ))}
            </ul>
        </article>
    );
}
