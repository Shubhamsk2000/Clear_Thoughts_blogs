import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/Context"
import { getAllPosts } from "../appwrite/appwriteFun";

function MyBlogs() {
    const {userData} = useContext(GlobalContext);
    const [postDocument, setPostDocument] = useState([]);

    async function getPost(){
        const posts = await getAllPosts();
        if(posts){
            setPostDocument(posts.documents);
        }
    }
    useEffect(()=>{
        getPost();
    },[])
    console.log(postDocument)

console.log(userData)
  return (
    <div className="post-cards-container">
            {
                postDocument.map((post, index) => (
                    post.userId === userData.$id ? 
                    <a href={`post/${post.$id}`} key={index}>
                        <div className="card">
                            <img className="demo" src={`https://cloud.appwrite.io/v1/storage/buckets/663fb5b6000b13a859d4/files/${post.$id}/preview?project=663fab57001d02e6b520`} alt="Post image" />
                            <div className="card-content">
                                <h2 className="card-title">{post.title}</h2>
                                <p className="card-writer">Written by: {post.authorName}</p>
                            </div>
                        </div>

                    </a> : null
                )) 
            }
        </div>
  )
}

export default MyBlogs
