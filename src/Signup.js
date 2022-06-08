import React, { useEffect } from "react";
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {auth, db} from './shared/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUserFB } from "./redux/module/user";




const Signup = () => {
  const dispatch = useDispatch();
  
  

  const name_ref = React.useRef(null);
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pwc_ref = React.useRef(null);


  const isName = name_ref.current == null? '' : name_ref.current.value;
  const isId = id_ref.current == null? '' : id_ref.current.value;
  const isPw = pw_ref.current == null? '' : pw_ref.current.value;
  const isPwc = pwc_ref.current == null? '' : pwc_ref.current.value;

  // 아이디 비번 유효성 검사 기준
  const isValidName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  const isValidEmail = '@' && '.';
  const isValidPw = isPw.length >= 8;

  const addUser = async() => {
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    
    dispatch(addUserFB(
      {auth,
      name : name_ref.current.value,
      user_id: id_ref.current.value}
    ))
  
    }
  // 닉네임 / 아이디 / 비번이 일치할 경우에만 완료버튼 활성화
  const done =  isValidEmail && isValidPw && (isPw === isPwc) === true;


    const check = () => {
    // 닉네임 / 아이디 / 비번 형식이 틀릴 경우 경고창 띄움
    if(!isValidName.test(isName)){
      alert('닉네임은 한글/영문/숫자만 가능합니다')
    } else if (!isValidEmail.test(isId)){
      alert('아이디는 이메일 형식으로 입력해주세요')
    } else if(!isValidPw){
      alert('비밀번호는 8자리 이상으로 입력해주세요')
    } else if (isPw !== isPwc){
      alert('비밀번호와 비밀번호 확인란이 일치하지 않습니다')
    }
  }

  

  return(
      <SignupContainer>

      <h1>Sign up</h1>

      {/* 닉네임 */}
      
      <input required ref={name_ref} className="box" type="text"
      placeholder="한글 or 영문 or 숫자로 이루어진 이름">
      </input>
      

      {/* 아이디 */}
      <input required ref={id_ref} className="box" type="text"
      placeholder="이메일 형식의 아이디">
      </input>
      
      {/* 비밀번호 */}
      <input required ref={pw_ref} className="box" type="password"
      placeholder="8자리 이상의 비밀번호">
      </input>

      {/* 비밀번호 확인 */}
      <input required ref={pwc_ref} className="box" type="password"
      placeholder="비밀번호 확인">
      </input>
      
      <button type="button"
      className={ done ? 'active' : 'inactive'}
      onClick={ addUser }
      >Signup</button>
      
     
    </SignupContainer>
  )
}

const SignupContainer = styled.div`
  ${({ theme }) => {
    const { fontSizes, device, colors } = theme;
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
      .active {
        border:1px solid #ccc;
        border-radius: 3px;
        width: 280px;
        height: 5vh;
        min-height: 50px;
        padding: 0 2vw;
        margin-top: 1vh;
        background: ${colors.blue}
        font-size: ${fontSizes.md}
      }
      .inactive {
        border:1px solid #ddd;
        border-radius: 3px;
        width: 200px;
        height: 3vh;
        min-height: 50px;
        padding: 0 2vw;
        margin-top: 1vh;
        background: #ddd;
        color:#fff;
        font-size: ${fontSizes.md}
      }

      ${device.tablet}{
        height: 100%;
      }
    `
  }}

`;

export default Signup;