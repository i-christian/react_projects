import { Outlet } from '@remix-run/react';

const posts = () => {
	return (
		<section className="flex flex-col">
			<Outlet />
		</section>
	);
};

export default posts;
