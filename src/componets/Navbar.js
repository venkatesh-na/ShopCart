import React from "react"
import { useGlobalContext } from "./Context"
import { Link } from "react-router-dom"
const Navbar = ()=>{
    const { cart } = useGlobalContext()
    const totalQuantity = cart.reduce((a,c)=>{
        return a = a + c.count
    },0)
    return (
         <header>
                <h1>ShopCart</h1>
                <Link to = "/Cart">
                <div className = "cart-img">
                    <img src = {"shopping-cart.png"}/>
                    <span className = "quantity">{totalQuantity}</span>
                </div>
                </Link>
            </header>
    )
}
export default Navbar;