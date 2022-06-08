import React from 'react';
import styled, {css} from 'styled-components';
import { storage } from './shared/firebase';
import { Grid } from "@material-ui/core";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {addPostFB}from './redux/module/home'

import { auth } from "./shared/firebase";
import { onAuthStateChanged} from "firebase/auth";



const Write = (props) => {
  const userList = useSelector((state)=> state.user.list)
  
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

  const user_name = userList && userList.filter((v,i)=>
    v.user_id === email
  )

  const inputFile_ref = React.useRef();
  const right = React.useRef();
  const left = React.useRef();
  const bottom = React.useRef();
 
  const dispatch = useDispatch();

  const [fileUrl, setfileUrl] = React.useState();
  const [fileName, setfileName] = React.useState();
  const [layout, setLayout] = React.useState("bottom");

  
  // 레이아웃 버튼 선택
  const isChecked = (e) => {
    if (e.target.checked){
      setLayout(e.target.value)
    }
  }

    const addPostList = () => {
      let date = new Date().toString().slice(0,21)
      dispatch(addPostFB({
          img_url: inputFile_ref.current?.url,
          txt: layout === 'left'? left.current.value:layout === 'right'? right.current.value:bottom.current.value,
          name: is_login ? user_name[0].name : '',
          email: is_login ? email : '',
          id: date
        }
      ))
  }

  
   // 이미지파일 파이어스토리지에 업로드하기
   const uploadFB = async(e) => {
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    )
    // console.log(uploaded_file)
    
    // 이미지파일 url로 가져오기    
    const file_url = await getDownloadURL(uploaded_file.ref)
    // console.log(fileUrl)
    inputFile_ref.current = {url:file_url}
    // console.log(inputFile_ref.current)
    setfileUrl(inputFile_ref.current.url)
  }

  return (
    <WriteContainer >
      
      <form >
      <Grid container spacing={1}>
      <Grid item xs={12}>
        <div style={{display:'flex'}}>
          <input type="radio" name="layout" id="left" value="left"
          onChange={isChecked}></input>
          <label htmlFor='left'>
            <strong style={layout === 'left'? {color:"#222"} : {color:'#ccc'}}> 
            오른쪽에 이미지 왼쪽에 텍스트
            </strong>
          </label>
          <input type="radio" name="layout" id="right" value="right"
          onChange={isChecked}></input>
          <label htmlFor='right'>
            <strong style={layout === 'right'? {color:"#222"} : {color:'#ccc'}}>
              왼쪽에 이미지 오른쪽에 텍스트
            </strong>
          </label>
          <input type="radio" name="layout" id="bottom" value="bottom"
          onChange={isChecked}></input>
          <label htmlFor='bottom'>
            <strong style={layout === 'bottom'? {color:"#222"} : {color:'#ccc'}}>
              하단에 이미지 상단에 텍스트
            </strong>
          </label>
        </div>
      </Grid>

      {/* 이미지 업로드 아이콘 */}
      <Grid item xs={12}>
        <label>
        <AddPhotoAlternateIcon className='imgIcon' style={{cursor:'pointer'}}></AddPhotoAlternateIcon>
        <input type='file' id='input-file' onChange={uploadFB}
        value={fileName || ''}
        ref={inputFile_ref} style={{display:'none'}}></input>
        </label>
      </Grid>
      
      {/* 오른쪽에 이미지 왼쪽에 텍스트 */}
      <Grid item xs={12} sm={6} style={layout === 'left'? {display:'block'}:{display:'none'}}>
        <label>
         <input type="text" placeholder='텍스트를 입력해주세요' maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'400px'}}
         ref={left}
         />
         </label>
      </Grid>
      <Grid item xs={12} sm={6} style={layout === 'left'? {display:'block'}:{display:'none'}} >
          <img src={fileUrl}  width="100%" height= "400px" alt={fileName}/>
      </Grid>
      

      {/* 왼쪽에 이미지 오른쪽에 텍스트 */}
      <Grid item xs={12} sm={6} style={layout === 'right'? {display:'block'}:{display:'none'}}>
          <img src={fileUrl} width="100%" height= "400px" alt={fileName}/>
      </Grid>
      <Grid item xs={12} sm={6} style={layout === 'right'? {display:'block'}:{display:'none'}}>
        <label>
         <input type="text" placeholder='텍스트를 입력해주세요' maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'400px'}}
         ref={right}
         />
         </label>
      </Grid>

      {/* 하단에 이미지 상단에 텍스트 */}
      <Grid item xs={12} style={layout === 'bottom'? {display:'block'}:{display:'none'}}>
        <label>
         <input type="text" placeholder='텍스트를 입력해주세요' maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'200px'}}
         ref={bottom}
         />
         </label>
      </Grid>
      <Grid item xs={12} style={layout === 'bottom'? {display:'block', overflow:'hidden', width:'100%', height: "100%"}:{display:'none'}}>
          <img src={fileUrl} width="100%" height= "auto" alt={fileName}/>
        <div style={{backgroundImage:`url(${fileUrl})`}}></div>
      </Grid>
      
      </Grid>

      <Grid item xs={12}>
        <Link to = '/'>
          <Button variant="contained" style={{float:'right', margin:'1em 0 5em 0'}}
        onClick={addPostList}
        >완료</Button></Link>
      </Grid>
    </form>
    
    </WriteContainer>

    )
  }

const WriteContainer = styled.div`
  ${({ theme }) => {
    const { fontSizes, device, colors } = theme;
    return css`
      float:right;
      margin-top: 10vh;
      width:100%;
      height: 100%;
      .imgIcon{
        float:right;
        margin:1em;
      }
      

      ${device.tablet}{
        height: 100%;
      }
    `
  }}

`;



export default Write;