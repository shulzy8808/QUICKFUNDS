import { ErrorMessage, Formik } from "formik";
import * as yup from 'yup'
import { ONLY_NUMBERS_REGEX } from "../../../helpers/regex";
import CustomErrorMsg from "../../../customErrorMsg/CustomErrorMsg";
import { useEffect, useState } from "react";
import { onRequestApi } from "../../../apiRequests/requestApi";
import Loading1 from "../../../Loading/Loading1";
import { Spinner } from "react-bootstrap";

export default function Dashboard_AddCustomer({ setCompanyDetails, accessToken, company_id, setAlertModal, siteSecured }){

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    const schema = yup.object().shape({
        customer_name: yup.string().required("Customer name is required"),
        loan_amount: yup.string().matches(ONLY_NUMBERS_REGEX, "Only digits allowd").required("Loan amount is required"),
        interest_rate: yup.string().matches(ONLY_NUMBERS_REGEX, "Only digits allowd").required("Interest rate is required"),
        start_date: yup.string().required("Start date is required"),
        due_date: yup.string().required('Due date is required')
    })

    useEffect(() => {
        if(apiReqs.isLoading && apiReqs.data){
            const { data } = apiReqs

            onRequestApi({
                requestInfo: data,
                successCallBack: addCustomerSuccess,
                failureCallback: addCustomerFailure
            })
        }
    }, [apiReqs])

    const addCustomerSuccess = ({ result }) => {
        try {
            const { data } = result

            setCompanyDetails(prev => ({
                ...prev,
                customers: [...prev.customers, data],
                alertModal: { msg: "Succssfully added customer", type: 'success' }
            }))
    
            return setApiReqs({ isLoading: false, data: null, errorMsg: null })
        
        } catch (error) {
            console.log(error)
            return addCustomerFailure({ errorMsg: null })    
        }
    }

    const addCustomerFailure = ({ errorMsg }) => {
        const errMsg = errorMsg || 'Something went wrong! Try again later!'

        setAlertModal({ msg: errMsg, type: 'error' })

        return setApiReqs({ isLoading: false, data: null, errorMsg: errMsg })
    }

    return (
        <div className="mb-5">
            {
                apiReqs.isLoading 
                &&
                    <Loading1 />
            }

            <h3 className="m-0 p-0 mb-5 txt-292E3D txt-24 font-family-workSans fw-700">
                Add New Customer
            </h3>

            { 
                apiReqs.errorMsg
                &&
                    <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
            }

            <Formik

                validationSchema={schema}

                initialValues={{
                    customer_name: '', loan_amount: '', interest_rate: '', start_date: '',
                    due_date: '', reason: ''
                }}

                onSubmit={(values, { resetForm }) => {
                    setApiReqs({
                        isLoading: true,
                        errorMsg: null,
                        data: {
                            url: 'companies/add-customer',
                            data: { ...values, company_id, siteSecured },
                            method: 'post',
                            token: accessToken
                        }
                    })

                    // resetForm()
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, isValid, dirty }) => (
                    <div>
                        <div className="mb-4 d-flex align-items-start justify-content-between">
                            <div className='col-lg-5'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Customer Name</label>
                                <br />
                                <input 
                                    type='text'
                                    name='customer_name'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.customer_name}
                                    placeholder='Customer full name'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="customer_name" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div>
                            <div className='col-lg-3'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Loan amount</label>
                                <br />
                                <input 
                                    type='number'
                                    name='loan_amount'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.loan_amount}
                                    placeholder='Total loan amount'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="loan_amount" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div>
                            <div className='col-lg-3'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Interest rate {'(%)'}</label>
                                <br />
                                <input 
                                    type='number'
                                    name='interest_rate'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.interest_rate}
                                    placeholder='Total interest rate (%)'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="interest_rate" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div>                                                        
                        </div>

                        <div className="mb-4 d-flex align-items-start justify-content-between">
                            <div className='col-lg-6 d-flex align-items-center justify-content-start'>
                                <div className="col-lg-11">
                                    <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Start date</label>
                                    <br />
                                    <input 
                                        type='date'
                                        name='start_date'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.start_date}
                                        placeholder='Start date'
                                        className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                    />
                                    <ErrorMessage 
                                        name="start_date" 
                                        render={
                                            errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                            } 
                                    /> 
                                </div>                                
                            </div>
                            <div className='col-lg-6 d-flex align-items-center justify-content-end'>
                                <div className="col-lg-11">
                                    <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Due date</label>
                                    <br />
                                    <input 
                                        type='date'
                                        name='due_date'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.due_date}
                                        placeholder='Due date'
                                        className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                    />
                                    <ErrorMessage 
                                        name="due_date" 
                                        render={
                                            errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                            } 
                                    />  
                                </div>                               
                            </div>                                                        
                        </div>

                        <div className="mb-4">
                            <div className='w-100'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Reason</label>
                                <br />
                                <textarea 
                                    name='reason'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.reason}
                                    placeholder='Clearly state the reason for obtaining this loan.'
                                    style={{
                                        height: '40vh',
                                        outline: 'none',
                                        border: 'none'
                                    }}
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="reason" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={(!(isValid && dirty) || apiReqs.isLoading) ? true : false}
                            style={{
                                opacity: (!(isValid && dirty) || apiReqs.isLoading) ? 0.5 : 1
                            }}
                            className='bg-2947A9 p-3 text-center rounded-3 font-family-workSans fw-600 txt-FFF txt-15 w-100'
                        >
                            {
                                apiReqs.isLoading
                                ?
                                    <Spinner size="sm" variant="light" />
                                :
                                    'Add'
                            }
                        </button>                        
                    </div>
                )}
            </Formik>
        </div>
    )
}