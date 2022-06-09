import React, { useEffect } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from './shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUserFB } from "./redux/module/user";




const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [id, setId] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pwc, setPwc] = React.useState("");

  
  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  
    return _reg.test(email);
  };


  // // 아이디 비번 유효성 검사 기준
  // const isValidName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  // const isValidEmail = '@' && '.';
  // const isValidPw = isPw.length >= 8;

  const addUser = async() => {

    if(pw !== pwc){
      window.alert('비밀번호가 일치하지 않습니다.');
    }
    if (!emailCheck){
      window.alert('이메일 형식이 맞지 않습니다.');
    }
    if (pw.length <8 ){
      window.alert('비밀번호는 8자리 이상이어야합니다.')
    }


    const user = await createUserWithEmailAndPassword(
      auth,
      id,
      pw
    );
    
    dispatch(addUserFB({
      name : user_name,
      user_id: id
    }))
    
    window.alert('회원가입이 완료되었습니다!')

    navigate(`/`)

    // console.log(auth, id, pw)
  }

 


  

  return(
      <SignupContainer>

      <h1>Sign up</h1>

      {/* 닉네임 */}
      
      <input value={user_name} className="box" type="text"
      onChange={(e)=>{
        setUserName(e.target.value)
      }}
      placeholder="한글 or 영문 or 숫자로 이루어진 이름">
      </input>
      

      {/* 아이디 */}
      <input value={id} className="box" type="text"
      onChange={(e)=>{
        setId(e.target.value)
      }}
      placeholder="이메일 형식의 아이디">
      </input>
      
      {/* 비밀번호 */}
      <input value={pw} className="box" type="password"
      onChange={(e)=>{
        setPw(e.target.value)
      }}
      placeholder="8자리 이상의 비밀번호">
      </input>

      {/* 비밀번호 확인 */}
      <input value={pwc} className="box" type="password"
      onChange={(e)=>{
        setPwc(e.target.value)
      }}
      placeholder="비밀번호 확인">
      </input>
      
      <button type="button"
      className={
        id === '' || user_name === '' || pw === '' || pwc === '' ? 'inactive' : 'active' }
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
        font-size: ${fontSizes.md};
      }
      .active {
        border:1px solid #ccc;
        border-radius: 5px;
        width: 280px;
        height: 5vh;
        min-height: 50px;
        padding: 0 2vw;
        margin-top: 1vh;
        background: ${colors.blue};
        font-size: ${fontSizes.md};
        color: #fff;
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
        font-size: ${fontSizes.md};
      }

      ${device.tablet}{
        height: 100%;
      }
    `
  }}

`;

export default Signup;