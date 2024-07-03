import banner from "../images/home.jpg";

const Index = () => {
	return (
		<section>
			<img
				src={banner}
				alt='background image'
				className="rounded-lg w-full h-96"
			/>

			<h1 className="m-auto text-center text-2xl">Welcome to PostMind!</h1>
			<p className="text-xl">
				PostMind is a vibrant platform meticulously crafted with Remix
				and Prisma technologies, fueled by a robust PostgreSQL database.
			</p>
		</section>
	);
}

export default Index;
