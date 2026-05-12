import { useContext, useEffect, useState } from "react";
import { PostsContext, AuthContext } from "@blog/shared";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function Post() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [post, setPost] = useState({
        title: "",
        content: "",
        published: false,
        authorId: null,
    });
    const [postLoading, setPostLoading] = useState(true);
    const [postError, setPostError] = useState(null);
    const {
        auth: { data, loading, error },
    } = useContext(AuthContext);
    const [formError, setFormError] = useState(null);
    const { postId } = useParams();
    const isNew = postId === "new";
    const isAuth = post?.authorId == data?.id;
    const navigate = useNavigate();
    const formUrl = import.meta.env.VITE_API_URL + "/posts/";

    useEffect(() => {
        async function getPost() {
            try {
                if (isNew) {
                    setPostLoading(false);
                    return;
                }
                const response = await fetch(formUrl + "drafts/" + postId, {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setPost({
                    title: result.title,
                    content: result.content,
                    published: result.published,
                    authorId: result.authorId,
                });
                setTitle(result.title);
                setContent(result.content);
                setPublished(result.published);
                setPostLoading(false);
            } catch (err) {
                console.log(err.message);
                setPostError(err.message);
                setPostLoading(false);
            }
        }
        getPost();
    }, [isNew, postId, formUrl]);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function handlePublishedChange() {
        setPublished(!published);
    }

    async function handleDeletePost() {
        if (isNew) {
            navigate("/posts");
            return;
        }
        try {
            const response = await fetch(formUrl + postId, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) {
                const errorData = await response.json();
                setFormError(errorData);
                throw new Error(`Response status: ${response.status}`);
            }
            navigate("/posts");
        } catch (err) {
            console.error(err.message);
        }
    }

    async function handleFormSubmit() {
        const method = isNew ? "POST" : "PUT";
        try {
            const response = await fetch(isNew ? formUrl : formUrl + postId, {
                method: method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    published: published,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setFormError(errorData);
                throw new Error(`Response status: ${response.status}`);
            } else {
                navigate("/posts");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    if (postLoading || loading) {
        return (
            <article className="loading">
                <h1>⠀</h1>
                <div>
                    <p>⠀</p>
                </div>
            </article>
        );
    }

    if (postError || error) {
        return (
            <article className="error">
                <h1>Uh oh...</h1>
                <p>Error: {postError?.message || error?.message}</p>
            </article>
        );
    }

    if (!post && !isNew) {
        return (
            <article>
                <h1>Uh oh...</h1>
                <p>No such post or not authorized.</p>
            </article>
        );
    }

    if (!isAuth && !isNew) {
        return (
            <article>
                <h1>Uh oh...</h1>
                <p>No such post or not authorized.</p>
            </article>
        );
    }

    return (
        <article>
            <h1>{isNew ? "New" : "Edit"} Post</h1>
            {formError && <p className="error">{formError.errors}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <label htmlFor="title">
                    Post Title
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </label>
                <label htmlFor="content">
                    Post Content
                    <textarea
                        name="content"
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                    ></textarea>
                </label>
                {!post.published ? (
                    <label htmlFor="published">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            onChange={handlePublishedChange}
                        />{" "}
                        Publish?
                    </label>
                ) : null}
                <input type="submit" value="Save" />
            </form>
            <div className="button" onClick={handleDeletePost}>
                delete post
            </div>
        </article>
    );
}
