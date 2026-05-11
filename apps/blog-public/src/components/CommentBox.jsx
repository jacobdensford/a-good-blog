import { useContext, useState } from "react";
import { AuthContext } from "@blog/shared";

export function CommentBox({ postId, fetchComments }) {
    const {
        auth: { data, loading },
    } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const [formError, setFormError] = useState(null);
    const formUrl =
        import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments";

    function handleCommentChange(e) {
        setComment(e.target.value);
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
                    content: comment,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setFormError(errorData);
                setComment("");
                throw new Error(`Response status: ${response.status}`);
            }
            setComment("");
            await fetchComments();
        } catch (err) {
            console.error(err.message);
            setComment("");
        }
    }

    if (loading) {
        return (
            <div>
                <form action={handleFormSubmit}>
                    <label>
                        <textarea name="" id=""></textarea>
                    </label>
                </form>
            </div>
        );
    }

    return (
        <div className="comment-box">
            {formError && <p className="error">{formError}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <label htmlFor="comment-box">
                    {loading ? "" : `Commenting as ${data.username}`}
                </label>
                <textarea
                    name="comment-box"
                    id="comment-box"
                    value={comment}
                    onChange={handleCommentChange}
                ></textarea>
                <div>
                    <input type="submit" value="Comment" />
                </div>
            </form>
        </div>
    );
}
