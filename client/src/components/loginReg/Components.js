import styled from 'styled-components';

export const Container = styled.div`
padding:20px;
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 678px;
max-width: 100%;
min-height: 550px;
@media (max-width: 768px) {
  border-radius: 0px;
}
`;

export const SignUpContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 right: 60%;
 width: 60%;
 @media (max-width: 500px) {
  width: 100%;
  right:100%;
}
 opacity: 0;
 z-index: 1;
 ${props => props.signinIn !== true ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 `
    : null}
`;


export const SignInContainer = styled.div`
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 60%;
z-index: 2;
@media (max-width: 500px) {
  width: 100%;
}
${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 3rem;
height: 100%;
@media (max-width: 768px) {
  padding: 0;
  font-size: 16px;
    margin:19px;
};
text-align: center;
`;

export const Title = styled.h1`
font-weight: bold;
font-size:25px;
margin: 0;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
`;


export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #1E2A55;
   background-color: #1E2A55;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   margin-top:12px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
letter-spacing: 1px;
margin: 15px 0;
`;
export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 60%;
width: 40%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
@media (max-width: 500px) {
  width: 0;
  display: none;
  left:100%;
}
z-index: 100;
${props =>
    props.signinIn !== true ? `transform: translateX(-100%); left:40%;` : null}
`;

export const Overlay = styled.div`

background: #000428;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;