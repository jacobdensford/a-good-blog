import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "@blog/shared";

export default function Posts() {
    const [posts, setPosts] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);
    const {
        auth: { data, loading, error },
    } = useContext(AuthContext);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const [responsePosts, responseDrafts] = await Promise.all([
                    fetch(import.meta.env.VITE_API_URL + "/posts"),
                    fetch(import.meta.env.VITE_API_URL + "/posts/drafts", {
                        credentials: "include",
                    }),
                ]);
                if (!responsePosts.ok) {
                    throw new Error(`Response status: ${responsePosts.status}`);
                }
                if (!responseDrafts.ok) {
                    throw new Error(
                        `Response status: ${responseDrafts.status}`,
                    );
                }
                const [resultPosts, resultDrafts] = await Promise.all([
                    responsePosts.json(),
                    responseDrafts.json(),
                ]);
                setPosts(resultPosts.concat(resultDrafts));
                setPostsLoading(false);
            } catch (err) {
                console.log(err.message);
                setPostsError(err.message);
                setPostsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (postsLoading || loading) {
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
                <h1>Posts</h1>
                <p>
                    You must <Link to="/login">login</Link> first.
                </p>
            </article>
        );
    }

    if (postsError || error) {
        return (
            <article className="error">
                <h1>Posts</h1>
                <p>Error: {postsError?.message || error?.message}</p>
            </article>
        );
    }

    if (!posts) {
        return (
            <article>
                <h1>Posts</h1>
                <p>There are no posts yet.</p>
            </article>
        );
    }

    return (
        <article>
            <h1>Posts</h1>
            <Link className="button" to="new">
                new post
            </Link>
            <ul>
                {posts
                    .filter((post) => post.authorId == data.id)
                    .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .map((post) => {
                        return (
                            <li key={post.id}>
                                <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                                <span className="info">
                                    {post.published
                                        ? `published on ${new Date(post.createdAt).toLocaleDateString()}`
                                        : "draft"}
                                </span>
                            </li>
                        );
                    })}
            </ul>
        </article>
    );
}
