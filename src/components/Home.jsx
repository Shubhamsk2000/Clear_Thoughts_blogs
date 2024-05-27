import { useContext, useEffect, useState } from "react";
import { getAllPosts, getFileList, getFilePreview } from "../appwrite/appwriteFun";
import "../css/index.css";
import { GlobalContext } from "../context/Context";
import demoImage from '../assets/2.jpg';

function Home() {
    const {imageURL, setImageURL, } = useContext(GlobalContext);
    const [posts, setPosts] = useState([]);
    // const [imageurl, setImageurl] = useState({})
    useEffect(() => {
        async function fetchPosts() {
            try {
                const postResult = await getAllPosts();
                if (postResult) {
                    const postsData = postResult.documents;
                    setPosts(postsData);

                    // Fetch image URLs for all posts
                    const imagesU = {};
                    const res = await getFileList()
                    for(let i = 0; i < res.files.length; i++){
                        const url = await getFilePreview(res.files[i].$id);
                        imagesU[res.files[i].$id] = url.href
                    }
                    setImageURL(imagesU);
                }
            } catch (error) {
                console.log("Error fetching data in Home:", error.message);
            }
        }
        fetchPosts();
    }, []);
    
    return (
        <div className="post-cards-container">
            {posts.map((post, index) => (
                <a href={`post/${post.$id}`} key={index}>
                      <div className="card">
                    <img className="demo" src={imageURL[post.$id] || demoImage} alt="Post image" />
                    <div className="card-content">
                        <h2 className="card-title">{post.title}</h2>
                        <p className="card-writer">Written by: {post.authorName}</p>
                    </div>
                </div>

                </a>
              
            ))}
        </div>
    );
}

export default Home;
