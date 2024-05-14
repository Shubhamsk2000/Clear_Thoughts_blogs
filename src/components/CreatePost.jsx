import { useContext, useEffect, useState, useCallback } from 'react';
import '../css/CreatePost.css'; // Importing CSS file for styling
import { GlobalContext } from '../context/Context';
import { createPost, uploadFile } from '../appwrite/appwriteFun';

const CreatePost = () => {
  const [userId, setUserId] = useState("");
  const { userData, isLogin } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  const [authorName, setauthorName] = useState("");

  useEffect(() => {
    if (userData) {
      setUserId(userData.$id)
      console.log(userData.$id, isLogin, "userId");
    }
  }, [])

  function handleCreatePost() {

    if (!authorName) {
      setauthorName(userData.name);
    }

    createPost(title, slug, content, userId, authorName).then((data) => {
      console.log(data);
      if (data) {
        console.log("Successefully added document in database");

        uploadFile(image, slug).then((data) => {
          if (data) {
            console.log("successefully uploaded file to database")
          }
        }).catch((e) => {
          console.log(e.message);
        });
      }
    }).catch((error) => {
      console.log(error.message);
    });

    


  }
  const handleSlug = useCallback((value) => {
    const val = value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, '-')
      .replace(/\s/g, "-");
    setSlug(val);
  }, [])

  return (
    <div className="create-post-container">
      <div className="create-post-form">
        <h2>Create a New Post</h2>
        <form className='form-container' onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter post title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                handleSlug(e.target.value);
              }}
              required
            />
            <label htmlFor="slug">Slug</label>
            <input value={slug} name='slug' readOnly placeholder='slug'></input>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image (JPG/PNG)</label>
            <input type="file" id="image" name="image" accept="image/jpeg, image/png"
            // value={image}
            onChange={(e)=>setImage(e.target.files[0])} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" placeholder="Enter post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="writer">Writer&apos;s Name</label>
            <input type="text" id="writer" name="writer" placeholder="Enter writer name"
              value={authorName}
              onChange={(e) => setauthorName(e.target.value)} />
          </div>
          <button type="submit" onClick={handleCreatePost}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
