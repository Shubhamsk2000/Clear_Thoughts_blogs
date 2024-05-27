import  { useContext, useEffect, useState } from 'react';
import '../css/Post.css'
import { useParams } from 'react-router';
import {getDocument} from '../appwrite/appwriteFun'
import { GlobalContext } from '../context/Context';

const Post = () => {
  const {imageURL} = useContext(GlobalContext);
  useEffect(() => {
    console.log("imageURL updated:", imageURL);
  }, [imageURL]);

  const [post, setPost] = useState();
  const {id} = useParams();
  async function getPost(){
   const post = await getDocument(id);
   setPost(post);
  }
  useEffect(()=>{
    getPost();
  },[])
  

  return (
    
      post ?
      <div className="post-container">
      <img src={imageURL[id]} alt={post.title} className="post-image" />
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-writer">By {post.authorName}</p>
        <p className="post-text">{post.content}</p>
      </div>
    </div> : <h1>Loading....</h1>
    
    
  );
};

export default Post;
