type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Nav = ({ viewCart, setViewCart }: PropsType) => {
    const button = viewCart
        ? <button className="bg-zinc-950 px-4 rounded-3xl hover:ring-4 hover:bg-slate-50 hover:text-black" onClick={() => setViewCart(false)}>View Products</button>
        : <button className="bg-zinc-950 px-4 rounded-3xl hover:ring-4 hover:bg-slate-50 hover:text-black" onClick={() => setViewCart(true)}>
            View Cart
        </button>   

    const content = (
        <nav>
            {button}
        </nav>
    )
    return content;
}
