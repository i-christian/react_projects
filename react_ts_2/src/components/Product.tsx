import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, useCallback, memo} from "react"


type PropsType = {
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}


const Product = ({product, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement => {
  
  const img = useCallback(():string => {
    return new URL(`../images/${product.sku}.jpg`, import.meta.url).href;
  }, [])

  const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1}})

  const itemInCart = inCart ? '  ☑Item in Cart': null;
  
  const content = (
    <article className="py-2">
        <h3 className="text-2xl">{product.name}</h3>
        <img src={img()} alt={product.name} />

        <section className="flex flex-col sm:flex-row sm:gap-2 my-2">
          <p className="text-xl mx-auto">
            {new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD'}).format(product.price)
            }
            {itemInCart}
          </p>
          <button
            className="bg-indigo-900 w-fit mx-auto px-2 rounded-2xl hover:bg-slate-50 hover:text-black"
            onClick={onAddToCart}
          >Add to Cart</button>
        </section>
    </article>
  )
  
  return content;
}

function areProductsEqual({product: prevProduct, inCart: prevInCart}: PropsType, {product: nextProduct, inCart: nextInCart}: PropsType ){
  return(
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) && prevInCart === nextInCart
  )
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);


export default MemoizedProduct;