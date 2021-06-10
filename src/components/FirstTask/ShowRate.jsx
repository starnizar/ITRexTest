import React from 'react'

const ShowRate = ({rate, selectedCurr}) => {
    if(rate === 'outdated '){
        return <div>
            <h4>Currencie name is outdated!</h4>
            <p>Please, choose another</p>
        </div>
    }
    if(!rate || !selectedCurr){
        return <div>
            
        </div>
    }
    return  <div>
        <p>{selectedCurr.Cur_Name_Eng}: {rate.Cur_Scale} {rate.Cur_Abbreviation} = {rate.Cur_OfficialRate} BYN</p>
        <label>{rate.Date}</label>
    </div>
}

export default ShowRate