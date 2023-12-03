import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import api from '../api/posts';
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";


const EditPost = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const {posts, setPosts} = useContext(DataContext);
    const {id}  = useParams();
    const post = posts?.find(post => (post.id).toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },
    [post, setEditBody, setEditBody]);

    const handleEdit = async(id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const updatedPost = {id, title: editTitle, 
          datetime, body: editBody};
  
        try{
          const response = await api.put(`/posts/${id}`, updatedPost)
          setPosts( posts?.map(post => post.id === id ? {...response.data} : post ));
          setEditTitle('');
          setEditBody('');
          navigate('/');
        }catch (err) {
          console.log(`Error: ${err.message}`)
        }
      }

    return (
        <main className="grow w-full bg-slate-700 rounded-md p-4 text-xl">

        {editTitle &&
        <>
            <h1 className="text-2xl text-center p-4"> Edit Post</h1>
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2"
            >
                <label htmlFor="postTitle" >Title:</label>
                <input
                    id='postTitle'
                    type="text"
                    className="text-black rounded p-3 border-4 border-indigo-500/100"
                    value={editTitle}
                    required
                    onChange={(e) => setEditTitle(e.target.value)} 
                />
                <label htmlFor="postBody">Body:</label>
                <textarea
                    id="postBody"
                    className="text-black rounded p-3 border-4 border-indigo-500/100"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button 
                    type='submit'
                    onClick={() => handleEdit(post.id)}
                    className="bg-indigo-500/100 p-2 mt-1 rounded-2xl hover:bg-blue-800"
                >Submit</button>
            </form>
        </>
    }

    {!editTitle && 
        <>
            <h2 className="text-3xl mb-4">Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p className="mt-4 p-2 underline decoration-indigo-500/100 hover:no-underline hover:text-cyan-500 text-center">
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </>
    }
    </main> 
    )
}


export default EditPost;