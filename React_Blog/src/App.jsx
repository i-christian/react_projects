import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage.jsx';
import About from './About';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {format} from 'date-fns'
import { useState, useEffect } from 'react';

const App = () => {
    const [posts, setPosts] = useState([
        {
          id: 1,
          title: "My First Post",
          datetime: "November 20, 2023 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
          id: 2,
          title: "My 2nd Post",
          datetime: "November 20, 2023, 2021 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
          id: 3,
          title: "My 3rd Post",
          datetime: "November 20, 2023 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
          id: 4,
          title: "My Fourth Post",
          datetime: "November 20, 2023 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        }
      ])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const filterResults = posts?.filter(post => (
            (post.body.toLocaleLowerCase()).includes(search.toLocaleLowerCase()))
            || (post.title.toLocaleLowerCase()).includes(search.toLocaleLowerCase()))
    
            setSearchResults(filterResults.reverse());
    }, [posts, search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1: 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {id, title: postTitle, datetime, body: postBody};
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/');
    }

    const handleDelete = (id) => {
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate('/');
    }

    return(
        <main className="flex flex-col items-start p-8 w-screen sm:w-3/4 sm:m-auto h-screen">
            <Header title="React JS Blog"/>
            <Nav search={search} setSearch={setSearch}/>
             
            <Routes>
                  <Route path="/" element={<Home posts={searchResults} />} />

                  <Route exact path="/post" element={<NewPost
                    handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}
                    />} />

                  <Route exact path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
                  
                  <Route exact path='/about' element={<About/>} />
             </Routes>
            <Footer/>
        </main>
    )
}

export default App;