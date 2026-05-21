import { useContext } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router";
import { UsersContext, PostsContext } from "../context";
import { AuthContext } from "@blog/shared";
import AuthorInfo from "../components/AuthorInfo";

export default function Author() {
    const {
        data: posts,
        loading: postsLoading,
        error: postsError,
    } = useContext(PostsContext);
    const {
        data: users,
        loading: usersLoading,
        error: usersError,
    } = useContext(UsersContext);
    const { authorId } = useParams();
    const {
        setAuth,
        auth: { data, loading: authLoading },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const author = users?.find((user) => user.id == authorId);

    const controls = (
        <div className="controls">
            <a
                className="button"
                href={
                    import.meta.env.VITE_ADMIN_URL === ""
                        ? "http://localhost:5174/admin/"
                        : import.meta.env.VITE_ADMIN_URL
                }
            >
                Admin
            </a>
            <Link className="button" onClick={handleLogout}>
                Logout
            </Link>
        </div>
    );

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

    if (postsLoading || usersLoading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <div>
                    <p>⠀</p>
                </div>
            </article>
        );
    }

    if (postsError || usersError) {
        return (
            <article className="error">
                <h1>Uh oh...</h1>
                <p>Error: {postsError.message || usersError.message}</p>
            </article>
        );
    }

    if (!author) {
        return (
            <article>
                <h1>Uh oh...</h1>
                <p>No such author.</p>
            </article>
        );
    }

    if (posts.filter((post) => post.authorId == author.id).length < 1) {
        return (
            <article>
                {!authLoading && data && author.id == data.id ? controls : ""}
                <h1>{author.username}</h1>
                <AuthorInfo author={author} />
                <p>This author hasn't made any posts yet.</p>
            </article>
        );
    }

    return (
        <article>
            {!authLoading && data && author.id == data.id ? controls : ""}
            <h1>{author.username}</h1>
            <AuthorInfo author={author} />
            <ul>
                {posts
                    .filter((post) => post.authorId == author.id)
                    .map((post) => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            <span className="info">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
            </ul>
        </article>
    );
}
