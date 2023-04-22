export default function DisplayResult ({result, calculatedData}){
    return(
        <>
            <p className="result__paragraph"><span>{result} </span>{calculatedData}</p>
        </>
    )
}