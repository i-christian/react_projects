import { useState } from "react"
import  MemoizedCartLineItem  from "./CartLinItem"
import useCart from "../hooks/UseCart";

export const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart} = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT});
    setConfirm(true);
  }

  const pageContent = confirm
    ? <h2>Thank you for your order</h2>
    : <main>
        <h2 className="hidden">Cart</h2>
        <ul>
            {cart.map(item => {
                return(
                    <MemoizedCartLineItem
                        key={item.sku}
                        item={item}
                        dispatch={dispatch}
                        REDUCER_ACTIONS={REDUCER_ACTIONS}
                    />
                )
            })}
        </ul>
        <section className="w-96 text-xl mt-8 border-t-2">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>
            <button className="bg-indigo-950 w-fit px-2 rounded-xl ring-2 my-2 hover:bg-yellow-50 hover:text-black" disabled={!totalItems} onClick={onSubmitOrder}>
                Place Order
            </button>
        </section>
    </main>

    const content = (
        <main className="w-full">
            {pageContent}
        </main>
    )

  return content;
}
