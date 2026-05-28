import { useContext } from "react";
import { Link } from "react-router";
import { PostsContext, UsersContext } from "../context";
import { AuthContext } from "@blog/shared";

export default function Posts() {
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
    const {
        auth: { loading, data },
    } = useContext(AuthContext);

    const newPostButton = (
        <a
            href={
                import.meta.env.VITE_ADMIN_URL === ""
                    ? "http://localhost:5174/admin/posts/new"
                    : `${import.meta.env.VITE_ADMIN_URL}/posts/new`
            }
            className="button"
        >
            New Post
        </a>
    );

    if (postsLoading || usersLoading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <ul>
                    <li>⠀</li>
                </ul>
            </article>
        );
    }

    if (postsError || usersError) {
        return (
            <article className="error">
                <h1>Posts</h1>
                <p>Error: {postsError.message || usersError.message}</p>
            </article>
        );
    }

    if (posts?.length < 1) {
        return (
            <article>
                <h1>Posts</h1>
                {!loading && data?.author ? newPostButton : ""}
                <p>There are no posts yet.</p>
            </article>
        );
    }

    return (
        <article>
            <h1>Posts</h1>
            {!loading && data?.author ? newPostButton : ""}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <span className="info">
                            by{" "}
                            <Link
                                to={
                                    "/authors/" +
                                    users.filter(
                                        (user) => user.id == post.authorId,
                                    )[0].id
                                }
                            >
                                {
                                    users.filter(
                                        (user) => user.id == post.authorId,
                                    )[0].username
                                }
                            </Link>{" "}
                            on {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
