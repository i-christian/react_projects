import { Link } from "react-router-dom"

const Register = () => {
    return (
        <section className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="username"/>
                <input required type="email" placeholder="email" />
                <input required type="password" placeholder="password" />
                <button>Register</button>
                <p>This is an error</p>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </section>
    )
}

export default Register