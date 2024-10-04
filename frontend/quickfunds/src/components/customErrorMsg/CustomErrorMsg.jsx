export default function CustomErrorMsg({ isCentered, errorMsg }){
    return (
        <p
            className={`m-0 p-0 py-3 txt-15 txt-E01313 font-family-workSans fw-400 ${isCentered ? 'text-center' : 'text-left'}`}
        >
            { errorMsg }
        </p>
    )
}