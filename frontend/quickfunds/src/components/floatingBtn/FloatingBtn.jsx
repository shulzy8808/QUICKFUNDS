import { FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function FloatingBtn({ icon, btnFunc, siteSecured }){

    const onBtnClick = () => btnFunc && btnFunc()

    return (
        <div className="w-100 m-0 fixed-bottom p-3 d-flex align-items-center justify-content-end">
            <div 
                onClick={onBtnClick}
                className={`${siteSecured ? 'bg-2947A9' : 'bg-14171F'} p-3 rounded-circle clickable`}
            >
                <div className="clickable">
                    {
                        icon == 'toggle-on'
                        ?
                            <FaToggleOn color="#FFF" size={30} /> 
                        :
                        icon == 'toggle-off'
                        &&
                            <FaToggleOff color="#FFF" size={30} />                          
                    }
                </div>
            </div>
        </div>
    )
}