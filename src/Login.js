import React from "react";
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {auth, db} from './shared/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {getDocs, where, query, collection} from 'firebase/firestore';

import Button from '@mui/material/Button';

const Login = () => {

  const id_ref = React.useRef();
  const pw_ref = React.useRef();

  const loginFB = async() => {
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
  }


  return(
    <LoginContainer>

      <h1>Login</h1>

      {/* 아이디 */}
      <input ref={id_ref} className="box" type="text" placeholder="Id"></input>
        
      {/* 비밀번호 */}
      <input ref={pw_ref} className="box" type="text" placeholder="Password"></input>
      <Link to ='/'><Button onClick={loginFB} variant="contained" style={{marginTop:'1.5em'}}>Login</Button></Link>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  ${({ theme }) => {
    const { fontSizes, device } = theme;
    return css`
      display:flex;
      flex-direction:column;
      align-items: center;
      margin-top: 20vh;
      width:100%;
      height: 100%;
      h1{
        font-size: ${fontSizes.xl};
        margin-bottom: 1.5em;
      }
      .box {
        border:1px solid #ccc;
        border-radius: 3px;
        width: 280px;
        height: 5vh;
        min-height: 50px;
        padding: 0 2vw;
        margin-bottom: 1vw;
        font-size: ${fontSizes.md}
      }

      ${device.tablet}{
        height: 100%;
      }
    `
  }}

`;

export default Login;