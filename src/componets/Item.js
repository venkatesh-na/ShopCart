import React from "react"
import { useGlobalContext } from "./Context"
import { Link } from "react-router-dom"
const Item = ()=>{
    const {product1} = useGlobalContext()
    return (
        <article className = "items-container">
            {product1.map((item,index)=>{
                const {id,title,price,image,rating:{rate}} = item
                return (
                    <Link key = {index} to = {`/Detail/${id}`}>
                        <div className = "item" key = {id}>
                            <img src = {image} alt = {title}/>
                            <div>
                                <p>{title}</p>
                                <div className = "price-discount">
                                    <p>{price}$</p>
                                    <p>{(price + 50).toFixed(2)}$</p>
                                    <p className = "off">{rate}</p>
                                </div>
                                <p className = "off">{(100-((price/(price + 50))*100)).toFixed(2)}% off</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </article>
    )
}
export default Item;