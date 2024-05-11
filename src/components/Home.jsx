import { useEffect, useState } from "react";
import { getAllPosts } from "../appwrite/appwriteFun";
import "../css/index.css";
function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                getAllPosts().then((post) => {
                    if (post) {
                        setPosts(post.documents);
                    }
                })
            } catch (error) {
                console.log("Error fetching data in Home : ", error.message);
            }
        }
        fetchPosts();
    }, [])
    return (
        <div className="post-cards-container">
            {posts.map((post, index) => (
                <div key={index} className="card">
                    <img src={post.featuredImage || "./default-image.jpg"} alt="Post" className="card-image" />
                    <div className="card-content">
                        <h2 className="card-title">{post.title}</h2>
                        <p className="card-writer">Written by: {post.userId}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home
