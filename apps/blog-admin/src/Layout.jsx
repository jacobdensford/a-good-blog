import { Link, NavLink, Outlet } from "react-router";
import { siteData, Footer } from "@blog/shared";
import Nav from "./components/Nav";

export default function Layout() {
    return (
        <>
            <header>
                <a href={import.meta.env.VITE_PUBLIC_URL} className="no-arrow">
                    {siteData.siteName}
                </a>{" "}
                {">"} <Link to="/">Admin</Link>
            </header>
            <Nav pages={siteData.adminPages} />
            <main>
                <Outlet />
            </main>
            <Footer copyright={siteData.copyright} />
        </>
    );
}
