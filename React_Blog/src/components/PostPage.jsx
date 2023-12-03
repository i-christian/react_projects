import {useParams, Link} from 'react-router-dom';
import DataContext from '../context/DataContext';
import { useContext } from 'react';
import api from '../api/posts';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const { posts, setPosts} = useContext(DataContext);
    const { id } = useParams();
    const post = posts?.find(post => (post.id).toString() === id );
    const navigate = useNavigate();


    const handleDelete = async (id) => {
        try{
          await api.delete(`/posts/${id}`);
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          navigate('/');
        }catch (err) {
          console.log(`Error: ${err.message}`)
        }
      }

    
    return(
        <main className="grow w-full">
            <article className="bg-slate-700 p-8">
                {post && 
                    <>
                        <h2 className="text-2xl">{post.title}</h2>
                        <p className="text-sm italic">{post.datetime}</p>
                        <p className="text-xl pt-4">{post.body}</p>
                        
                        <section className="flex gap-4">
                            <Link to={`/edit/${post.id}`}>
                                <button
                                  className="bg-indigo-500/100 p-2 mt-1 rounded-xl hover:bg-blue-800"  
                                >
                                    Edit Post
                                </button>
                            </Link>
                            <button 
                                onClick={() => handleDelete(post.id)}
                                className="bg-indigo-500/100 p-2 mt-1 rounded-xl hover:bg-red-800"
                             >
                                Delete Post
                            </button>
                            <button
                                className="bg-indigo-500/100 p-2 mt-1 rounded-xl hover:bg-red-800"
                            >
                                <Link to='/'>Return</Link>
                            </button>
                        </section>
                    </>
                }
                {!post && 
                    <>
                        <h2 className="text-3xl mb-4">Post Not Found</h2>
                        <p>Well, that's disappointing</p>
                        <p className="mt-4 p-2 underline decoration-indigo-500/100 hover:no-underline hover:text-cyan-500 text-center">
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }

            </article>
        </main>
    )
}

export default PostPage;