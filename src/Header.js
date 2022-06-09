import React from "react";
import styled, {css} from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { auth } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// 아이콘
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CreateIcon from '@mui/icons-material/Create';



const Header = (props) => {
  let date = new Date().toString().slice(0,21).split(' ').join('')
  const userList = useSelector((state)=> state.user.list)
  const navigate = useNavigate();
  
  // 로그인
  const [is_login, setIsLogin] = React.useState(false);
  const [ email, setEmail ] = React.useState(null);

  const loginCheck = async (user) => {
    if (user){
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setEmail(user.email)
    
  };

  React.useEffect(()=> {
    onAuthStateChanged(auth, loginCheck);
  },[])

  // 로그아웃
  const logout = () => {
    signOut(auth).then(()=>{
      setIsLogin(false);
      navigate(`/`)
    });
  };

  // 현재 로그인된 유저의 이름/아이디
  const user_name = userList && userList.filter((v,i)=>
    v.user_id === email
  )
  

  return (
    <div>
      <HeaderContainer>
      <Link to="/">
          <Title>Instagram</Title>
      </Link>    
          <Menu>
            {/* 회원가입 버튼 */}
            {is_login ? '' : <Link to='./signup'><div className="signup">Signup</div></Link>}
            {/* 로그인 / 로그아웃 버튼 */}
            {is_login ? <Link to='/'><div onClick={logout}>Logout</div></Link> : <Link to='./login'><div>Login</div></Link>}
            
            {/* 게시글 작성 버튼 */}
            {is_login ? <Link to='/post'><CreateIcon style={{marginLeft: '1.8vw'}}/></Link> : ''}
            {/* 마이페이지 버튼 */}
            {is_login ? <Link to ='/mypage'><PersonIcon style={{marginLeft: '1.5vw'}}/></Link> : ''}
            {/* 알림 버튼 */}
            {is_login ? <NotificationsActiveIcon style={{marginLeft: '1.5vw'}}/> : ''}

          </Menu>

      </HeaderContainer>

    </div>
  )
}

const HeaderContainer = styled.div`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      position: fixed;
      top:0;
      left:0;
      z-index:0;
      display:flex;
      align-items: center;
      width:100%;
      height: 50px;
      background-color: ${colors.white};
      border-bottom: 2px solid ${colors.black};

      ${device.tablet}{
        height: 60px;
      }
    `
  }}
`;

const Title = styled.h1`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      color: ${colors.black};
      font-size: ${fontSizes.lg};
      font-weight: 600;
      position:absolute;
      left: 7vw;

      ${device.tablet}{
        font-size: ${fontSizes.xl}
      }
    `
  }}
`

const Menu = styled.div`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      color: ${colors.black};
      font-size: ${fontSizes.md};
      position:absolute;
      display:flex;
      align-items:center;
      top: 2vh;
      right:7vw;
      .signup{
        margin-right:20px;
      }
      
      ${device.tablet}{
        font-size: ${fontSizes.md}
      }
    `
  }}
`;

export default Header;