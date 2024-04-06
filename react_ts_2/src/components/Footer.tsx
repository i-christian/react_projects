import useCart from "../hooks/UseCart";


type PropsType = {
    viewCart: boolean
}


const Footer = ({viewCart}: PropsType) => {
    const {totalItems, totalPrice } = useCart();

    const year: number = new Date().getFullYear();

    const pageContent = viewCart
        ? <p className=" p-8 text-xl text-center mx-auto">Shopping Cart &copy; {year}</p>
        : (
            <>
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <p>
                    Shopping Cart &copy; {year}</p>
            </>
        )
    
    const content = (
        <footer className="text-xl p-8 text-center mx-auto">
            {pageContent}
        </footer>
    )

    return content;
}

export default Footer;