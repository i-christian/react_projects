import useCart from "../hooks/UseCart";
import useProducts from "../hooks/useProducts";
import { ReactElement } from "react";
import MemoizedProduct from "./Product";


const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart} = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement [] = <p className="text-2xl w-96">Loading ...</p>

  if (products?.length){
    pageContent = products.map( product => {
        const inCart: boolean = cart.some(item => item.sku === product.sku)

        return (
            <MemoizedProduct
                key={product.sku}
                product={product}
                dispatch={dispatch}
                REDUCER_ACTIONS={REDUCER_ACTIONS}
                inCart={inCart}
             />
        )
    })
  }

  const content = (
    <main className="w-full">
        {pageContent}
    </main>
  )

  return content;
}

export default ProductList;