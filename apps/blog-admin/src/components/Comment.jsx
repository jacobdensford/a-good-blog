import { Link } from "react-router";

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
            <p>{comment.content}</p>
            <div
                className="button comment-delete"
                onClick={() => handleDeleteComment(comment)}
            >
                delete
            </div>
        </li>
    );
}
