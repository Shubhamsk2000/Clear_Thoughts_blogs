import { useContext, useEffect, useState } from "react";
import { getAllPosts, getFile } from "../appwrite/appwriteFun";
import "../css/index.css";
import { GlobalContext } from "../context/Context";
function Home() {
    const { isLogin } = useContext(GlobalContext)
    const [posts, setPosts] = useState([]);
    const [imageURLs, setImageURLs] = useState({});

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
console.log(posts)
    useEffect(() => {
        async function loadImages() {
            const newImageURLs = {};    
            for (const post of posts) {
                console.log(post    )
                if (post.$id) {
                    const data = await getFile(post.$id);
                    newImageURLs[post.$id] = data.href;
                }
            }
            setImageURLs(newImageURLs); 
        }
        loadImages();
    }, [posts]);


    return (
        <div className="post-cards-container">
            {isLogin}
            {
            
            posts.map((post, index) => (
                <div key={index} className="card">
                    <img src={imageURLs[post.$id] || "src/assets/default-image.jpg"} alt="Post" className="card-image" />
                    {

                    }
                    <div className="card-content">
                        <h2 className="card-title">{post.title}</h2>
                        <p className="card-writer">Written by: {post.authorName}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home
