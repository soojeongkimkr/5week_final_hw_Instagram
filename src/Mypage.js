import React from 'react';
import styled, {css} from 'styled-components';
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const Mypage = () => {
  const userList = useSelector((state)=> state.user.list)

  
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log(user.email)

  const user_name = userList && userList.filter((v,i)=>
  v.user_id === (user !== null ? user.email : '')
)


  return (
    <MypageContainer>
      <div className='profileImg'></div>
      <div className='name'>{user_name[0].name}</div>
      <div className='id'>{user !== null ? user.email : ''}</div>
    </MypageContainer>

  )
}



const MypageContainer = styled.div`
  ${({ theme }) => {
    const { fontSizes, device, colors } = theme;
    return css`
      margin-top: 8em;
      margin-left: 1em;
      width:100%;
      height: 100%;
      .name{
        font-size:${fontSizes.xl};
        margin-bottom:1em;
      }
      

      ${device.tablet}{
        height: 100%;
      }
    `
  }}

`;

export default Mypage;