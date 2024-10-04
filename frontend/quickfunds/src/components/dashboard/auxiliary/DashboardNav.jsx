import CustomSvg1 from "../../customSvgs/CustomSvg1";
import { ImStatsBars } from "react-icons/im";
import { IoPersonAddSharp, IoSettingsSharp  } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const navLinks = [
    {
        title: 'Records',
        Icon: ({ color }) => <ImStatsBars size={30} color={color} />,
        path: '/'
    },
    {
        title: 'Add customer',
        Icon: ({ color }) => <IoPersonAddSharp size={30} color={color} />,
        path: 'add-customer'
    },
    {
        title: 'Settings',
        Icon: ({ color }) => <IoSettingsSharp size={30} color={color} />
    },
    {
        title: 'Logout',
        Icon: ({ color }) => <IoMdLogOut size={30} color={color} />
    }
]

export default function DashboardNav({ logout }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)

    const pathName = useLocation().pathname

    const [activeNav, setActiveNav] = useState('')

    useEffect(() => {
        if(pathName.includes('/add-customer')){
            setActiveNav('Add customer')
        
        } else if(pathName.includes('/settings')){
            setActiveNav('Settings')

        } else{
            setActiveNav('Records')
        }
    }, [pathName])

    const displayNavLinks = ({ start, stop }) => navLinks.slice(start, stop).map((navLink, i) => {
        const { title, Icon, path } = navLink

        const isActive = title == activeNav

        const goToPath = () => 
            title == 'Logout'
            ?
                logout && logout()
            :
                path && navigateTo(path)

        return (
            <div 
                key={i}
                onClick={goToPath}
                className="clickable d-flex align-items-center mb-4 pb-3"
            >
                <div>
                    <Icon color={isActive ? '#2947A9' : '#14171F'} />
                </div>
                <h3 className="m-0 p-0 mx-3 txt-FFF fw-500 txt-16 font-family-workSans">
                    { title }
                </h3>
            </div>
        )
    })

    return (
        <div 
            style={{
                minHeight: '100vh'
            }}          
            className="bg-292E3D"
        >
            <div className='d-flex align-items-center justify-content-center p-4 mb-2'>
                <div className="d-flex align-items-center mb-4">
                    <CustomSvg1 name="logo" />
                    <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-FFF">
                        <span className="fst-italic">Quick</span>Funds
                    </h1>
                </div>
            </div>    

            <div className="mb-5 p-4">
                { 
                    displayNavLinks({ start: 0, stop: 2 })
                }
            </div> 

            <hr />             

            <div className="p-4">
                { 
                    displayNavLinks({ start: 2, stop: 4 })
                }
            </div>                                
        </div>
    )
}