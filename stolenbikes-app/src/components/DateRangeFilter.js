import React, { useState } from 'react'

const DateRangeFilter = (onDateFilter) => {


    // const [filters, setFilters] = useState({
    //     from: "",
    //     to: ""
    // })
    const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");

    const handleInput = (event) => {
        //const {value}=event.target;
        setStartDate(event.target.value);
        onDateFilter(startDate);
    }
    // const handleInput2 = (event) => {
    //     (event.target.value);
    // }


    return (

        <div className="daterangediv">
            <div>
                from
                <input type="date" className="form-control" id="startDate" onChange={handleInput} />
            </div>
        </div>
    )
}

export default DateRangeFilter