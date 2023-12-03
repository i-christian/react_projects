import Feed from './Feed';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Home = () => {
    const { searchResults, fetchError, isLoading} = useContext(DataContext);

    return(
        <main className="grow w-full">
            {isLoading && <p className="text-2xl italic">Loading posts...</p>}
            {!isLoading && fetchError && <p className="text-red-600">{fetchError}</p>}

            {!isLoading && !fetchError && 
            (searchResults.length ? <Feed posts={searchResults}/> 
             : <p className="text-2xl">No Posts to display</p> )}
       
        </main>
    )
}

export default Home