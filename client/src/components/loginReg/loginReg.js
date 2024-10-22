import React, { useState, useEffect } from "react";
import * as Components from './Components.js';
import { useNavigate, useSearchParams} from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function LoginReg({ handleLogin }) {
    const [searchParams] = useSearchParams();
    const [signIn, toggle] = React.useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    const course = searchParams.get('course');
    const [refer, setRefer] = useState();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const storedRefer = localStorage.getItem('refer');
        if (storedRefer) {
            setRefer(storedRefer);
        }
    }, []);
    useEffect(() => {
        if (refer === "null") {
            setRefer("")
        }
    },[])
    useEffect(()=>{
        console.log(email);
    },[email])
    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("running");
        const user = {
            "email": email,
            "password": password
        }
        console.log(user.email);
        if (email && password) {
            console.log("running");
            try {
              //  const loginRes = await axios.post('https://testlt.onrender.com/login', user);
              const loginRes = await axios.post('http://localhost:5000/api/auth/login', user);  
              toast.success(loginRes.data.message);
                if (loginRes.data.user) {
                    const User = loginRes.data.user;
                    handleLogin(User);
                    setTimeout(() => {
                        
                    }, 4000);
                    let purpose;
                    // if (course) {
                    //     let amount;
                    //     if (course === "Future") {
                    //         amount = 2999;
                    //         purpose= "Future & Options"
                    //     }
                    //     if (course === "InstitutionFootprints") {
                    //         amount = 4999;
                    //         purpose= "Institution Footprints"
                    //     }
                    //     if (course === "Combined") {
                    //         amount = 6999;
                    //         purpose="Combined"
                            
                    //     }
                    //     const info = {
                    //         purpose: purpose,
                    //         amount: amount,
                    //         buyer_name: User.name,
                    //         email: User.email,
                    //         phone: User.phone,
                    //         redirect_url: `https://testlt.onrender.com/payment/callback?user_id=${User._id}`,
                    //         webhooks_url: '/webhook/'
                    //     };
                    //     try {
                    //         const paymentRes = await axios.post('https://testlt.onrender.com/payment', info);
                    //         console.log('payment_request', paymentRes.data);
                    //         window.location.href = paymentRes.data;
                    //     } catch (paymentError) {
                    //         console.error(paymentError);
                    //         toast.error("An error occurred during payment.");
                    //     }
                    // } else {
                    //     history('/dashboard');
                    // }
                    history('/dashboard');
                } else {
                    toast.error(loginRes.data.message);
                }
            } catch (loginError) {
                console.error(loginError);
                toast.error("An error occurred while logging in.");
            }
        } else {
            toast.error("Password or Email Is incorrect");
        }
        setLoading(false);
    }

    const register = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("hii");
        const user = {
            "name": name,
            "email": email,
            "phone": phone,
            "password": password,
            "referralCode": refer,
        }

        if (email.endsWith('gmail.com')) {
            if (name && email && password && phone) {
                try {
                   // const res = await axios.post('https://testlt.onrender.com/reg', user);
                   const res = await axios.post('http://localhost:5000/api/auth/register', user); 
                   if (res.data === 'User already exists') {
                        toast.error('User already exists');
                    } else {
                        toast.success(res.data);
                        const { email, password } = user;
                        if (email && password) {
                            try {
                                const loginRes = await axios.post('http://localhost:5000/api/auth/login', user);
                                toast.success(loginRes.data.message);
                                if (loginRes.data.user) {
                                    const User = loginRes.data.user;
                                    handleLogin(User);
                                    // if (course) {
                                    //     let amount;
                                    //     if (course === "Future") {
                                    //         amount = 2999;
                                    //     }
                                    //     if (course === "InstitutionFootprints") {
                                    //         amount = 4999;
                                    //     }
                                    //     if (course === "Combined") {
                                    //         amount = 6999;
                                    //     }
                                    //     const info = {
                                    //         purpose: course,
                                    //         amount: amount,
                                    //         buyer_name: user.name,
                                    //         email: user.email,
                                    //         phone: user.phone,
                                    //         redirect_url: `https://testlt.onrender.com/payment/callback?user_id=${User._id}`,
                                    //         webhooks_url: '/webhook/'
                                    //     };
                                    //     try {
                                    //         const paymentRes = await axios.post('https://testlt.onrender.com/payment', info);
                                    //         console.log('payment_request', paymentRes.data);
                                    //         window.location.href = paymentRes.data;
                                    //     } catch (paymentError) {
                                    //         console.error(paymentError);
                                    //         toast.error("An error occurred during payment.");
                                    //     }
                                    // }
                                    history('/dashboard');
                                } else {
                                    toast.error(loginRes.data.message);
                                }
                            } catch (loginError) {
                                console.error(loginError);
                                toast.error("An error occurred while logging in.");
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An error occurred while registering.");
                }
            }
        } else {
            toast.error('Only Gmail addresses are allowed');
        }

        setLoading(false);
    };
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] w-[100%] my-16">
            <ToastContainer className="sticky" />
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                        <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Components.Input type='phone' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Components.Input type='refer' placeholder='Referral' value={refer === "null" ? "" : refer} onChange={(e) => { setRefer(e.target.value.toUpperCase()) }} />
                        {loading ? ( // Conditionally render a loading screen
                            <Components.Button
                                onClick={console.log("wait")}
                            >
                                Loading ...

                            </Components.Button>
                        ) : (
                            <Components.Button
                                onClick={register}
                            >
                                Register

                            </Components.Button>)}
                            <Components.Button className="sm:hidden" onClick={()=>toggle(true)}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input type='email' placeholder='Email' value={email} onChange={(e) =>{ setEmail(e.target.value.toLowerCase())}} />
                        <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
                        
                        {loading ? ( // Conditionally render a loading screen
                            <Components.Button
                                onClick={console.log("wait")}
                            >
                                Loading ...

                            </Components.Button>
                        ) : (
                            <Components.Button
                                onClick={login}
                            >
                                Sign In

                            </Components.Button>)}
                            <Components.Button className="sm:hidden" onClick={()=>toggle(false)}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>
        </div>
    )
}

export default LoginReg;