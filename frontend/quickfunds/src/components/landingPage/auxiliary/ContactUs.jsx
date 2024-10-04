import { Formik, ErrorMessage } from "formik";
import * as yup from 'yup'
import CustomErrorMsg from "../../customErrorMsg/CustomErrorMsg";
import { useEffect, useState } from "react";
import { onRequestApi } from "../../apiRequests/requestApi";
import Loading1 from "../../Loading/Loading1";
import { Spinner } from 'react-bootstrap'


export default function ContactUs({ setAlertModal }){

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    const schema = yup.object().shape({
        full_name: yup.string().required('Full name is required'),
        email: yup.string().email('Must be a valid email address').required('Email is required'),
        reason: yup.string().required('Reason for contacting is required'),
        phoneNumber: yup.string(),
        message: yup.string()
    })

    useEffect(() => {
        if(apiReqs.data && apiReqs.isLoading){
            const { data } = apiReqs

            onRequestApi({
                requestInfo: data,
                successCallBack: msgSentSuccess,
                failureCallback: msgSentFailure
            })
        }
    }, [apiReqs])

    const msgSentSuccess = () => {
        setApiReqs({ isLoading: false, data: null, errorMsg: null })
        return setAlertModal && setAlertModal({ msg: 'Message sent! We will get back to you soonest', type: 'success' })
    }

    const msgSentFailure = ({ errorMsg }) => {
        setApiReqs({ isLoading: false, data: null, errorMsg: errorMsg || 'Something went wrong! Try again!' })
        return setAlertModal && setAlertModal({ msg: errorMsg || 'Something went wrong! Try again!', type: 'error' })
    }

    return (
        <div className="bg-F6F8F7 d-flex align-items-center justify-content-center p-4">

            {
                apiReqs.isLoading
                &&
                    <Loading1 />
            }

            <div className="d-flex align-items-center justify-content-center flex-column">
                <div className="col-lg-8 col-md-12 col-12 mb-4 d-flex flex-column align-items-center justify-content-center">
                    <div className="mx-4 w-100 mb-4">
                        <h3 className="m-0 p-0 mb-3 text-center txt-292E3D txt-24 font-family-workSans fw-700">
                            What can we do for you?
                        </h3>
                        <p className="m-0 p-0 text-center txt-17 txt-292E3D font-family-workSans fw-400">
                            We are ready with hands-on finiancial backing to assist you kickstart, grow or expand
                            any business of any magnitude                       
                        </p>
                    </div>

                    {
                        apiReqs.errorMsg
                        &&
                            <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
                    }

                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            full_name: '', email: '', reason: '', phoneNumber: '', message: ''
                        }}
                        onSubmit={(values, { resetForm }) => {

                            setApiReqs({
                                isLoading: true,
                                errorMsg: null,
                                data: {
                                    url: '/users/send-message',
                                    method: 'post',
                                    data: values
                                }
                            })

                            return resetForm()
                        }}
                    >
                        {({ values, handleBlur, handleChange, handleSubmit, dirty, isValid }) => (
                            <div>
                                <div className="d-flex flex-wrap align-items-start justify-content-start mb-lg-4 mb-md-0 mb-0">
                                    <div className="mb-lg-0 mb-md-2 mb-2 col-lg-6 col-md-12 col-12 d-flex align-items-start justify-content-lg-start justify-content-md-center justify-content-center">
                                        <div className="col-lg-11 col-12 col-md-12">
                                            <input 
                                                type="text"
                                                name="full_name"
                                                value={values.full_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Your full name"
                                                className="p-2 rounded-3 bg-FFF w-100"
                                                style={{
                                                    border: '1px solid #E0E3EB'
                                                }}                      
                                            />
                                            <ErrorMessage 
                                                name="full_name" 
                                                render={
                                                    errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                                    } 
                                            />  
                                        </div>                                      
                                    </div>
                                    <div className="mb-lg-0 mb-md-2 mb-2 col-lg-6 col-md-12 col-12 d-flex align-items-start justify-content-lg-end justify-content-md-center justify-content-center">
                                        <div className="col-lg-11 col-md-12 col-12">
                                            <input 
                                                type="text"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Email address"
                                                className="p-2 rounded-3 bg-FFF w-100"
                                                style={{
                                                    border: '1px solid #E0E3EB'
                                                }}                      
                                            />
                                            <ErrorMessage 
                                                name="email" 
                                                render={
                                                    errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                                    } 
                                            />  
                                        </div>                                      
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap align-items-start justify-content-start mb-lg-4 mb-md-3 mb-3">
                                    <div className="col-lg-6 col-md-12 col-12 mb-lg-0 mb-md-2 mb-2 d-flex align-items-start justify-content-start justify-content-md-center justify-content-center">
                                        <div className="col-lg-11 col-ld-12 col-12">
                                            <input 
                                                type="text"
                                                name="reason"
                                                value={values.reason}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Reason for contacting"
                                                className="p-2 rounded-3 bg-FFF w-100"
                                                style={{
                                                    border: '1px solid #E0E3EB'
                                                }}                      
                                            />
                                            <ErrorMessage 
                                                name="reason" 
                                                render={
                                                    errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                                    } 
                                            />  
                                        </div>                                      
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-12 mb-lg-0 mb-md-2 mb-2 d-flex align-items-start justify-content-start justify-content-md-center justify-content-center">
                                        <div className="col-lg-11 col-md-12 col-12">
                                            <input 
                                                type="text"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Phone number"
                                                className="p-2 rounded-3 bg-FFF w-100"
                                                style={{
                                                    border: '1px solid #E0E3EB'
                                                }}                      
                                            />
                                            <ErrorMessage 
                                                name="phoneNumber" 
                                                render={
                                                    errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                                    } 
                                            />  
                                        </div>                                      
                                    </div>
                                </div>
                                
                                <div className="w-100 mb-4">
                                    <textarea 
                                        type="text"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Additional message"
                                        className="p-2 rounded-3 bg-FFF w-100"
                                        style={{
                                            border: '1px solid #E0E3EB',
                                            height: '30vh'
                                        }}                      
                                    />
                                    <ErrorMessage 
                                        name="message" 
                                        render={
                                            errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                            } 
                                    />  
                                </div>   

                                <div className="d-flex align-items-center justify-content-center">
                                    <button
                                        disabled={(!(isValid && dirty) || apiReqs.isLoading) ? true : false}
                                        onClick={handleSubmit}
                                        style={{
                                            opacity: !(isValid && dirty) || apiReqs.isLoading ? 0.5 : 1
                                        }}
                                        className="col-lg-8 bg-2947A9 p-3 rounded-3 text-center txt-FFF fw-600 font-family-workSans txt-16"
                                    >
                                        {
                                            apiReqs.isLoading
                                            ?
                                                <Spinner variant="light" size="sm" />
                                            :
                                                'Submit'
                                        }
                                    </button>
                                </div>                                                              
                            </div>
                        )}
                    </Formik>
                </div>              
            </div>
        </div>        
    )
}