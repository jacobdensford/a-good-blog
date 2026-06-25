import { Link } from "react-router";
import Markdown from "react-markdown";

export default function Comment({ comment, posts, handleDeleteComment }) {
    return (
        <li>
            <span className="info">
                Comment on{" "}
                <Link to={`/posts/${comment.postId}`}>
                    {posts.find((post) => post.id == comment.postId).title}
                </Link>{" "}
                from {new Date(comment.createdAt).toLocaleDateString()}
            </span>
            <Markdown>{comment.content}</Markdown>
            <div
                className="button comment-delete"
                onClick={() => handleDeleteComment(comment)}
            >
                delete
            </div>
        </li>
    );
}
