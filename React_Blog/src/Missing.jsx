import { Link } from "react-router-dom";

const Missing = () => {
    return(
        <main>
            <h2 className="text-3xl mb-4">Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p 
                className="mt-4 p-2 underline decoration-indigo-500/100 hover:no-underline hover:text-cyan-500 text-center"
            >
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </main>
    )
}

export default Missing;