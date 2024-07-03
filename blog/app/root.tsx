import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	Link,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import styles from "./tailwind.css";


export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return [
		{ title: 'PostMind' },
		{
			name: 'description',
			content: 'A cool post app built with Remix',
		},
	];
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-gradient-to-r from-sky-900 to-indigo-950 w-2/3 m-auto ">
				<nav className="py-3 flex flex-row justify-between mx-auto">
					<Link to="/" className="text-2xl underline hover:bg-sky-700 hover:no-underline hover:text-white p-2 rounded-lg">
						PostMind
					</Link>
					<ul className="p-2">
						<li>
							<Link to="/posts" className="text-2xl underline p-2 hover:bg-sky-700 hover:no-underline hover:text-white rounded-lg">
								Posts</Link>
						</li>
					</ul>
				</nav>
				<hr className="py-2" />
				<div className="pt-3">
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
