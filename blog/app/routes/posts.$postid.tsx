import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { useLoaderData, Link, Form } from '@remix-run/react';

import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postid },
  });

  if (!post) throw new Error('Post not found');

  const data = { post };
  return data;
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const post = await db.post.findUnique({
      where: { id: params.postid },
    });

    if (!post) throw new Error('Post not found');

    await db.post.delete({
      where: { id: params.postid },
    });

    return redirect('/posts');
  }
};

interface Post {
  title: string;
  body: string;
  // Define other properties if available in the 'post' object
}

const Postid = () => {
  const { post }: { post: Post } = useLoaderData();
  return (
    <main className="flex flex-col gap-5">
      <header className="text-2xl text-center flex flex-col-reverse">
        <h2>{post.title}</h2>
        <Link to="/posts" className="underline mr-2 px-5 mb-5 hover:no-underline hover:bg-blue-800 hover:text-white w-fit rounded-md">
          Back
        </Link>
      </header>

      <div className="text-wrap bg-blue-200 p-5 rounded-md">{post.body}</div>

      <div className="page-footer">
        <Form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="rounded-md bg-red-500 px-8 py-3 hover:bg-red-950 hover:text-white">Delete</button>
        </Form>
      </div>
    </main>
  );
};

export default Postid;
