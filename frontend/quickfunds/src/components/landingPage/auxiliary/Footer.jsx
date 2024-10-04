import CustomSvg1 from "../../customSvgs/CustomSvg1";
import { MdFacebook } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

export default function Footer(){
    return (
        <div>
            <div className="p-4 mx-lg-5 mx-md-2 mx-2 mb-5 d-flex flex-wrap align-items-start justify-content-between justify-content-md-center justify-content-center">
                <div className="col-lg-5 col-md-12 col-12 mb-md-5 mb-lg-0 mb-5">
                    <p className="m-0 p-0 mb-4 font-family-workSans text-capitalize txt-16">
                        <span className="txt-2947A9 fw-500">Address:</span>
                        <span className="txt-292E3D fw-400 mx-3">6391 Elgin St. Celina, Delaware 10299</span>
                    </p>
                    <p className="m-0 p-0 mb-4 font-family-workSans text-capitalize txt-16">
                        <span className="txt-2947A9 fw-500">Phone:</span>
                        <span className="txt-292E3D fw-400 mx-3">+84 1102 2703</span>
                    </p>
                    <p className="m-0 p-0 mb-lg-4 mb-md-5 mb-5 font-family-workSans text-capitalize txt-16">
                        <span className="txt-2947A9 fw-500">Email:</span>
                        <span className="txt-292E3D fw-400 mx-3">hello@thebox.com</span>
                    </p>    
                    <div className="d-flex align-items-center">
                        <CustomSvg1 name="logo" />
                        <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-2947A9">
                            <span className="fst-italic">Quick</span>Funds
                        </h1>
                    </div>                                    
                </div>
                <div className="col-lg-5 col-md-12 col-12">
                    <p className="m-0 p-0 mb-4 font-family-workSans text-capitalize txt-16">
                        <span className="txt-2947A9 fw-500">Social:</span>
                    </p>
                    <div className="d-flex align-items-center">
                        <div>
                            <MdFacebook size={35} color="#3D445C" />
                        </div>
                        <div className="mx-3">
                            <FaLinkedin size={30} color="#3D445C" />
                        </div>
                        <div className="mx-2">
                            <FaTwitter size={32} color="#3D445C" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-2947A9 px-4 py-3">
                <div className="mx-5 my-2">
                    <p className="m-0 p-0 fw-400 txt-FFF txt-15 font-family-workSans">
                        QuickFunds Company © 2022. All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    )
}