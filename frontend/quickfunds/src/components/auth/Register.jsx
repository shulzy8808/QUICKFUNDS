import { ErrorMessage, Formik } from 'formik'
import CustomSvg1 from '../customSvgs/CustomSvg1'
import './css/auth.css'
import CustomErrorMsg from '../customErrorMsg/CustomErrorMsg'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onRequestApi } from '../apiRequests/requestApi'
import Loading1 from '../Loading/Loading1'
import { Spinner } from 'react-bootstrap'

export default function Register({ setAlertModal, siteSecured }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToLogin = () => navigateTo('/login')

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    const schema = yup.object().shape({
        company_name: yup.string().max(40, "Cannot be more than 40 characters").required('Company name is required'),
        email: yup.string().email('Must be a valid email address').required('Email address required'),
        password: yup.string().required('Password is required'),
        security_question: yup.string(),
        answer: yup.string()
    })

    useEffect(() => {
        if(apiReqs.data && apiReqs.isLoading){
            const { data } = apiReqs

            onRequestApi({
                requestInfo: data,
                successCallBack: registerSuccess,
                failureCallback: registerFailure
            })
        }
    }, [apiReqs])

    const registerSuccess = () => {
        setApiReqs({ isLoading: false, data: null, errorMsg: null })

        if(setAlertModal){
            setAlertModal({ msg: 'Registration successful. Login to access your account', type: 'success' })
        }

        return goToLogin()
    }

    const registerFailure = ({ errorMsg }) => {
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
            className="d-flex align-items-stretch justify-content-between bg-F6F8F7"
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

                <Formik
                    validationSchema={schema}

                    initialValues={{
                        email: '', password: '', company_name: '', security_question: '', answer: ''
                    }}

                    onSubmit={values => {
                        return setApiReqs({
                            isLoading: true,
                            errorMsg: null,
                            data: {
                                url: '/companies/register',
                                method: 'post',
                                data: { ...values, siteSecured }
                            }
                        })
                    }} 
                >
                    {({ values, handleBlur, handleChange, handleSubmit, dirty, isValid }) => (
                        <div>
                            <div className='w-100 mb-4'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Company Name</label>
                                <br />
                                <input 
                                    type='text'
                                    name='company_name'
                                    value={values.company_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='company-name'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="company_name" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div>                            
                            <div className='w-100 mb-4'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Email address</label>
                                <br />
                                <input 
                                    type='email'
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='my-email@example.com'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="email" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div> 
                            <div className='w-100 mb-4'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Password</label>
                                <br />
                                <input 
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder='**********'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="password" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div> 
                            <div className='w-100 mb-4'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Security question</label>
                                <br />
                                <input
                                    name='security_question'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.security_question}
                                    placeholder='Set your recovery security question'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="security_question" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div> 
                            <div className='w-100 mb-4'>
                                <label className='mb-2 txt-292E3D fw-500 font-family-workSans txt-15'>Answer</label>
                                <br />
                                <input 
                                    name='answer'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.answer}
                                    placeholder='Set your recovery security answer'
                                    className='p-3 rounded-3 bg-FFF w-100 txt-292E3D font-family-workSans fw-600'
                                />
                                <ErrorMessage 
                                    name="answer" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div>                                                                                     
                            <p className='txt-292E3D txt-13 text-center font-family-workSans fw-400 py-5'>
                                Already have an account ? <span onClick={goToLogin} className='clickable txt-2947A9 fw-600 txt-15'>Login</span>
                            </p>  
                            <button
                                disabled={(!(isValid && dirty) || apiReqs.isLoading) ? true : false}
                                style={{
                                    opacity: (!(isValid && dirty) || apiReqs.isLoading) ? 0.5 : 1
                                }}
                                onClick={handleSubmit}
                                className='bg-2947A9 p-3 text-center rounded-3 font-family-workSans fw-600 txt-FFF txt-15 w-100'
                            >
                                {
                                    apiReqs.isLoading
                                    ?
                                        <Spinner size='sm' variant='light' />
                                    :
                                        'Register'
                                }
                            </button>                                                    
                        </div>
                    )}
                </Formik>
            </div>

            <div className="col-lg-6 auth-bg-img bg-img" />
        </div>
    )
}