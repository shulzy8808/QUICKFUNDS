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

export default function Login({ setAlertModal, setCompanyDetails, siteSecured }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToRegister = () => navigateTo('/register')
    const goToForgotPassword = () => navigateTo('/forgot-password')
 
    const schema = yup.object().shape({
        email: yup.string().required('Email address required'),
        password: yup.string().required('Password is required')
    })

    const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

    useEffect(() => {
        if(apiReqs.isLoading && apiReqs.data){
            const { data } = apiReqs

            onRequestApi({ 
                requestInfo: data,
                successCallBack: loginSuccessful,
                failureCallback: loginFailure
            })
        }
    }, [apiReqs])

    const loginSuccessful = ({ result }) => {
        try {
            const { data } = result
            const { companyDetails, accessToken, customers } = data
            const { company_id } = companyDetails

            localStorage.setItem('company_id', company_id)
            localStorage.setItem('accessToken', accessToken)
    
            setApiReqs({ isLoading: false, data: null, errorMsg: null })

            return setCompanyDetails({
                details: companyDetails,
                accessToken,
                customers,
                newRoute: '/'
            })


        } catch (error) {
            console.log(error)
            return loginFailure({ errorMsg: null })
        }
    }

    const loginFailure = ({ errorMsg }) => {
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

                <Formik

                    validationSchema={schema}

                    initialValues={{
                        email: '', password: ''
                    }}

                    onSubmit={values => {
                        setApiReqs({ 
                            isLoading: true,
                            errorMsg: null,
                            data: {
                                url: '/companies/login',
                                method: 'post',
                                data: { ...values, siteSecured }
                            }
                        })
                    }} 
                >
                    {({ values, handleBlur, handleChange, handleSubmit, dirty, isValid }) => (
                        <div>
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
                                <p onClick={goToForgotPassword} className='clickable text-lg-end text-md-center text-center m-0 my-2 p-0 txt-2947A9 font-family-workSans txt-15'>
                                    forgot password?
                                </p>
                                <ErrorMessage 
                                    name="password" 
                                    render={
                                        errorMsg => <CustomErrorMsg isCentered={false} errorMsg={errorMsg} />
                                        } 
                                />                                 
                            </div>  
                            <p className='txt-292E3D txt-13 text-center font-family-workSans fw-400 py-5'>
                                Don't have an account ? <span onClick={goToRegister} className='clickable txt-2947A9 fw-600 txt-15'>Sign Up</span>
                            </p>  
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
                                        'Login'
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