import { ErrorMessage, Formik } from 'formik'
import CustomSvg1 from '../customSvgs/CustomSvg1'
import './css/auth.css'
import CustomErrorMsg from '../customErrorMsg/CustomErrorMsg'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { onRequestApi } from '../apiRequests/requestApi'
import Loading1 from '../Loading/Loading1'

export default function ForgotPassword({ setAlertModal, setCompanyDetails, siteSecured }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToRegister = () => navigateTo('/register')
    const goToLogin = () => navigateTo('/login')
 
    const schema = yup.object().shape({
        newPassword: yup.string().required('Password is required'),
        answer: yup.string().required('Answer is required')
    })

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
    const [securityQuestion, setSecurityQuestion] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        if(apiReqs.isLoading && apiReqs.data){
            const { data } = apiReqs
            const { requestInfo, successCallBack, failureCallback } = data

            onRequestApi({ 
                requestInfo,
                successCallBack,
                failureCallback
            })
        }
    }, [apiReqs])

    const handleEmailChange = (e) => setEmail(e.target.value)
    
    const fetchSecurityInfo = () => {
        return setApiReqs({
            isLoading: true,
            errorMsg: null,
            data: {
                requestInfo: {
                    url: '/companies/get-security-info',
                    method: 'post',
                    data: { email }
                }, 
                successCallBack: securityInfoFetchSuccess,
                failureCallback: securityInfoFetchFailure
            }
        })
    }

    const securityInfoFetchSuccess = ({ result }) => {
        try {
            const { data } = result
            const { security_question } = data
            setSecurityQuestion(security_question)
            setApiReqs({ isLoading: false, data: null, errorMsg: null })

        } catch (error) {
            securityInfoFetchFailure({ errorMsg: 'Something went wrong! Try again '})
        }
    }

    const securityInfoFetchFailure = ({ errorMsg }) => {
        setAlertModal({ msg: errorMsg, type: 'error' })
        setApiReqs({ isLoading: false, data: null, errorMsg })
    }

    const resetPasswordSuccessful = ({ result }) => {
        try {
            setAlertModal({ msg: 'Password reset successful', type: 'success' })
            goToLogin()

        } catch (error) {
            console.log(error)
            return resetPasswordFailed({ errorMsg: null })
        }
    }

    const resetPasswordFailed = ({ errorMsg }) => {
        const errMsg = errorMsg || 'Something went wrong! Try again later!'

        setApiReqs({ isLoading: false, data: null, errorMsg: errMsg })

        if(setAlertModal){
            setAlertModal({ msg: errMsg, type: 'error' })
        }

        return;
    }

    return (
        <div 
            style={{
                minHeight: '100vh'
            }}
            className="d-flex align-items-stretch justify-content-between bg-F6F8F7 h-100"
        >
            {
                apiReqs.isLoading 
                &&
                    <Loading1 />
            }

            <div className="col-lg-6 col-md-12 col-12 p-5">
                <div className='d-flex align-items-center justify-content-center mb-5'>
                    <div className="d-flex align-items-center">
                        <CustomSvg1 name="logo" />
                        <h1 className="m-0 p-0 font-family-workSans txt-20 mx-2 fw-700 txt-2947A9">
                            <span className="fst-italic">Quick</span>Funds
                        </h1>
                    </div>
                </div>

                {
                    apiReqs.errorMsg
                    &&
                        <CustomErrorMsg errorMsg={apiReqs.errorMsg} isCentered={true} />
                }

                {
                    !securityQuestion 
                    ?
                        <div>
                            <div className='w-100 mb-4'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Email address</label>
                                <br />
                                <input 
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder='my-email@example.com'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />                                
                            </div>
                            <button
                                disabled={(!(email) || apiReqs.isLoading) ? true : false}
                                onClick={fetchSecurityInfo}
                                style={{
                                    opacity: (!(email) || apiReqs.isLoading) ? 0.5 : 1
                                }}
                                className='bg-2947A9 p-3 text-center rounded-3 font-family-workSans fw-600 txt-FFF txt-15 w-100'
                            >
                                {
                                    apiReqs.isLoading
                                    ?
                                        <Spinner size='md' variant='light' />
                                    :
                                        'Submit email'
                                }
                            </button>                             
                        </div>
                    :
                        <Formik

                            validationSchema={schema}

                            initialValues={{
                                newPassword: '', answer: ''
                            }}

                            onSubmit={values => {
                                setApiReqs({ 
                                    isLoading: true,
                                    errorMsg: null,
                                    data: {
                                        requestInfo: {
                                            url: '/companies/reset-password',
                                            method: 'post',
                                            data: { ...values, siteSecured, email, security_question: securityQuestion }
                                        },
                                        successCallBack: resetPasswordSuccessful,
                                        failureCallback: resetPasswordFailed
                                    }
                                })
                            }} 
                        >
                            {({ values, handleBlur, handleChange, handleSubmit, dirty, isValid }) => (
                                <div> 
                                    <div className='w-100 mb-4'>
                                        <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>New password</label>
                                        <br />
                                        <input 
                                            type='password'
                                            name='newPassword'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.newPassword}
                                            placeholder='**********'
                                            className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                        />
                                        <ErrorMessage 
                                            name="newPassword" 
                                            render={
                                                errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                                } 
                                        />                                 
                                    </div>  
                                    <div className='w-100 mb-4'>
                                        <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Provide the answer to the security question: {securityQuestion}</label>
                                        <br />
                                        <input 
                                            type='text'
                                            name='answer'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.answer}
                                            placeholder='**********'
                                            className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                        />
                                        <ErrorMessage 
                                            name="answer" 
                                            render={
                                                errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                                } 
                                        />                                 
                                    </div>                                
                                    <button
                                        disabled={(!(isValid && dirty) || apiReqs.isLoading) ? true : false}
                                        onClick={handleSubmit}
                                        style={{
                                            opacity: (!(isValid && dirty) || apiReqs.isLoading) ? 0.5 : 1
                                        }}
                                        className='bg-2947A9 p-3 text-center rounded-3 font-family-workSans fw-600 txt-FFF txt-15 w-100'
                                    >
                                        {
                                            apiReqs.isLoading
                                            ?
                                                <Spinner size='md' variant='light' />
                                            :
                                                'Reset password'
                                        }
                                    </button>                                                    
                                </div>
                            )}
                        </Formik>
                    }
            </div>

            <div className="col-lg-6 auth-bg-img bg-img" />
        </div>
    )
}