import CustomSvg1 from "../../customSvgs/CustomSvg1"
import { TfiMoney } from "react-icons/tfi";
import { FaPeopleGroup } from "react-icons/fa6";


const reputations = [
    {
        Icon: () => <CustomSvg1 name="customer-support" />,
        title: 'Best Services',
        text: 'Nullam senectus porttitor in eget. Eget rutrum leo interdum.'
    },
    {
        Icon: () => <FaPeopleGroup color="F9995D" size={40} />,
        title: 'Best Teams',
        text: 'Nullam senectus porttitor in eget. Eget rutrum leo interdum.'
    },
    {
        Icon: () => <TfiMoney color="F9995D" size={40} />,
        title: 'Best Offers',
        text: 'Nullam senectus porttitor in eget. Eget rutrum leo interdum.'
    },
]

export default function OurReputation(){

    const displayReputations = reputations.map((reputation, i) => {
        const { Icon, text, title } = reputation

        return (
            <div
                key={i}
                className="bg-FFF col-lg-4 col-md-12 col-12 mb-lg-0 mb-4 mb-md-4 d-flex align-items-center justify-content-center"
            >
                <div 
                    style={{
                        borderRadius: "4px",
                        border: "1.4px solid #E0E3EB"
                    }}                
                    className="col-lg-11 p-3"
                >
                    <div className="mb-3">
                        <Icon />
                    </div>
                    <div className="mb-4">
                        <h4 className="m-0 p-0 txt-3D445C fw-700 txt-20 font-family-workSans">
                            { title }
                        </h4>
                    </div>
                    <div>
                        <p className="m-0 p-0 txt-858EAD fw-400 txt-26 font-family-workSans">
                            { text }
                        </p>
                    </div>                    
                </div>
            </div>
        )
    })

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="mb-5">
                <h3 className="m-0 p-0 text-center txt-292E3D txt-24 font-family-workSans fw-700">
                    Our Reputation
                </h3>
            </div>

            <div className="w-lg-75 w-75 w-md-75 d-flex flex-wrap align-items-center justify-content-lg-between justify-content-md-center justify-content-center">
                { displayReputations }
            </div>
        </div>
    )
}