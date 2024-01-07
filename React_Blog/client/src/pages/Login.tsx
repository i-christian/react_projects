import { Link } from "react-router-dom"


const Login = () => {
  return (
    <section className="auth">
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password" />
            <button>Login</button>
            <p>This is an error</p>
            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
    </section>
  )
}

export default Login