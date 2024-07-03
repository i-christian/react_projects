import type { ActionFunction } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { Link, Form } from '@remix-run/react';

import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData();
	const title = form.get('title') ?? '';
	const body = form.get('body') ?? '';

	const fields = {
		title: String(title),
		body: String(body),
	};

	const post = await db.post.create({ data: fields });

	return redirect(`/posts/${post.id}`);
};

const NewPost = () => {
	return (
		<main className="flex flex-col content-center">
			<section className="text-2xl flex flex-row-reverse justify-between mx-2 mb-5">
				<h2>New Post</h2>
				<Link to="/posts" className="underline hover:no-underline hover:text-white hover:bg-sky-600 px-5 rounded-xl">
					Back
				</Link>
			</section>

			<section>
				<Form method="POST" className="rounded-3xl bg-teal-700 flex flex-col gap-5 p-5 mx-auto ">
					<p className="text-2xl p-2 w-full flex flex-row ">
						<label htmlFor="title" className="px-2">Title: </label>
						<input type="text" name="title" id="title" className="rounded-xl border p-2 grow" />
					</p>
					<p className="text-2xl p-2 w-full flex flex-row ">

						<label htmlFor="body" className="px-2">Body: </label>
						<textarea
							name="body"
							id="body"
							autoComplete="on"
							placeholder="post..."
							className="rounded-xl border p-2 h-48 grow"
						/>
					</p>


					<button className="" type="submit">
						Add Post
					</button>
				</Form>
			</section>
		</main>
	);
};

export default NewPost;
