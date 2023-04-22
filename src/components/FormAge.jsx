import DisplayResult from "./DisplayResult";
import InputButton from "./InputButton";
import { useState, useRef, useEffect} from "react";


export default function FormAge(){
    
    const currentDate = new Date(),
        currentYear = currentDate.getFullYear();

    const longMonths = [1, 3, 5, 7, 8, 10, 12],
        shortMonths = [4, 6, 9, 11];

    const [day, setDay] = useState("--");
    const [month, setMonth] =  useState("--");
    const [year, setYear] = useState("--");

    const [isInvalid, setIsInvalid] = useState({
        day: "",
        month: "",
        year: "",
    })

    const [calCulatedDay, setCalculatedDay] = useState("--");
    const [calCulatedMonth, setCalculatedMonth] = useState("--")
    const [calCulatedYear, setCalculatedYear] = useState("--")

    const inputDay = useRef();
    const inputMonth = useRef();
    const inputYear = useRef();

    const validateValue = (e)=>{ // valida si un campo esta vacio
        let value = Math.ceil(e.target.value);

        if(!value){
            setIsInvalid({
                ...isInvalid,
                [e.target.name]: "empty"
            })
        }

        if(value){
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


    useEffect(()=>{ //valida el valor del dia
        if(day > inputDay.current.max || day < 1){
            setIsInvalid({
                ...isInvalid,
                [inputDay.current.name]: "invalid"
            })
        } else {
            setIsInvalid({
                ...isInvalid,
                [inputDay.current.name]: ""
            })
        }

    }, [day])

    useEffect(()=>{ // valida el valor del mes

        if(month == 2) inputDay.current.max = 28
        if(shortMonths.includes(month)) inputDay.current.max = 30
        if(longMonths.includes(month)) inputDay.current.max = 31

        if(day > inputDay.current.max || day < 1){
            setIsInvalid({
                ...isInvalid,
                [inputDay.current.name]: "invalid"
            })
        } else {
            setIsInvalid({
                ...isInvalid,
                [inputDay.current.name]: ""
            })
        }

        if(month > inputMonth.current.max || day < 1){
            setIsInvalid({
                ...isInvalid,
                [inputMonth.current.name]: "invalid"
            })
        }

    }, [month])

    useEffect(()=>{ // valida el valor del año
        
        if(month == 2) inputDay.current.max = 28
        if(month == 2 && (year % 4 == 0)) inputDay.current.max = 29

        if(day > inputDay.current.max || day < 1){
            setIsInvalid({
                ...isInvalid,
                [inputDay.current.name]: "invalid"
            })
            
        } else {
            setIsInvalid({
                ...isInvalid,
                [inputDay.current.name]: ""
            })
        }

        if(year > inputYear.current.max || day < 1){
            setIsInvalid({
                ...isInvalid,
                [inputYear.current.name]: "invalid"
            })
        }
    }, [year])

    const handleSubmit = e =>{
        e.preventDefault();
        let oldDate = new Date(`${month} ${day}, ${year}`),
            timeLapsed = Date.now() - oldDate.getTime(),
            millisecondsPerYear = (((1000 * 60) * 60) * 24 ) * 365.25,
            millisecondsPerMonth = (((1000 * 60) * 60) * 24 ) * 30.4375,
            millisecondsPerDay = ((1000 * 60) * 60) * 24,
            years = Math.floor(timeLapsed / millisecondsPerYear),
            months =  Math.floor((timeLapsed % millisecondsPerYear) / millisecondsPerMonth),
            days = Math.floor((timeLapsed % millisecondsPerMonth) / millisecondsPerDay) ;    

        if(timeLapsed < 0){
            setIsInvalid({
                ...isInvalid,
                day: "invalidDate"
            })
            return
        }

        setCalculatedDay(days);
        setCalculatedMonth(months);
        setCalculatedYear(years);
    }

    
        
    return (
        <>
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
                        required
                    />
                    <p className={`input__alert ${!isInvalid.day && "hidden"}`}>
                        {isInvalid.day === "empty" 
                            ? "this field is required" 
                            : isInvalid.day === "invalidDate"
                            ? "must be a valid date"
                            : "must be a valid day"
                        }
                    </p>
                </div>

                <div className={`input-wrapper ${isInvalid.month && "invalid"}`}>
                    <label htmlFor="month">MONTH</label>
                    <input
                        ref={inputMonth}
                        type="number"
                        name="month"
                        id="month"
                        placeholder="MM"
                        min="1"
                        max="12"
                        onBlur={validateValue}
                        required
                    />
                    <p className={`input__alert ${!isInvalid.month && "hidden"}`}>
                        {isInvalid.month === "empty" ? "this field is required" : "must be a valid month"}
                    </p>
                </div>

                <div className={`input-wrapper ${isInvalid.year && "invalid"}`}>
                    <label htmlFor="year">YEAR</label>
                    <input
                        ref={inputYear}
                        type="number"
                        name="year"
                        id="year"
                        placeholder="YYYY"
                        min="1"
                        max={currentYear}
                        onBlur={validateValue}
                        required
                    />
                    <p className={`input__alert ${!isInvalid.year && "hidden"}`}>
                        {isInvalid.year === "empty" ? "this field is required" : "must be in the past"}
                    </p>
                </div>

                <InputButton/>
            </form>
            <div className="result">
                <DisplayResult result={calCulatedYear} calculatedData="years"/>
                <DisplayResult result={calCulatedMonth} calculatedData="months"/>
                <DisplayResult result={calCulatedDay} calculatedData="days"/>
            </div>
        </>
        
    )
}