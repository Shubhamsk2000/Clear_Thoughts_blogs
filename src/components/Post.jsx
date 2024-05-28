import  {  useEffect, useState } from 'react';
import '../css/Post.css'
import { useParams } from 'react-router';
import {getDocument, } from '../appwrite/appwriteFun'
const Post = () => {

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
      <img src={`https://cloud.appwrite.io/v1/storage/buckets/663fb5b6000b13a859d4/files/${id}/preview?project=663fab57001d02e6b520`} style={{width:"400px"}} alt={post.title} className="post-image" />
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-writer">By {post.authorName}</p>
        <p className="post-text">{post.content}</p>
      </div>
    </div> : <h1>Loading....</h1>
    
    
  );
};

export default Post;
