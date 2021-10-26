import React from "react"
import Item from "./Item"
import Loading from "./Loading"
import { useGlobalContext } from "./Context"
const Product = ()=>{
    const { product,loading,handleCategory,handlePrice,handleCheckbox,check,radio,category,uncheck} = useGlobalContext()
    const {four,three,two,one} = check
    const {low_to_high,high_to_low} = radio
    const Uniquecategory = ["all",...new Set(product.map((e)=> e.category))]
    if(loading) return <Loading/>
    else
    {
    return (
        <main className = "main-container">
            <section className = "btn-container">
                {Uniquecategory.map((e,index)=><button onClick = {handleCategory} data-id = {e} key = {index}>{e}</button>)}
            </section>
            <div className = "inner-container">
                <aside>
                    <article className = "price-filter">
                        <p>price</p>
                        <div>
                            <label>
                            <input data-id = "low_to_high" name = "radio" type = "radio" onChange = {handlePrice} checked = {low_to_high ? true : false}/>
                            <span>low to high</span>
                            </label>
                            <label>
                            <input data-id = "high_to_low" name = "radio" type = "radio" onChange = {handlePrice} checked = {high_to_low ? true : false}/> 
                            <span>high to low</span>
                            </label>
                            <button className = "uncheck" onClick = {uncheck}>uncheck price</button>
                        </div>
                    </article>
                    <article className = "rating-filter">
                        <p>cusomer rating</p>
                        <div>
                            <label>
                                <input data-id = "4" onChange = {handleCheckbox} type = "checkbox" checked = {four ? true : false}/> 
                            <span>{"4 & above"}</span>
                            </label>
                            <label>
                                <input data-id = "3" onChange = {handleCheckbox} type = "checkbox" checked = {three ? true : false}/> 
                            <span>{"3 & above"}</span>
                            </label>
                            <label>
                                <input data-id = "2" onChange = {handleCheckbox} type = "checkbox" checked = {two ? true : false}/> 
                            <span>{"2 & above"}</span>
                            </label>
                            <label>
                                <input data-id = "1" onChange = {handleCheckbox} type = "checkbox" checked = {one ? true : false}/> 
                            <span>{"1 & above"}</span>
                            </label>
                        </div>
                    </article>
                </aside>
                <section className = "product-section">
                    <h1>{category}</h1>
                    <Item/>
                </section>
            </div>
        </main>
    )
    }
}
export default Product;
