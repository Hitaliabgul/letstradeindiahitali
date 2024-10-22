import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import image from "./png.png"
const Login = ({handleLogin}) => {
  let history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const login = () => {
    const { email, password } = user;
    if (email && password) {
      axios.post('https://testlt.onrender.com/login', user)
        .then(res => {
          console.log(res.data)
          toast.success(res.data.message);
          if(res.data.user){
          const User=res.data.user;
          handleLogin(User);
          console.log(res.data.user);
          history("/")}
          else{
            toast.success(res.data.message)
          }
        }
        )
    }
  }
  const imageStyles = {
    backgroundImage: "url(http://localhost:3000/Images/bgimage.png)",
    height: "100vh",
    backgroundSize: "cover",

    backgroundRepeat: "no-repeat",
  };


  return (
    <>
      <div style={imageStyles}>
        <div className="relative inline-flex w-full justify-evenly ">
          <div className=" flex flex-col justify-center space-y-4">
            <div className="py-4">
              <div className=" flex flex-col justify-center items-center">
                <div className="title max-sm:text-lg">LET’S TRADE INDIA LOGIN</div>
              </div>

              {/* body */}
              <div className="flex justify-around">
                <div className="container flex px-10 pl-10 max-sm:hidden">
                  <img
                    src={image}
                    className="box2 rounded-2xl w-5/6"
                    alt="ddd"
                  />
                </div>

                {/* login card */}
                <div className="loginbox w-[40rem] max-sm:w-[90%]">
                  <div className="field w-[100%]">
                    <form className="flex flex-col">
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="items-center text-black-800 w-[100%] p-2 m-4 focus:border-[#1E2A55] rounded-xl max-sm:ml-0"
                      />
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="text-black-800 w-[100%] p-2 m-4 focus:border-[#1E2A55] rounded-xl max-sm:ml-0"
                      />
                      <div className="px-5 p-2 ml-4 m-4 w-fit bg-[#2F8433] text-white hover:bg-[#1E2A55] rounded-xl max-sm:ml-0" onClick={login}>
                        Login
                      </div>
                      <div>or</div>
                      <div className="px-5 p-2 ml-4 m-4 w-fit  bg-[#2F8433] text-white hover:bg-[#1E2A55] rounded-xl max-sm:ml-0" onClick={() => history('/reg')}>
                        Register
                      </div>
                      <div className="p-2 ml-4 text-[#327E36] font-medium">New User?</div>
                      <div className="p-2 ml-4">Forgot Password?</div>
                    </form>
                  </div>
                </div>
                {/* login card */}
              </div>
              {/* body */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;