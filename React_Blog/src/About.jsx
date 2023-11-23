import { Link } from "react-router-dom";

const About = () => {
    return(
        <main className="grow w-full flex flex-col gap-4">
            <h2 className="text-center text-3xl">About</h2>
            <p className="text-center text-xl bg-slate-700 h-48 p-4">
                This is a React-Router V6+ powered Blog.
                It is styled using tailwindcss.
            </p>
        </main>
    )
}

export default About;