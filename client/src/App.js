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
//import RegistrationForm from "./components/Home/registration";
import MyCoursesPage from "./components/myLearning/MyLearning"
// import Login from "./components/Login";
import StockChart from "./components/myLearning/Treadcanvas/Treadcanvas";
import DiscussionSection from "./components/discussion/discussion";
import LoginReg from "./components/loginReg/loginReg"
import PasswordUpdate from "./components/loginReg/PasswordUpdate";
// import CommentSection from "./components/discussion/discussion";

function App() {
  const [user, setUser] = useState(null);
 const [cookie,setCookie]=useState(null);
 /*
 useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser && storedUser!==undefined) {
      setUser(JSON.parse(storedUser));
    }
  }, [cookie]);
  */
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
  }

  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<HomeMain />} >
          <Route path="" element={<Home />} />
          <Route path="/dashboard" element={user && user._id ? <Dashboard data={user} handleLogin={handleData} handleLogout={handleLogout}/> : <LoginReg handleLogin={handleData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses data={user} />} />
          <Route path="/Mylearning" element={<MyCoursesPage />} />
          <Route path="/course1" element={<Course1 data={user} />} />
          <Route path="/Discussion" element={<DiscussionSection />} />
          {/* <Route path="/reg" element={<RegistrationForm handleLogin={handleData} />} /> */}
          <Route path='/tread' element={<StockChart />} />
          <Route path="/course2" element={<Course2 data={user}/>}/>
          <Route path="/reg" element={<LoginReg handleLogin={handleData}/>}/>
          <Route path="/course3" element={<Course3 data={user}/>}/>
          <Route path="/updatePass" element={<PasswordUpdate/>}/>
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;