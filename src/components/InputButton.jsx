export default function(props){

    return(
        <input 
            type="submit" 
            value="" 
            className={`btn cta ${props.disabled && "disabled"}`}
            disabled = {props.disabled}
        />
    )
}