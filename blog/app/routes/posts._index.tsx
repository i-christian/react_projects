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
      <div className="flex flex-row gap-1 justify-end">
        <Link to="/posts/new" className="text-2xl underline hover:bg-sky-700 hover:no-underline hover:text-white p-2 rounded-lg">
          New Post
        </Link>
      </div>

      <ul className="text-xl flex flex-col gap-3 pt-10">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3 className="hover:text-white">{post.title}</h3>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
