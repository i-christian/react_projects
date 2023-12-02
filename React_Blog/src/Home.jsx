import Feed from './Feed';

const Home = ({posts, fetchError, isLoading}) => {
    return(
        <main className="grow w-full">
            {isLoading && <p className="text-2xl italic">Loading posts...</p>}
            {fetchError && <p className="text-red-600">{fetchError}</p>}

            {!isLoading && !fetchError && 
            (posts.length ? <Feed posts={posts}/> 
             : <p className="text-2xl">No Posts to display</p> )}
       
        </main>
    )
}

export default Home