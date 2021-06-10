import React, { useEffect, useRef, useState } from 'react'
import ShowRate from './ShowRate'

const FirstTask = () => {
    const [currencies, setCurrencies] = useState()
    const [selectedCurr, setSelectedCurr] = useState()
    const [rate, setRate] = useState()
    const inputRef = useRef()

    useEffect(()=>{
        (async function() {
            const response = await fetch(`https://www.nbrb.by/api/exrates/currencies`)
            const result = await response.json()
            setCurrencies(result)
        })()
    },[])

    const getRate = async(props) => {
        if (props){
            const response = await fetch(`https://www.nbrb.by/api/exrates/rates/${props.Cur_ID}`,{
                mode:'cors'
            })
            const result = await response.json()
            setRate(result)   
        } else {
            setRate('outdated ')
        }
    }

    const selectCurrencie = (event) => {
        event.preventDefault()
        const currName = inputRef.current.value
        const currNameAbbr = currName.slice(currName.length-3, currName.length)
        const selectedCurrency = currencies.filter(item => item.Cur_Abbreviation === currNameAbbr)
        setSelectedCurr(selectedCurrency[selectedCurrency.length-1])
        getRate(selectedCurrency[selectedCurrency.length-1])
    }

    return <div style={{borderRadius: '10px', boxShadow: '0 0 10px grey', width:'fit-content', padding:'20px', margin: '20px auto'}}>
        <h1 style={{margin: '0 0 15px', textShadow: '5px 5px 5px grey'}}>Task 1</h1>
        <form onSubmit={selectCurrencie} action="">
            <label htmlFor="currencie_choice">Choose a currecy name </label>
            <input ref={inputRef} list='currencies' id='currencie_choice' name='currencie_choice'/>
            <label> and hit 'Enter'</label>
            <datalist id='currencies'>
                {currencies && currencies.map((item,index) => (
                    <option key={index} value={`${item.Cur_Name_Eng} ${item.Cur_Abbreviation}`}></option>
                ))}
            </datalist>
        </form>
        <ShowRate rate={rate} selectedCurr={selectedCurr}/>
    </div>
}   

export default FirstTask