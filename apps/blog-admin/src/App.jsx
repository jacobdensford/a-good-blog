import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./Layout";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import { useEffect, useState } from "react";
import { userAuth, AuthContext, Login } from "@blog/shared";

function App() {
    const [auth, setAuth] = useState({
        loading: true,
        data: [],
        error: null,
    });

    useEffect(() => {
        userAuth(setAuth);
    }, []);

    return (
        <AuthContext value={{ auth, setAuth }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts/:postId" element={<Post />} />
                    <Route path="/comments" element={<Comments />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </AuthContext>
    );
}

export default App;
