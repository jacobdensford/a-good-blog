import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "@blog/shared";
import Comment from "../components/Comment";

export default function Comments() {
    const [posts, setPosts] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);
    const [comments, setComments] = useState(null);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(null);
    const {
        auth: { data, loading, error },
    } = useContext(AuthContext);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/posts",
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setPostsLoading(false);
                setPosts(result);
            } catch (err) {
                console.log(err.message);
                setPostsError(err.message);
                setPostsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/posts/comments",
                );
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setComments(result);
                setCommentsLoading(false);
            } catch (err) {
                console.log(err.message);
                setCommentsLoading(false);
                setCommentsError(err.message);
            }
        }
        fetchComments();
    }, [posts]);

    async function handleDeleteComment(comment) {
        const postId = posts.find((post) => post.id == comment.postId);
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    "/posts/" +
                    postId +
                    "/comments/" +
                    comment.id,
                {
                    method: "DELETE",
                    credentials: "include",
                },
            );
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const newComments = comments.filter(
                (commentOld) => commentOld.id != comment.id,
            );
            setComments(newComments);
        } catch (err) {
            console.log(err);
        }
    }

    if (postsLoading || commentsLoading || loading) {
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
                <h1>Comments</h1>
                <p>
                    You must <Link to="/login">login</Link> first.
                </p>
            </article>
        );
    }

    if (!data?.author) {
        return (
            <article>
                <h1>Comments</h1>
                <p>You must be an author to access this page.</p>
            </article>
        );
    }

    if (postsError || commentsError || error) {
        return (
            <article className="error">
                <h1>Comments</h1>
                <p>
                    Error:{" "}
                    {postsError?.message ||
                        commentsError?.message ||
                        error?.message}
                </p>
            </article>
        );
    }

    if (!posts) {
        return (
            <article>
                <h1>Comments</h1>
                <p>There are no comments yet.</p>
            </article>
        );
    }

    return (
        <article>
            <h1>Comments</h1>
            <ul className="comments-admin">
                {comments
                    .filter((comment) => {
                        const authorPosts = posts.filter(
                            (post) => post.authorId == data.id,
                        );
                        if (
                            authorPosts.find(
                                (post) => post.id == comment.postId,
                            )
                        ) {
                            return comment;
                        }
                    })
                    .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                posts={posts}
                                handleDeleteComment={handleDeleteComment}
                            />
                        );
                    })}
            </ul>
        </article>
    );
}
