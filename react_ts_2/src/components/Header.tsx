import { Nav } from "./Nav";
import useCart from "../hooks/UseCart";

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header = ({ viewCart, setViewCart }: PropsType) => 
{
    const {totalItems, totalPrice} = useCart()
    const content = (
        <header className="bg-indigo-700 pl-8 pt-4 pb-12 pr-8 mb-4 mx-auto sticky top-0">
            <section className="relative">
                <h1 className="text-3xl">Acme Inc. </h1>
                <section className="absolute right-0 top-0">
                    <p className="hidden sm:block">Total Items: {totalItems}</p>
                    <p className="hidden sm:block">Total Price: {totalPrice}</p>
                    <Nav viewCart={viewCart} setViewCart={setViewCart} />
                </section>
            </section>
        </header>
    )
    return content;
}

export default Header;