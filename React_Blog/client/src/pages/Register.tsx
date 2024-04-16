import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (): JSX.Element => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [err, setErr] = useState<string | null>(null); // Set error type as string | null

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", inputs); // Pass inputs to the post request
            navigate("/login")
        } catch (err) {
            setErr(err.response.data); // Access response data from error object
        }
    };

    const navigate = useNavigate();

    return (
        <section className="auth">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}> {/* Change to onSubmit event */}
                <input required type="text" placeholder="username" name="name" value={inputs.name} onChange={handleChange} />
                <input required type="email" placeholder="email" name="email" value={inputs.email} onChange={handleChange} />
                <input required type="password" placeholder="password" name="password" value={inputs.password} onChange={handleChange} />
                <button type="submit">Register</button> {/* Change to type="submit" */}
                {err && <p>{err}</p>} {/* Display error message if error exists */}
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </section>
    );
};

export default Register;
