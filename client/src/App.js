import "./App.css";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import HomeMain from "./HomeMain";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/About/About";
import Courses from "./components/Courses/Courses";
import Course1 from "./components/Courses/Course1";
import Course2 from "./components/Courses/Course2";
import Course3 from "./components/Courses/Course3";
import LoginReg from "./components/loginReg/loginReg"
//import PasswordUpdate from "./components/loginReg/PasswordUpdate"; earlier update password which was created
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Notes from "./components/Notes";
import PhysicalNotesRequest from "./components/PhysicalNotesRequest";
//import CommentSection from "./components/discussion/discussion";
import MyLearning from "./components/MyLearning";
import PlaylistPage from "./components/PlaylistPage";
import Reviews from "./components/Review/Reviews";
import PaymentSuccess from "./components/paymentSuccess";
import RecordedPage from "./components/Courses/RecordedPage";
function App() {
  const [user, setUser] = useState(null);
  const [cookie, setCookie] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser && storedUser !== undefined) {
      setUser(JSON.parse(storedUser));
    }
  }, [cookie]);

  useEffect(() => {
    // Check if user data is stored in cookies
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse only if storedUser is valid
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);

  const handleData = (data) => {
    Cookies.set('user', JSON.stringify(data), { expires: 7 });
    setUser(data);
    setCookie(data);
  }
  const handleLogout = () => {
    Cookies.remove('user');
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<HomeMain />} >
          <Route path="" element={<Home />} />
          <Route path="/dashboard" element={user && user._id ? <Dashboard data={user} handleLogin={handleData} handleLogout={handleLogout} /> : <LoginReg handleLogin={handleData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses data={user} />} />
          <Route path="/course1" element={<Course1 data={user} />} />
          {/*<Route path="/Discussion" element={<DiscussionSection />} />*/}
          {/*<Route path="/reg" element={<RegistrationForm handleLogin={handleData} />} /> */}

          <Route path="/course2" element={<Course2 data={user} />} />
          <Route path="/reg" element={<LoginReg handleLogin={handleData} />} />
          <Route path="/course3" element={<Course3 data={user} />} />
          { /*<Route path="/updatePassword" element={<PasswordUpdate/>}/>*/}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/*<Route path="/login" element={<Login />} /> */}
          <Route path="/notes" element={<Notes />} />
          <Route path="/physical-notes" element={<Notes />} />
          <Route path="/request-physical-notes" element={<PhysicalNotesRequest />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/playlist/mylearning" element={<MyLearning />} />
          <Route path="/reviews" element={<Reviews />}></Route>
         <Route path="/paymentSuccess" element={<PaymentSuccess />}></Route>
         <Route path="/recorded" element={<RecordedPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
