import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from './components/landingPage/LandingPage'
import Login from './components/auth/Login'
import ScrollToTop from './components/scroll/ScrollToTop'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import { useEffect, useState } from 'react'
import CustomAlert1 from './components/CustomAlerts/CustomAlert1'
import Loading1 from './components/Loading/Loading1'
import { onRequestApi } from './components/apiRequests/requestApi'
import FloatingBtn from './components/floatingBtn/FloatingBtn'
import ForgotPassword from './components/auth/ForgotPassword'

function App() {

  const navigate = useNavigate()
  const navigateTo = (path) => navigate(path)  
  const goToLandingPage = () => navigateTo('/landing-page')

  const [companyDetails, setCompanyDetails] = useState({ details: {} })
  const [alertModal, setAlertModal] = useState()
  const [apiReqs, setApiReqs] = useState({ isLoading: true })
  const [siteSecured, setSiteSecured] = useState(false)

  const company_id = localStorage.getItem('company_id')
  const accessToken = localStorage.getItem('accessToken')

  const toggleSiteSecured = () => setSiteSecured(prev => !prev)

  useEffect(() => {
    if(apiReqs.isLoading){
      onRequestApi({
        requestInfo: {
          url: '/companies/get-single-company',
          method: 'post',
          data: { company_id: company_id, siteSecured },
          token: accessToken
        },
        successCallBack: initialFetchSuccess,
        failureCallback: initialFetchFailure
      })
    }
  }, [apiReqs])

  useEffect(() => {
    localStorage.clear()
    if(siteSecured){
      setCompanyDetails({ details: {}, refreshSite: true })
      setAlertModal({ msg: 'Site is secure', type: 'info' })
    
    } else{
      setCompanyDetails({ details: {} })
      setAlertModal({ msg: 'Site is insecure', type: 'error' })
    }
  }, [siteSecured])

  useEffect(() => {
    const { newRoute, refreshSite } = companyDetails

    if(newRoute){
      navigateTo(newRoute)
    }

    if(refreshSite){
      setApiReqs({ isLoading: true })
    }

  }, [companyDetails])

  const initialFetchSuccess = ({ result }) => {
    try {
      
      const { data } = result
      const { companyDetails, accessToken, customers } = data
      const { company_id } = companyDetails

      localStorage.setItem('company_id', company_id)
      localStorage.setItem('accessToken', accessToken)

      setCompanyDetails({
        details: companyDetails,
        accessToken,
        customers,
        newRoute: '/'
      })

      return setApiReqs({ isLoading: false })

    } catch (error) {
      console.log(error)
      return initialFetchFailure()
    }
  }

  const initialFetchFailure = () => {
    // const errMsg = 'Automatic login failed. Login manually'

    // setAlertModal({ msg: errMsg, type: 'error' })

    setApiReqs({ isLoading: false })

    goToLandingPage()

    return;
  }

  const logout = () => {
    localStorage.clear()
    setAlertModal({ msg: 'User logged out', type: 'info' })
    setCompanyDetails({ details: {} })
    return goToLandingPage()
  }

  return (
    <>
        <ScrollToTop />

        {
          apiReqs.isLoading
          &&
            <Loading1 />
        }

        <CustomAlert1 alertModal={alertModal} setAlertModal={setAlertModal} />

        <Routes>

          {/* LANDING PAGE  */}

          <Route 
            path='/landing-page'
            element={
              <LandingPage 
                setAlertModal={setAlertModal}
                companyDetails={companyDetails}
              />
            }
          />




          {/* AUTHENTICATION  */}

          <Route 
            path='/login'
            element={
              <Login 
                setAlertModal={setAlertModal}
                setCompanyDetails={setCompanyDetails}
                siteSecured={siteSecured}
              />
            }
          />

          <Route 
            path='/forgot-password'
            element={
              <ForgotPassword 
                setAlertModal={setAlertModal}
                setCompanyDetails={setCompanyDetails}
                siteSecured={siteSecured}
              />
            }
          />

          <Route 
            path='/register'
            element={
              <Register 
                setAlertModal={setAlertModal}
                siteSecured={siteSecured}
              />
            }
          />  




          {/* DASHBOARD  */}
          <Route 
            path='/*'
            element={
              <Dashboard 
                companyDetails={companyDetails}
                setCompanyDetails={setCompanyDetails}
                setAlertModal={setAlertModal}
                siteSecured={siteSecured}
                logout={logout}
              />
            }
          />

        </Routes>

        {/* {
          siteSecured
          ?
            <FloatingBtn
              icon="toggle-on"
              btnFunc={toggleSiteSecured}
              siteSecured={siteSecured}
            />
          :
            <FloatingBtn
              icon="toggle-off"
              btnFunc={toggleSiteSecured}
              siteSecured={siteSecured}
            />                    
        } */}

    </>
  )
}

export default App
