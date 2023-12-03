import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Nav = () => {
    const {search, setSearch} = useContext(DataContext);

    return(
        <nav className="m-auto rounded-3xl bg-slate-800 w-full mb-4 flex flex-col sm:flex-row sm:w-full">
            <form 
                className="w-screen sm:w-full"
                onSubmit={(e) => e.preventDefault()}
            >
                <label htmlFor="search" className="hidden">Search Post</label>
                <input
                    id="search"
                    className="text-black rounded-3xl p-3 border-4 border-indigo-500/100"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul className="flex flex-row items-center p-4 text-xl gap-2">
                <li className="underline decoration-indigo-500/100 hover:no-underline hover:text-cyan-500"><Link to="/">Home</Link></li>
                <li className="underline decoration-indigo-500/100 hover:no-underline hover:text-cyan-500"><Link to="/post">Post</Link></li>
                <li className="underline decoration-indigo-500/100 hover:no-underline hover:text-cyan-500"><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;