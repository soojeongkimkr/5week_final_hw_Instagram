import React from "react";
import styled, {css} from 'styled-components';
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import {loadPostFB} from './redux/module/home'

import { Button } from '@mui/material';
import { Grid } from "@material-ui/core";

const Home = () => {
  const postList = useSelector((state)=> state.home.list)
  const userList = useSelector((state)=> state.user.list)
  const dispatch = useDispatch();

  
  const auth = getAuth();
  const user = auth.currentUser;

  React.useEffect(()=> {
    dispatch(loadPostFB());
  }, [dispatch])

  return(
    <HomeContainer>
      {postList.length !==0 && postList.map((list,i)=> {
        return (
        <Grid container spacing={1} key={i}
          style={{marginBottom:'5em'}}>
          <Grid item xs={12} style={{display:'flex',alignItems:'center'}}>
            <div className="circle"></div>
            {postList[i].name}
            <div style={{marginLeft:'auto'}}>{postList[i].id}</div>
            
            <div style={ user && postList[i].email === user.email ? {display:'block'}: {display:'none'}}>
            <Button variant="contained" style={{width:'0.8em', height:'2em', marginLeft:'1em'}}>수정</Button>
            <Button variant="contained" style={{width:'0.8em', height:'2em', marginLeft:'1em', backgroundColor:'red'}}>삭제</Button>
            </div>
          </Grid>
          
          <Grid item xs={12}>
            <img src={postList[i].img_url} alt={postList[i].txt}></img>
          </Grid>
          <Grid item xs={12} style={{display:'flex',alignItems:'center', marginLeft:'0.5em'}}> 
            {postList[i].name}
            <div className="txt">{postList[i].txt}</div>
          </Grid>

        </Grid>
        )
      })}
    </HomeContainer>
  )

};

const HomeContainer = styled.div`
  ${({ theme }) => {
    const { fontSizes, device, colors } = theme;
    return css`
      margin-top: 8em;
      width:100%;
      height: 100%;
      .imgIcon{
        float:right;
        margin:1em;
      }
      .circle{
        width: 3em;
        height: 3em;
        border-radius: 100px;
        background: #eee;
        margin-right: 1em;
      }
      img{
        width: 100%;
      }
      .txt{
        margin-left: 1em;
      }

      ${device.tablet}{
        height: 100%;
      }
    `
  }}
`;

export default Home;