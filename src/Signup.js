import React from "react";
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {auth, db} from './shared/firebase';
import {collection, addDoc, getDoc, doc} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import Button from '@mui/material/Button';


const Signup = () => {

  const name_ref = React.useRef(null);
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pwc_ref = React.useRef(null);

  //아이디 비번 만들기
  const signupFB = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
  
  const user_data = await addDoc(collection(db, 'users'),{
    user_id: user.user.email,
    name: name_ref.current?.value
  })
  console.log(user_data.id)
}

 // 아이디 비번 유효성 검사
 const [is_avail, setIs_avail] = React.useState();

//  const is_passed = () => {
//     name_ref
//  }
  
 

  return(
      <SignupContainer>

      <h1>Sign up</h1>

      {/* 닉네임 */}
      
      <input required ref={name_ref} className="box" type="text" placeholder="Nickname">
      </input>
      

      {/* 아이디 */}
      <input required ref={id_ref} className="box" type="text" placeholder="Id">

      </input>
      
      {/* 비밀번호 */}
      <input required ref={pw_ref} className="box"
      type="password"
      placeholder="Password">

      </input>

      {/* 비밀번호 확인 */}
      <input required ref={pwc_ref} className="box"
      type="password"
      placeholder="Password check">

      </input>
      <Link to ='/login'>
      <Button variant="contained" type="submit"
      onClick={signupFB}
      style={{marginTop:'1.5em'}}>Sign up</Button>
      </Link>
      

    </SignupContainer>
  )
}

const SignupContainer = styled.div`
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
        margin-bottom: 1vh;
        font-size: ${fontSizes.md}
      }

      ${device.tablet}{
        height: 100%;
      }
    `
  }}

`;

export default Signup;