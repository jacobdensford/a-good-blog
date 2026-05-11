import Comment from "./Comment";
import CommentButton from "./CommentButton";
import { AuthContext } from "@blog/shared";
import { useContext } from "react";
import { CommentBox } from "./CommentBox";

export default function Comments({ comments, postId, fetchComments }) {
    const {
        auth: { loading, data: authData },
    } = useContext(AuthContext);

    return (
        <details className="comments">
            <summary>Comments</summary>
            <div className="comments-inner">
                <ul>
                    {comments.length > 0
                        ? comments.map((comment) => (
                              <li key={comment.id} className="comment">
                                  <Comment comment={comment} />
                              </li>
                          ))
                        : "No comments yet."}
                </ul>
                {!loading && authData?.username ? (
                    <CommentBox postId={postId} fetchComments={fetchComments} />
                ) : (
                    <CommentButton postId={postId} />
                )}
            </div>
        </details>
    );
}
