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
				<nav>
					<div className="py-3 flex flex-row justify-between ml-auto">
						<Link to="/" className="text-2xl">
							PostMind
						</Link>
						<ul className="nav">
							<li>
								<Link to="/posts" className="text-2xl">Posts</Link>
							</li>
						</ul>
					</div>
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
