import InputButton from "./InputButton";
import { useState, useEffect, useRef } from "react";


export default function FormAge(){
    const date = new Date(),
        currentYear = date.getFullYear(),
        currentMonth = date.getUTCMonth(),
        currentDay = date.getDate();

    const longMonths = [0, 2, 4, 6, 7, 9, 11],
        shortMonths = [3, 5, 8, 10],
        february = [1]

    const [day, setDay] = useState("--");
    const [month, setMonth] =  useState("--");
    const [year, setYear] = useState("--");

    const [isInvalid, setIsInvalid] = useState({
        day: "",
        month: "",
        year: "",
    })

    const inputDay = useRef();

    // useEffect(()=>{
    //     if(month == 2 && (year % 4 == 0)){inputDay.current.max = 29}
        
        
    //     if(month == 2){inputDay.current.max = 28}
    // })

    const handleSubmit = e =>{
        e.preventDefault();
        console.log("click")
    }

    const validateValue = (e)=>{ // valida los valores de los input
        let value = Math.ceil(e.target.value);

        if(!value){
            setIsInvalid({
                ...isInvalid,
                [e.target.name]: "empty"
            })
           
        }

        if(value && (value > parseInt(e.target.max) || value < parseInt(e.target.min))){

            setIsInvalid({
                ...isInvalid,
                [e.target.name]: "invalid"
            })
            
            e.target.value = value;
        }

        if(value && value <= parseInt(e.target.max) && value > 0){
            setIsInvalid({
                ...isInvalid,
                [e.target.name]: ""
            })
            e.target.name == "day" && setDay(parseInt(value));
            e.target.name == "month" && setMonth(parseInt(value));
            e.target.name == "year" && setYear(parseInt(value));
            e.target.value = value;
        }

    }


    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className={`input-wrapper ${isInvalid.day && "invalid"}`}>
                <label htmlFor="day">DAY</label>
                <input
                    ref={inputDay}
                    type="number"
                    name="day"
                    id="day"
                    placeholder="DD"
                    min="1"
                    max="31"
                    onBlur={validateValue}
                />
                <p className={`input__alert ${!isInvalid.day && "hidden"}`}>
                    {isInvalid.day === "empty" ? "this field is required" : "must be a valid day"}
                </p>
            </div>

            <div className={`input-wrapper ${isInvalid.month && "invalid"}`}>
                <label htmlFor="month">MONTH</label>
                <input
                    type="number"
                    name="month"
                    id="month"
                    placeholder="MM"
                    min="1"
                    max="12"
                    onBlur={validateValue}
                />
                <p className={`input__alert ${!isInvalid.month && "hidden"}`}>
                    {isInvalid.month === "empty" ? "this field is required" : "must be a valid month"}
                </p>
            </div>

            <div className={`input-wrapper ${isInvalid.year && "invalid"}`}>
                <label htmlFor="year">YEAR</label>
                <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="YYYY"
                    min="1"
                    max={currentYear}
                    onBlur={validateValue}
                />
                <p className={`input__alert ${!isInvalid.year && "hidden"}`}>
                    {isInvalid.year === "empty" ? "this field is required" : "must be in the past"}
                </p>
            </div>

            <InputButton disabled/>
        </form>
    )
}