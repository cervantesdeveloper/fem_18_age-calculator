export default function InputNumberWrapper (props){
    

    return(
        <div 
            className= {`input-wrapper ${props.empty && "invalid"}`}>
            <label htmlFor={props.name}>{props.legend}</label>

            <input 
                type="number" 
                id={props.name} 
                name={props.name} 
                placeholder={props.placeholder}
                min="1"
                max={props.max}
                onBlur={props.myOnBlur}
                onChange={props.myOnChange}
            />

            <p 
                className={`input__alert ${!props.empty && ("hidden")}`}
            >
                {props.empty === "empty" ? "this field is required" : props.alert}
            
            </p>
        </div>
    )
}