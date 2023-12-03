import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {format} from 'date-fns'
import { useState, useEffect } from 'react';
import api from './api/posts';
import EditPost from './components/EditPost';
import useAxiosFetch from './hooks/useAxiosFetch';


const App = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();

    // use the custom hook to fetch data
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

    useEffect(
      () => {
        setPosts(data);
      }, [data]
    );

    useEffect(()=>{
        const filterResults = posts?.filter(post => (
            (post.body.toLocaleLowerCase()).includes(search.toLocaleLowerCase()))
            || (post.title.toLocaleLowerCase()).includes(search.toLocaleLowerCase()))
    
            setSearchResults(filterResults.reverse());
    }, [posts, search])

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
        <main className="flex flex-col items-start p-8 w-screen sm:w-3/4 sm:m-auto h-screen">
            <Header title="React JS Blog"/>
            <Nav search={search} setSearch={setSearch}/>
             
            <Routes>
                  <Route exact path="/" element={<Home
                    posts={searchResults}
                    fetchError={fetchError}
                    isLoading={isLoading} 
                   />} />

                  <Route exact path="/post" element={<NewPost
                    handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                    />} />

                  <Route path="/edit/:id" element={<EditPost
                    posts={posts}
                    handleEdit={handleEdit}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editBody={editBody}
                    setEditBody={setEditBody}
                    />} />

                  <Route exact path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
                  
                  <Route exact path='/about' element={<About/>} />
             </Routes>
            <Footer/>
        </main>
    )
}

export default App;