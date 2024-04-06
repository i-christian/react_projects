import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from "../context/CartProvider"
import { ChangeEvent, ReactElement, memo, useCallback } from "react"


type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,

}


const CartLinItem = ({ item, dispatch, REDUCER_ACTIONS}: PropsType) => {

    const img = useCallback(():string => {
        return new URL(`../images/${item.sku}.jpg`, import.meta.url).href;
      }, [])

    const lineTotal: number = (item.qty * item.price);
    
    const highestQty: number = 20 > item.qty ? 20: item.qty;

    const optionValues: number[] = [ ...Array(highestQty).keys()].map(i => i + 1);
    
    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            {
                type: REDUCER_ACTIONS.QUANTITY,
                payload: { ...item, qty: Number(e.target.value)}
            }
        )
    }
    
    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item, 
    })

    const content = (
        <li>
            <img src={img()} alt={item.name} />
            
            <section className="flex flex-col sm:flex-row p-2 gap-4">
                <section aria-label="Item Name" className="text-xl">
                    {item.name}
                </section>
                <section aria-label="Price Per Item" className="text-xl">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}
                </section>
                <label htmlFor="item" className="hidden">
                    Item Quantity
                </label>
                <select 
                    name="itemQty"
                    id="itemQty"
                    className="text-black rounded-xl w-10"
                    value={item.qty}
                    aria-label="Item Quantity"
                    onChange={onChangeQty}
                >
                    {options}
                </select>
                <section aria-label="Line Item Subtotal" className="text-2xl">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)}
                </section>
                
                <button
                    aria-label="Remove Item from cart"
                    title="Remove Item from Cart"
                    onClick={onRemoveFromCart}
                    className="bg-indigo-800 w-20 rounded-xl py-1 hover:bg-red-700 ring-2"
                >
                    ❌
                </button>
            </section>
        </li>
    )

    return content;

}
const areItemsEqual = ({item: prevItem}: PropsType, {item:nextItem}: PropsType) => {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}
const MemoizedCartLineItem = memo<typeof CartLinItem>(CartLinItem, areItemsEqual)
export default MemoizedCartLineItem;