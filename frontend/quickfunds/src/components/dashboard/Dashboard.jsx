import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashboardNav from "./auxiliary/DashboardNav";
import Dashboard_Records from "./auxiliary/screens/Dashboard_Records";
import Dashboard_AddCustomer from "./auxiliary/screens/Dashboard_AddCustomer";
import { useEffect, useState } from "react";
import CustomSvg1 from "../customSvgs/CustomSvg1";
import { IoIosMenu, IoMdArrowBack } from "react-icons/io";
import { Offcanvas } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";

export default function Dashboard({ companyDetails, setCompanyDetails, setAlertModal, siteSecured, logout }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToLandingPage = () => navigateTo('/landing-page')

    const pathName = useLocation().pathname

    const [showOffCanvasNav, setShowOffCanvasNav] = useState(false)

    useEffect(() => {
        if(!companyDetails || !companyDetails.details || !companyDetails.details.company_id){
            goToLandingPage()
        }
    }, [pathName])

    useEffect(() => {
        if(companyDetails){
            const { alertModal } = companyDetails

            if(alertModal){
                setAlertModal(alertModal)
            }
        }
    }, [companyDetails])

    const openOffCanvasNav = () => setShowOffCanvasNav(true)
    const hideOffCanvasNav = () => setShowOffCanvasNav(false)

    if(!companyDetails || !companyDetails.details || !companyDetails.details.company_id){
        return <></>
    }

    const { details, accessToken, customers } = companyDetails
    const { company_id } = details

    return (
        <div 
            style={{
                minHeight: '100vh'
                
            }}
            className="bg-F6F8F7"
        >
            <div className="col-lg-3 col-md-3 col-3 position-fixed d-lg-block d-md-none d-none">
                <DashboardNav 
                    logout={logout}
                />
            </div>

            <div className="d-flex d-lg-none d-md-flex p-3 bg-FFF fixed-top align-items-center justify-content-between">
                <div className="col-lg-0 col-md-8 col-8 d-flex align-items-center">
                    <CustomSvg1 name="logo" />
                    <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-2947A9">
                        <span className="fst-italic">Quick</span>Funds
                    </h1>
                </div>
                <div className="col-lg-12 col-md-4 col-4 d-lg-none d-md-flex d-flex align-items-center justify-content-end">
                    <IoIosMenu size={30} color="#2947A9" className="clickable" onClick={openOffCanvasNav} />
                </div>                
            </div>

            <div className="my-lg-0 my-5 my-md-4 py-5 py-md-5 py-lg-0 col-12 col-md-9 col-lg-9 p-3 offset-lg-3 offset-md-0 offset-0">
                <Routes>
                    <Route 
                        path="/"
                        element={
                            <Dashboard_Records 
                                customers={customers}
                            />
                        }
                    />
                    <Route 
                        path="/add-customer"
                        element={
                            <Dashboard_AddCustomer 
                                setCompanyDetails={setCompanyDetails}
                                accessToken={accessToken}
                                setAlertModal={setAlertModal}
                                company_id={company_id}
                                siteSecured={siteSecured}
                            />
                        }
                    />                    
                </Routes>
            </div>

            <Offcanvas
                show={showOffCanvasNav}
            >
                <div className="bg-292E3D p-4 h-100 w-100">
                    <div className="d-flex justify-content-between w-100 align-items-center mb-5">
                        <div onClick={goToLandingPage} className="d-flex align-items-center clickable">
                            <IoMdArrowBack color="#FFF" size={30} />
                            <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-FFF">
                                Back to home
                            </h1>
                        </div>
                        <div>
                            <ImCancelCircle size={30} color="#FFF" className="clickable" onClick={hideOffCanvasNav} />
                        </div>
                    </div>

                    <div>
                        <DashboardNav 
                            logout={logout}
                        />
                    </div>
                </div>
            </Offcanvas>            
        </div>
    )
}