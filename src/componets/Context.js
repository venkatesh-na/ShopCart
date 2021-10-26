import React, { useContext, useEffect, useState } from "react"
const AppContext = React.createContext()

//retrieving localStorage data
const getLocalTodo = ()=>
{
    if(localStorage.getItem("cart") !== null)
    {
        return JSON.parse(localStorage.getItem("cart"))
    }
    else
    {
        return []
    }
}

const AppProvider = ({children})=>{
    const [product,setPorduct] = useState([])
    const [product1,setPorduct1] = useState(product)
    const [itemDetails,setItemDetails] = useState([])
    const [loading,setLoading] = useState(false)
    const [check,setCheck] = useState({four:false,three:false,two:false,one:false})
    const [radio,setRadio] = useState({low_to_high:false,high_to_low:false})
    const [cart,setCart] = useState(getLocalTodo())
    const [subtotal,setsubtotal] = useState(0)
    const [category,setCategory] = useState("all")
    const fetchData = async ()=>{
        setLoading(true)
        try
        {
            const response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json()
            setLoading(false)
            setPorduct(data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    //fetchDatat after every rerender
    useEffect(()=>{
        fetchData()
    },[])

    //handleCategory
    const handleCategory = (e)=>{
        setCategory(e.target.dataset.id)
        setRadio({low_to_high:false,high_to_low:false})
        if(e.target.dataset.id == "all") {
            setPorduct1(product)
            setCheck({four:false,three:false,two:false,one:false})
        }
        else setPorduct1(product.filter((a)=>a.category == e.target.dataset.id))
    }

    //handle price filter
    const handlePrice = (e)=>{
        if(e.target.dataset.id == "low_to_high")
        {
            setRadio({...radio,low_to_high:true,high_to_low:false})
        }
        else if(e.target.dataset.id == "high_to_low")
        {
            setRadio({...radio,high_to_low:true,low_to_high:false})
        }
        let pro = [...product1]
        //i had to clone it so abousely i cant do pro = product because it can directly affect product state so if product state changes than our category button also changes
            if(e.target.dataset.id == "low_to_high")
            {
            for(let i = 0; i<product1.length; i++)
            {
                for(let j = 0; j<pro.length-1; j++)
                {
                    if(pro[j].price > pro[j+1].price)
                    {
                        [pro[j],pro[j+1]] = [pro[j+1],pro[j]]
                    }
                }
            }
            setPorduct1(pro)
            }
            else if(e.target.dataset.id == "high_to_low")
            {
                for(let i = 0; i<product1.length; i++)
                {
                    for(let j = 0; j<pro.length-1; j++)
                    {
                        if(pro[j].price < pro[j+1].price)
                        {
                            [pro[j],pro[j+1]] = [pro[j+1],pro[j]]
                        }
                    }
                }
                setPorduct1(pro)
            }
        }

        //handle uncheckPrice button
        const uncheck = ()=>{
            setRadio({low_to_high:false,high_to_low:false})
        }

        //code after every radio change
        useEffect(()=>{
            let arr = []
            for(let a in radio)
            {
                arr.push(radio[a])
            }
            if(arr.includes(true) == false)
            {
                if(category == "all")
                {
                    setPorduct1(product)
                }
                else
                {
                    //1bug on uncheck price it does not check for checked checkbox
                setPorduct1(product.filter((e)=>e.category == category))
                }
            }

        },[radio])

        //handle checkbox
        const handleCheckbox = (e)=>{
            switch(e.target.dataset.id)
            {
                case "4":
                    setCheck({...check,four:!check.four})
                    break;
                case "3":
                    setCheck({...check,three:!check.three})
                    break;
                case "2":
                    setCheck({...check,two:!check.two})
                    break;
                case "1":
                    setCheck({...check,one:!check.one})
                    break;
                default :
                    setPorduct1(product)
            }
        }

        //code after every check change
        useEffect(()=>{
            let n = 0
            let arr = []//if we uncheck all checkbox than we have to check whether this arr includes true or false to setProduct1 
            for (let a in check)
            {
                arr.push(check[a])
                //traversing check object for filteration on every checked checkbox
                //for filteration i need integer value but in check object we hav enumber in word so therefore i have to do as below
                if(a == "four"){n = 4}
                else if(a == "three"){n = 3}
                else if(a == "two"){n = 2}
                else {n = 1}
                if(check[a] == true)
                {
                    //filteration on every checked checkbox 
                    //checked checkebox are the true ones
                    if(category == "all")
                    {
                        setPorduct1(product.filter((e)=>e.rating.rate > n))
                    }
                    else
                    {
                        setPorduct1(product.filter((e)=>e.category == category).filter((e)=>e.rating.rate > n))
                    }
                }
            }
            if(arr.includes(true) == false)
            {
                //all checkbox -> unchecked and category exists
                if(category == "all")
                {
                    setPorduct1(product)
                }
                else
                {
                setPorduct1(product.filter((e)=>e.category == category))
                setCategory(category)
                }
            }
        },[check])
        
        
        //i have added category becuase when i checked 4 & above and then i select different category say jwellery so we need the jwellery having 4 and above so therefore i have added category dependancy

        //code after every product change
        useEffect(()=>{
            setPorduct1(product)
        },[product])

        //handleIncrement
        const handleInc = (id,price)=>{
            if(cart.filter((e)=>e.productId == id).length == 0)
            {
                setCart([...cart,{productId:id,count:1,price:price}])
            }
            if(cart.filter((e)=>e.productId == id).length > 0)
            {
                setCart(cart.map((e)=>
                {
                    if(e.productId == id)
                    {
                        return {productId:id,count:e.count + 1,price:(e.count+1)*price}
                    }
                    return e;
                }))              
            }
        }

        //handleDecrement
        const handleDec = (id,price)=>{
            if(cart.filter((e)=>e.productId == id)[0].count > 0)
            {
             setCart(cart.map((e)=>
                {
                    if(e.productId == id)
                    {
                        return {productId:id,count:e.count - 1,price:(e.count-1)*price}
                    }
                    return e;
                }))  
            } 

        }

        //handle deletecart button
        const handleDeleteCart = (id)=>{
            setCart(cart.filter((e)=>e.productId !== id))
        }

        //handle clear all button
        const handleClear = ()=>{
            setCart([])
        }

        //code after every cart change
        useEffect(()=>{
            localStorage.setItem("cart",JSON.stringify(cart))
            setsubtotal(cart.reduce((a,c)=>{return a + c.price},0))
        },[cart])
    return (
        <AppContext.Provider value = {{product,product1,itemDetails,setItemDetails,loading,setLoading,handleCategory,handlePrice,handleCheckbox,check,radio,handleInc,handleDec,cart,handleClear,handleDeleteCart,subtotal,category,uncheck}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider,useGlobalContext};