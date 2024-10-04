import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop(props){
    
    const pathName = useLocation().pathname

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathName])

    return <div />
}