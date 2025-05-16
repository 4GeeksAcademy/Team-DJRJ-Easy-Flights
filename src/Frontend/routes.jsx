// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Login from "./pages/Login/Login.jsx";
import SignupCompany from "./pages/Signup/SignupCompany.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { AddOffers } from "./pages/Offers/AddOffers.jsx";
import { OffersDetails } from "./pages/Offers/OffersDetails.jsx";


import TravelTips from "./pages/TravelTips/TravelTips.jsx";
import Destinations from "./pages/Feeatures/Destinations.jsx";
import Packages from "./pages/Feeatures/Packages.jsx";
import Tools from "./pages/Feeatures/Tools.jsx";
import AboutUs from "./pages/QuickLinks/AboutUs.jsx";
import TermsofService from "./pages/Policy/TermsofService.jsx";
import PrivacyPolicy from "./pages/Policy/PolicyInfo.jsx";
import CookiesPolicy from "./pages/Policy/UserConsent.jsx";
import {OffersList } from "./pages/Offers/OffersList.jsx";
import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import BillPage from "./pages/PaymentPage/BillPage.jsx";
import AboutUser from "./pages/AboutUser/AboutUser.jsx";
import ForgetPass from "./pages/ForgetPass/ForgetPass.jsx";
import FAQS from "./pages/QuickLinks/Faqs.jsx";
import SupportCenter from "./pages/QuickLinks/SupportCenter.jsx";
import Instagram from "./pages/FollowUs/Instagram.jsx";
import Facebook from "./pages/FollowUs/Facebook.jsx";
import TravelQuiz from "./pages/Feeatures/TravelQuiz.jsx";
import Comments from "./components/Comments/Comments.jsx";
import OffersAPI from "./pages/Offers/OffersAPI/OffersAPI.jsx";
import PaymentApi from "./pages/Offers/OffersAPI/PaymentApi.jsx";
import BillAPI from "./pages/Offers/OffersAPI/BillApi.jsx";
import Discover from "./components/Discover/Discover.jsx";
import Donate from "./pages/QuickLinks/donate/Donate.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupCompany" element={<SignupCompany />} />
        <Route path="/travel-tips" element={<TravelTips />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="packages" element={<Packages />} />
        <Route path="/quiz" element={<TravelQuiz />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/addoffer" element={<AddOffers/>} />
        <Route path="/offerdetails/:id" element={<OffersDetails/>}/>
        <Route path="/offerdetails/:id/pago" element={<PaymentPage />} /> 
        <Route path="/offers" element={<OffersAPI />} />
        <Route path="offers/:id/payment" element={<PaymentApi />} />
        <Route path="/offers/:id/payment" element={<BillAPI />} />
        <Route path="/comments/:id1" element={<Comments/>}/>
        <Route path="/offerslist" element={<OffersList/>}/>
        <Route path="/bill/:id/:paymentId" element={<BillPage />} />       
        <Route path="/terms-of-service" element={<TermsofService />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-user/:userId" element={<AboutUser />} />
        <Route path="/faqs" element={<FAQS />} />
        <Route path="/support" element={<SupportCenter />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/forgotPass" element={<ForgetPass />} />
        <Route path="/discover" element={<Discover />} />
         <Route path="/donate" element={<Donate />} />

      </Route>
    ),
    {
      future: {
          v7_startTransition: true,
      },
    }  
);