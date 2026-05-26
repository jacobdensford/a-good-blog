import { Link } from "react-router";
import { siteData, AuthContext } from "@blog/shared";
import { useContext } from "react";

export default function Home() {
    const {
        auth: { loading, data },
    } = useContext(AuthContext);

    if (loading || !data || !data?.name || !data?.username) {
        return (
            <article>
                <h1>{siteData.siteName} Admin</h1>
                <p>Welcome to {siteData.siteName}'s admin site!</p>
                <p>
                    Would you like to return to {siteData.siteName}? Click{" "}
                    <a href={import.meta.env.VITE_PUBLIC_URL}>here</a>!
                </p>
            </article>
        );
    }

    return (
        <article>
            <h1>{siteData.siteName} Admin</h1>
            <p>
                Welcome to {siteData.siteName} admin site,{" "}
                {data?.name || data.username}!
            </p>
            <p>
                Would you like to return to {siteData.siteName}? Click{" "}
                <a href={import.meta.env.VITE_PUBLIC_URL}>here</a>!
            </p>
        </article>
    );
}
