import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className='home'>
      <section className='posts'>
        {post.map((post) => (
          <section className='post' key={post.id}>
            <p className='img'>
              <img src={post.img} alt=''/>
            </p>  
            <section className='content'>
              <Link className='link' to={'/post/${post.id}'}>
                <h1>{post.title} </h1>
              </Link>
              <p>{post.desc}</p>
              <button>Read More</button>
            </section>
          </section>
        ))}
      </section>
    </main>
  )
}

export default Home;
