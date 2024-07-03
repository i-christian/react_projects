import { Outlet } from '@remix-run/react';

const posts = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default posts;
