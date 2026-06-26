import { Link, useLocation } from "react-router";
import { useContext } from "react";
import { PostsContext, UsersContext } from "../context";

export default function Header({ siteName }) {
    const path = useLocation().pathname;
    const { data: posts, loading } = useContext(PostsContext);
    const { data: users } = useContext(UsersContext);

    function createBreadcrumbs(path) {
        const pathParts = path.split("/").filter((part) => part.length >= 1);
        if (pathParts.length == 2) {
            if (pathParts[0] == "posts") {
                // turn [1] into post title
                const postTitle = posts.find(
                    (post) => post.id == pathParts[1],
                )?.title;
                pathParts[1] = postTitle;
            }
            if (pathParts[0] == "authors") {
                // turn [1] into author username
                pathParts[1] = users.find(
                    (user) => user.id == pathParts[1],
                )?.username;
            }
        }
        return pathParts;
    }

    if (loading) {
        return (
            <header>
                <Link to="/">{siteName}</Link>
                <span className="breadcrumbs loading"></span>
            </header>
        );
    }

    return (
        <header>
            <Link to="/">{siteName}</Link>
            <span className="breadcrumbs">
                {createBreadcrumbs(path).map((part, index) =>
                    index == 0 ? (
                        <span key={index}>
                            <span>{" > "}</span>
                            <Link to={"/" + part}>{part}</Link>
                        </span>
                    ) : (
                        <span key={index}>
                            {" > " + (part == undefined ? "loading..." : part)}
                        </span>
                    ),
                )}
            </span>
        </header>
    );
}
