import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home/Home";
import "./styles/css/style.css";
import "./styles/css/responsive.css";
import theme from "./styles/Theme";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import SignupWithEmail from "./Pages/SignupWithEmail/SignupWithEmail";
import SignupWithMobile from "./Pages/SignupWithMobile/SignupWithMobile";
import OtpVerification from "./Pages/OtpVerification/OtpVerification";
import Search from "./Pages/Search/Search";
import CategorySearch from "./Pages/CategorySearch/CategorySearch";
import SrcollTop from "./Components/SrcollTop";
import Artist from "./Pages/Artist/Artist";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Faq from "./Pages/FAQ/Faq";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ContactUs from "./Pages/ContactUs/ContactUs";
import EmailVerification from "./Pages/emailVerification/EmailVerification";
import Loader from "./Components/Common/Loader";
import { useAppSelector } from "./Redux/app/hooks";
import Password from "./Pages/Password/Password";
import SignupSuccess from "./Pages/signupSuccess/SignupSuccess";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Dashboard from "./Pages/Dashboard/Dashboard";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions/TermsConditions";
import SVGComponent from "./Components/Common/SVGComponent";
import { useEffect, useState } from "react";
import OldEmailChange from "./Pages/OldEmailChange/OldEmailChange";
import NewEmailChange from "./Pages/NewEmailChange/NewEmailChange";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Cart from "./Pages/Cart/Cart";
import CheckOut from "./Pages/CheckOut/CheckOut";
import SignupWithGoogle from "./Pages/signupWithGoogle/SignupWithGoogle";
import Careers from "./Pages/Careers/Careers";
import { LoginRoutes, ProtectedRoutes } from "./Routes/ProtectedRoutes";
import { ApiPost } from "./Api/Api";
import CircleSocial from "./Components/Common/circleSocial";
import ArtistExplore from "./Pages/ArtistExplore/ArtistExplore";
import Testimonial from "./Pages/Testimonial/Testimonial";
import AddressBook from "./Pages/AddressBook/AddressBook";
import AddAddress from "./Pages/AddAddress/AddAddress";
import PaymentHistory from "./Pages/PaymentHistory/PaymentHistory";
// import HeaderLogo from "./Components/Common/HeaderLogo";
import Payment from "./Components/Payment";

function App() {
  const loader = useAppSelector((state) => state.loader.value);
  const [svg, setSvg] = useState(true);
  const [key, setKey] = useState(0);
  const [seo, setSeo] = useState([]);
  const pathname = window.location.pathname;

  useEffect(() => {
    if (pathname === "/dev" || pathname === "/dev/") {
      setTimeout(() => {
        setSvg(false);
      }, 5680);
    } else {
      setSvg(false);
    }
    ApiPost("seo-management").then((res) => {
      setSeo(res?.data);
    });
  }, []);

  const handleClick = () => {
    setKey(key + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      {loader && <Loader />}
      {svg &&
        (pathname === "/dev" || pathname === "/dev/") && (
          <SVGComponent />
        )}
      {!svg && (
      <BrowserRouter basename={"/dev"}>
        {loader && <Loader />}
        <Header />
        <CircleSocial />
        <Routes>
          <Route path="/" element={<Home seo={seo?.home_seo} key={key} />} />

          <Route element={<LoginRoutes />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-with-email" element={<SignupWithEmail />} />
            <Route path="/signup-with-mobile" element={<SignupWithMobile />} />
            <Route path="/signup-with-google" element={<SignupWithGoogle />} />
          </Route>

          <Route
            path="/otp-verification/:code/:type"
            element={<OtpVerification />}
          />
          <Route path="/product-detail/:slug" element={<ProductDetails />} />
          <Route
            path="/search"
            element={<Search seo={seo?.search_seo} key={key} />}
          />
          <Route path="/category/:slug" element={<CategorySearch />} />
          <Route
            path="/artist-collection"
            element={<Artist seo={seo?.artist_seo} />}
          />
          <Route path="/artist/:slug" element={<ArtistExplore />} />
          <Route path="/faq" element={<Faq seo={seo?.faq_seo} key={key} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/contact-us"
            element={<ContactUs seo={seo?.contact_seo} key={key} />}
          />
          <Route
            path="/testimonial"
            element={<Testimonial seo={seo?.testimonial_seo} key={key} />}
          />
          <Route
            path="/email-verification/:id"
            element={<EmailVerification />}
          />
          <Route path="/password" element={<Password />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route
            path="/reset-password/:otp/:email"
            element={<ResetPassword />}
          />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy seo={seo?.privacy_policy_seo} key={key} />}
          />
          <Route
            path="/about-us"
            element={<AboutUs seo={seo?.au_seo} key={key} />}
          />
          <Route path="/old-email-change/:code" element={<OldEmailChange />} />
          <Route path="/new-email-change/:code" element={<NewEmailChange />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsConditions seo={seo?.tc_seo} key={key} />}
          />
          <Route
            path="/career"
            element={<Careers seo={seo?.c_seo} key={key} />}
          />
          <Route path="/cart" element={<Cart />} />


            <Route element={<ProtectedRoutes />}>
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order-details/:id" element={<OrderDetails />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/address-book" element={<AddressBook />} />
              <Route
                key="add-address"
                path="/add-address"
                element={<AddAddress />}
              />
              <Route
                key="edit-address"
                path="/edit-address/:id"
                element={<AddAddress />}
              />
            </Route>
          </Routes>
          <Footer onPageClick={handleClick} />
          <SrcollTop />
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}
export default App;
