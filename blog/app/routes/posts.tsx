import { Outlet } from '@remix-run/react';

const posts = () => {
	return (
		<section className="text-2xl bg-none">
			<Outlet />
		</section>
	);
};

export default posts;
