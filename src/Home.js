import React from "react";
import styled, {css} from 'styled-components';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loadPostFB, deletePostFB} from './redux/module/home'

import { Button } from '@mui/material';
import { Grid } from "@material-ui/core";

const Home = () => {
  const postList = useSelector((state)=> state.home.list)
  const dispatch = useDispatch();

  
  const auth = getAuth();
  const user = auth.currentUser;

  React.useEffect(()=> {
    dispatch(loadPostFB());
  }, [])

  
  return(
    <HomeContainer>
      {postList.length !==0 && postList.map((list,i)=> {
        return (
          
          <Grid container spacing={1} key={i}
          style={{marginBottom:'5em'}}>
          <Grid item xs={12} style={{display:'flex',alignItems:'center', marginBottom:'2em'}}>
            <div className="circle"></div>
            {postList[i].name}
            <div style={{marginLeft:'auto'}}>{postList[i].date}</div>
            
            <div style={ user && postList[i].email === user.email ? {display:'block'}: {display:'none'}}>
              <Link to = {`/post/${postList[i].id}`}><Button variant="contained" style={{width:'0.8em', height:'2em', marginLeft:'1em'}}>수정</Button></Link>
              <Button variant="contained" style={{width:'0.8em', height:'2em', marginLeft:'1em', backgroundColor:'red'}}
              onClick={()=>{dispatch(deletePostFB(postList[i].id))}}
              >삭제</Button>
            </div>
          </Grid>
          
          {postList[i].layout === 'left'?
            <>
            <Grid item xs={12} sm={6}>
            <div className="txt">{postList[i].txt}</div>
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <Link to = {`/post/${postList[i].id}/detail`}>
            <img src={postList[i].img_url} alt={postList[i].txt}></img>
            </Link>
            </Grid>
            
            </>
            : postList[i].layout === 'right'?
            <>
            
            <Grid item xs={12} sm={6}>
            <Link to = {`/post/${postList[i].id}/detail`}>
            <img src={postList[i].img_url} alt={postList[i].txt}></img>
            </Link>
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <div className="txt">{postList[i].txt}</div>
            </Grid>
            </>
            :
            <>
            <Grid item xs={12} style={{marginBottom:'1em'}}>
            <div className="txt">{postList[i].txt}</div>
            </Grid>
            <Grid item xs={12}>
            <Link to = {`/post/${postList[i].id}/detail`}>
            <img src={postList[i].img_url} alt={postList[i].txt}></img>
            </Link>
            </Grid>
            
            </>
          }
          <Grid item xs={12} style={{display:'flex',alignItems:'center', marginLeft:'0.5em'}}> 
            {postList[i].name}
            
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