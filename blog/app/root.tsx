import styles from '~/styles/global.css';
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
			<body>
				<nav className="container-nav">
					<div className="navbar">
						<Link to="/" className="logo">
							PostMind
						</Link>
						<ul className="nav">
							<li>
								<Link to="/posts">Posts</Link>
							</li>
						</ul>
					</div>
				</nav>
				<div className="container">
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
