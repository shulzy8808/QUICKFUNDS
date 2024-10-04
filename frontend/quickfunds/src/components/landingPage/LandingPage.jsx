import Navigation from "../Navigation/Navigation";
import AboutUs from "./auxiliary/AboutUs";
import ContactUs from "./auxiliary/ContactUs";
import Footer from "./auxiliary/Footer";
import Header from "./auxiliary/Header";
import OurReputation from "./auxiliary/OurReputation";
import OurServices from "./auxiliary/OurServices";
import './css/landingPage.css'
import { Bounce, Fade, Zoom } from 'react-reveal'


export default function LandingPage({ setAlertModal, companyDetails }){
    return (
        <div className="w-100">
            <Navigation companyDetails={companyDetails} />
            <Header />

            <div className="my-5" />
            
            <Fade duration={4000}>
                <OurReputation />
            </Fade>

            <div className="my-5 py-5" />

            <Fade duration={4000}>
                <AboutUs />
            </Fade>

            <div className="my-5 py-5" />

            <Zoom duration={2000}>
                <OurServices /> 
            </Zoom>
            
            <div className="my-5 py-5" />
            <ContactUs setAlertModal={setAlertModal} />
            <div className="my-5 py-5" />
            <Footer />
        </div>
    )
}