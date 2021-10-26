import React from "react"
import { useGlobalContext } from "./Context";
import Loading from "./Loading";
import { Link } from "react-router-dom"
const Cart = ()=>{
    const {cart,product,handleInc,handleDec,handleClear,handleDeleteCart,subtotal} = useGlobalContext()
    console.log(cart)
    if(product.length > 0)
    {
        return (
            <React.Fragment>
            <Link to = "/">
                <button className = "back">Back To Shop</button>
            </Link>
            <section className = "cart-container">
                {cart.length > 0 ? cart.map((e)=>{
                    const {productId,count,price} = e
                    const {id,title,category,image,price:productPrice} = product.filter((e)=>e.id == productId)[0]
                    return(
                    <article key = {productId}>
                        <div>
                            <img src = {image} alt = "image"/>
                            <div className = "cart-product-info">
                                <p>{category}</p>
                                <p>{title}</p>
                            </div>
                            <div className = "cart-btn-container">
                                <button onClick = {()=>handleDec(id,productPrice)}>-</button>
                                <p>{count}</p>
                                <button onClick = {()=>handleInc(id,productPrice)}>+</button>
                                {/*passing product price because we have multiply count every time with original product price */}
                            </div>
                            <p className = "original-price">{productPrice}</p>
                            <p className = "modified-price">{price.toFixed(2)}</p>
                            <button onClick = {()=>handleDeleteCart(productId)} className = "delete-cart">delete</button>
                        </div>
                    </article>
                    )
                }) : <h1>cart is empty</h1>}
                <button onClick  = {handleClear} className = "clear">CLEAR ALL</button>
            </section>
            <div className = "Total-container">
                <p>Delivery <span>${subtotal > 500 ? 0 : 10.00}</span></p>
                <p>Subtotal <span>${subtotal.toFixed(2)}</span></p>
                <p>total <span>${subtotal > 500 ? subtotal.toFixed(2) : (subtotal + 10).toFixed(2)}</span></p>
                <button>Buy</button>
            </div>
            </React.Fragment>
        )
    }
    else
    {
        return (
           <Loading/>
        )
    }
}
export default Cart;