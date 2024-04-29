import { Link, useNavigate } from "react-router-dom"
import {ChangeEvent, FormEvent, useState} from 'react'
import axios from 'axios'

const Login = ():JSX.Element => {
  const [inputs, setInputs] = useState({
        name: "",
        password: "",
    });
  const [err, setErr] = useState<string | null>(null); // Set error type as string | null

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/auth/login", inputs); // Pass inputs to the post request
            navigate("/")
        } catch (err: any) {
            setErr(err.response.data); // Access response data from error object
        }
    };

  const navigate = useNavigate();

  return (
    <section className="auth">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="username" name="name" onChange={handleChange}/>
            <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
            <button>Login</button>
            {err &&<p>{err}</p>}
            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
    </section>
  )
}

export default Login
