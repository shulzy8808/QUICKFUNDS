import { FaPersonCircleCheck, FaBatteryFull, FaMoneyBillTrendUp  } from "react-icons/fa6";
import { RiFileDamageFill } from "react-icons/ri";
import { VscDebugBreakpointConditionalUnverified } from "react-icons/vsc";
import { MdCreditScore } from "react-icons/md";

const services = [
    {
        Icon: () => <FaPersonCircleCheck size={40} color="#2947A9" />,
        bg: "#FFF",
        title: 'Character',
        titleColor: '#2947A9'
    },
    {
        Icon: () => <FaBatteryFull size={40} color="#FFF" />,
        bg: "#2947A9",
        title: 'Capacity',
        titleColor: '#FFF'
    },
    {
        Icon: () => <FaMoneyBillTrendUp size={40} color="#2947A9" />,
        bg: "#FFF",
        title: 'Capital',
        titleColor: '#2947A9'
    },
    {
        Icon: () => <RiFileDamageFill size={40} color="#FFF" />,
        bg: "#2947A9",
        title: 'Collateral',
        titleColor: '#FFF'
    },
    {
        Icon: () => <VscDebugBreakpointConditionalUnverified size={40} color="#2947A9" />,
        bg: "#FFF",
        title: 'Condition',
        titleColor: '#2947A9'
    },
    {
        Icon: () => <MdCreditScore size={40} color="#FFF" />,
        bg: "#2947A9",
        title: 'Credit Score',
        titleColor: '#FFF'
    },
]

export default function OurServices(){

    const displayServices = services.map((service, i) => {

        const { Icon, bg, title, titleColor } = service

        return (
            <div
                key={i}
                className="col-lg-4 col-md-12 col-12 d-flex align-items-center justify-content-center mb-4"
            >
                <div 
                    style={{
                        backgroundColor: bg
                    }}                
                    className="p-5 col-lg-10 col-md-12 col-12 d-flex flex-column align-items-center justify-content-center"
                >
                    <div
                        style={{
                            borderBottom: '1px solid #E0E3EB'
                        }}
                        className="pb-3 mb-4"
                    >
                        <Icon />
                    </div>
                    <div>
                        <h3 
                            style={{
                                color: titleColor
                            }}
                            className="m-0 p-0 fw-600 font-family-workSans txt-17"
                        >
                            { title }
                        </h3>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div className="bg-F6F8F7 d-flex align-items-center justify-content-center p-4">
            <div className="d-flex align-items-center justify-content-center flex-column">
                <div className="mb-4 d-flex align-items-center justify-content-center w-100">
                    <h3 className="m-0 p-0 text-center txt-292E3D txt-24 font-family-workSans fw-700">
                        Services
                    </h3>
                </div>

                <div className="col-lg-10 d-flex align-items-center justify-content-between flex-wrap">
                    { displayServices }
                </div>                
            </div>
        </div>
    )
}