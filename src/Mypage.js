import React from 'react';
import styled from 'styled-components';
import { auth } from "./shared/firebase";
import { getAuth } from "firebase/auth";

const Mypage = () => {

  
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user)

  return (
    <div>
      <div className='profileImg'></div>
      <div className='name'></div>
      <div className='id'></div>
    </div>

  )
}

export default Mypage;