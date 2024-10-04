import { useNavigate } from "react-router-dom";
import CustomSvg1 from "../customSvgs/CustomSvg1";
import { IoIosMenu } from "react-icons/io";
import { Offcanvas } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";


const navLinks = [
    {
        title: 'Home',
    },
    {
        title: 'About Us',
    },
    {
        title: 'Services',
    },
    {
        title: 'Contact Us',
    },
]


export default function Navigation({ companyDetails }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToLogin = () => navigateTo('/login')
    const goToRegister = () => navigateTo('/register')
    const goToDashboard = () => navigateTo('/')

    const [showOffCanvasNav, setShowOffCanvasNav] = useState(false)

    const openOffCanvasNav = () => setShowOffCanvasNav(true)
    const hideOffCanvasNav = () => setShowOffCanvasNav(false)

    const displayNavLinks = navLinks.map((navLink, i) => {
        const { title } = navLink

        return (
            <p
                key={i}
                className="m-0 p-0 mb-lg-0 mb-md-4 mb-4 clickable txt-14171F txt-14 fw-400 font-family-workSans"
            >
                { title }
            </p>
        )
    })

    return (
        <div className="sticky-top">
            <div className="d-flex align-items-center justify-content-between bg-FFF p-lg-3 p-md-2 p-2 px-lg-5 px-md-3 px-3">
                <div className="col-lg-5 col-md-8 col-8 d-flex align-items-center">
                    <CustomSvg1 name="logo" />
                    <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-2947A9">
                        <span className="fst-italic">Quick</span>Funds
                    </h1>
                </div>

                <div className="col-lg-12 col-md-4 col-4 d-lg-none d-md-flex d-flex align-items-center justify-content-end">
                    <IoIosMenu size={30} color="#2947A9" className="clickable" onClick={openOffCanvasNav} />
                </div>

                <div className="col-lg-7 d-lg-flex d-md-none d-none align-items-center justify-content-between">
                    <div className="col-lg-7 d-flex align-items-center justify-content-between">
                        { displayNavLinks }
                    </div>
                    {
                        !(companyDetails && companyDetails.details && companyDetails.details.company_name) 
                        ?
                            <div className="col-lg-5 d-flex align-items-center justify-content-end">
                                <button 
                                    onClick={goToLogin}
                                    style={{ 
                                        border: '1px solid #2947A9'
                                    }}
                                    className="rounded-3 mx-2 txt-2947A9 bg-transparent p-3 text-center fw-600 txt-14 font-family-workSans"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={goToRegister} 
                                    className="rounded-3 mx-2 txt-FFF bg-2947A9 p-3 text-center fw-600 txt-14 font-family-workSans"
                                >
                                    Register
                                </button>                        
                            </div>
                        :
                            <div className="col-lg-5 d-flex align-items-center justify-content-end">
                                <button 
                                    onClick={goToDashboard}
                                    style={{ 
                                        border: '1px solid #2947A9'
                                    }}
                                    className="rounded-3 mx-2 txt-2947A9 bg-transparent p-3 text-center fw-600 txt-14 font-family-workSans"
                                >
                                    Dashboard
                                </button>                      
                            </div>                                                
                    }                    
                </div>
            </div>

            <Offcanvas
                show={showOffCanvasNav}
            >
                <div className="bg-F6F8F7 p-4 h-100 w-100">
                    <div className="d-flex justify-content-between w-100 align-items-center mb-5">
                        <div className="d-flex align-items-center">
                            <CustomSvg1 name="logo" />
                            <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-000">
                                <span className="fst-italic">Quick</span>Funds
                            </h1>
                        </div>
                        <div>
                            <ImCancelCircle size={30} color="#000" className="clickable" onClick={hideOffCanvasNav} />
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center mb-5">
                        { displayNavLinks }
                    </div>
                    {
                        !(companyDetails && companyDetails.details && companyDetails.details.company_name) 
                        ?
                            <div className="w-100 d-flex align-items-center justify-content-center">
                                <button 
                                    onClick={goToLogin}
                                    style={{ 
                                        border: '1px solid #2947A9'
                                    }}
                                    className="rounded-3 mx-2 txt-2947A9 bg-transparent p-3 text-center fw-600 txt-14 font-family-workSans"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={goToRegister} 
                                    className="rounded-3 mx-2 txt-FFF bg-2947A9 p-3 text-center fw-600 txt-14 font-family-workSans"
                                >
                                    Register
                                </button>                        
                            </div> 
                        :
                            <div className="w-100 d-flex align-items-center justify-content-center">
                                <button 
                                    onClick={goToDashboard}
                                    style={{ 
                                        border: '1px solid #2947A9'
                                    }}
                                    className="rounded-3 mx-2 txt-2947A9 bg-transparent p-3 text-center fw-600 txt-14 font-family-workSans"
                                >
                                    Dashboard
                                </button>                       
                            </div>                                                 
                    }                   
                </div>
            </Offcanvas>
        </div>
    )
}