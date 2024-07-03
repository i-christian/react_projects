import { useLoaderData, Link } from '@remix-run/react';
import { db } from '~/utils/db.server';
// Define a type for a single post
type Post = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
};

// Define a type for the data returned by the loader
type LoaderData = {
  posts: Post[];
};

export const loader = async () => {
  const data = {
    posts: await db.post.findMany(),
  };

  return data;
};

const Posts = () => {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
