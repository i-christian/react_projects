import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import EditPost from './components/EditPost';
import { DataProvider } from './context/DataContext';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return(
        <main className="flex flex-col items-start p-8 w-screen sm:w-3/4 sm:m-auto h-screen">
           <DataProvider>
              <Header title="React JS Blog"/>
              <Nav />
              
              <Routes>
                    <Route exact path="/" element={<Home />} />

                    <Route exact path="/post" element={<NewPost/>} />

                    <Route path="/edit/:id" element={<EditPost/>} />

                    <Route exact path='/post/:id' element={<PostPage />} />
                    
                    <Route exact path='/about' element={<About/>} />
              </Routes>
              <Footer/>
            </DataProvider>
        </main>
    )
}

export default App;