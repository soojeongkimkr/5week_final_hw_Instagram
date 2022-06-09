import React from 'react';
import styled, {css} from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { deletePostFB} from './redux/module/home'
import { Link, useParams, useNavigate} from 'react-router-dom';
import { getAuth } from "firebase/auth";

import { Button } from '@mui/material';
import { Grid } from "@material-ui/core";


const Postdetail = () => {
  const postList = useSelector((state)=> state.home.list)
  console.log(postList)
  const dispatch = useDispatch();
  const navigate = useNavigate;

  const param = useParams().id;

  const this_pic = postList.filter((v,i)=>
    postList[i].id === param
  )
  console.log(this_pic)

  const auth = getAuth();
  const user = auth.currentUser;


  const is_edit = param ? true : false;
  const _post = is_edit ? postList && postList.find((p)=> p.id === param) : null;

  if(is_edit && !_post){
    navigate(`/`);
    return;
  }


  return(
    <DetailContainer>
      <Grid container spacing={1}
          style={{marginBottom:'5em'}}>
          <Grid item xs={12} style={{display:'flex',alignItems:'center', marginBottom:'2em'}}>
            <div className="circle"></div>
            {this_pic[0].name}
            <div style={{marginLeft:'auto'}}>{this_pic[0].date}</div>
            
            <div style={ user && this_pic[0].email === user.email ? {display:'block'}: {display:'none'}}>
            <Link to = {`/post/${this_pic[0].id}`}><Button variant="contained" style={{width:'0.8em', height:'2em', marginLeft:'1em'}}>수정</Button></Link>
              <Button variant="contained" style={{width:'0.8em', height:'2em', marginLeft:'1em', backgroundColor:'red'}}
              onClick={()=>{dispatch(deletePostFB(this_pic[0].id))}}
              >삭제</Button>
            </div>
          </Grid>
          
          {this_pic[0].layout === 'left'?
            <>
            <Grid item xs={12} sm={6}>
            <div className="txt">{this_pic[0].txt}</div>
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <img src={this_pic[0].img_url} alt={this_pic[0].txt}></img>
            </Grid>
            
            </>
            : this_pic[0].layout === 'right'?
            <>
            
            <Grid item xs={12} sm={6}>
            <img src={this_pic[0].img_url} alt={this_pic[0].txt}></img>
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <div className="txt">{this_pic[0].txt}</div>
            </Grid>
            </>
            :
            <>
            <Grid item xs={12} style={{marginBottom:'1em'}}>
            <div className="txt">{this_pic[0].txt}</div>
            </Grid>
            <Grid item xs={12}>
            <img src={this_pic[0].img_url} alt={this_pic[0].txt}></img>
            
            </Grid>
            
            </>
          }
      </Grid>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
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

export default Postdetail;