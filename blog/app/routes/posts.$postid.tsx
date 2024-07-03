
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
    <>
      <div className="page-header">
        <h2>{post.title}</h2>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">{post.body}</div>

      <div className="page-footer">
        <Form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete</button>
        </Form>
      </div>
    </>
  );
};

export default Postid;
