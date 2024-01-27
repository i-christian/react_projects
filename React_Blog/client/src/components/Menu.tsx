

const Menu = () => {
  return(
    <section className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => {
        <img src={post.img} alt="" />
        <h2>{post.title}</h2>
        <button>Read More</button>
      }) }
    </section>
  )
}


export default Menu;
