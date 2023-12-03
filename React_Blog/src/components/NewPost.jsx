import { useContext, useState} from "react";
import DataContext from "../context/DataContext";
import {format} from 'date-fns'
import { useNavigate } from "react-router-dom";
import api from '../api/posts'


const NewPost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const {posts, setPosts} = useContext(DataContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1: 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {id, title: postTitle, datetime, body: postBody};
         
        try {
          const response = await api.post('/posts', newPost);
          const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/');
        }catch (err) {
          console.log(`Error: ${err.message}`)
        }
      }

    return(
        <main className="grow w-full bg-slate-700 rounded-md p-4 text-xl">
            <h1 className="text-2xl text-center p-4"> New Post</h1>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-2"
            >
                <label htmlFor="postTitle" >Title:</label>
                <input
                    id='postTitle'
                    type="text"
                    className="text-black rounded p-3 border-4 border-indigo-500/100"
                    value={postTitle}
                    required
                    onChange={(e) => setPostTitle(e.target.value)} 
                />
                <label htmlFor="postBody">Body:</label>
                <textarea
                    id="postBody"
                    className="text-black rounded p-3 border-4 border-indigo-500/100"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button 
                    type='submit'
                    className="bg-indigo-500/100 p-2 mt-1 rounded-2xl hover:bg-red-800"
                >Submit</button>
            </form>
        </main>
    )
}

export default NewPost;