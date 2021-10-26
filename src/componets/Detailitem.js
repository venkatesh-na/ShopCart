import React , { useEffect } from "react"
import { useGlobalContext } from "./Context";
import {FaStar} from "react-icons/fa"
import {Link} from "react-router-dom"
import Loading from "./Loading";

const Detailitem = ({match})=>{
    console.log(match)
    const {itemDetails,setItemDetails,loading,setLoading,handleInc,handleDec,cart} = useGlobalContext()
    console.log("detail item")
    const fetchData = async ()=>{
        setLoading(true)
        try
        {
        console.log("fetch")
        const response = await fetch(`https://fakestoreapi.com/products/${match.params.id}`)
        const data = await response.json()
        setLoading(false)
        setItemDetails([{...data}])
        }
        catch(error)
        {
            console.log(error)
        }
}
useEffect(()=>{
    fetchData()
    },[])
    if(loading) return <Loading/>
    else
    {
    return (
        <section className = "main-detail-container">
            {itemDetails.map((item)=>{
                const {id,title,price,desc,description,category,image,rating:{rate,count}} = item
                const filtCart = cart.filter((e)=>e.productId == match.params.id)
                return (
                    <div key = {id}>
                        <h1>{category}</h1>
                        <article>
                            <div className = "image-container">
                                <img src = {image}/>
                            </div>
                            <div className = "info-container">
                                <p className = "title">{title}</p>
                                <p className = "desc">{description}</p>
                                <div className = "rating">
                                    <p>{rate}<FaStar/></p>
                                    <p>{count} Rating</p>
                                </div>
                                <div>
                                    <p>{price}$</p>
                                    <p>{(price + 50).toFixed(2)}$</p>
                                    <p className = "off">{(100-((price/(price+50))*100)).toFixed(2)}% off</p>
                                </div>
                                <div className = "btn-detail-container">
                                    <Link to = "/#">
                                    <button className = "back">BACK TO SHOP</button>
                                    </Link>
                                    <div className = "add_cart">
                                        <button onClick = {()=>handleDec(id,price)} className = "dec">-</button>
                                        <p className = "count">{filtCart.length > 0 ? filtCart[0].count : 0}</p>
                                        <button onClick = {()=>handleInc(id,price)} className = "inc">+</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                )
            })}
        </section>
    )
        }
}
export default Detailitem;