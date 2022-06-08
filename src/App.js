import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route } from 'react-router-dom';

// 컴포넌트
import Header from './Header';
import Home from './Home'
import Signup from "./Signup";
import Login from "./Login";
import Mypage from "./Mypage";
import Write from "./Write";

// 스타일
import GlobalStyles from "./GlobalStyles";
import theme from './theme';

// 리덕스
import {useDispatch} from "react-redux";
import {loadPostFB} from "./redux/module/home";
import {loadUserFB} from "./redux/module/user"

function App() {

  const dispatch = useDispatch()

    React.useEffect(()=> {
      dispatch(loadUserFB());
    }, [])


  return (
    <ThemeProvider theme = {theme}>
      <div className="App">
        <GlobalStyles/>
          <Header/>
          <Container>
            <Routes>
              <Route path='/' element={<Home/>} exact></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/mypage' element={<Mypage/>}></Route>
              <Route path='/post' element={<Write/>}></Route>
            </Routes>
          </Container>
      </div>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin-top: 40px;
  padding: 0 30px;

  ${({ theme })=> theme.device.tablet}{
    margin-top: 60px;
    padding: 0 50px;
  }

  ${({ theme}) => theme.device.desktop}{
    max-width: 1200px;
    margin: 60px auto 0 auto;
  }
`;

export default App;
