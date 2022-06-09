import React from 'react';
import styled, {css} from 'styled-components';
import { storage } from './shared/firebase';
import { Grid } from "@material-ui/core";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addPostFB, modifyPostFB, deletePostFB }from './redux/module/home'

import { auth } from "./shared/firebase";
import { onAuthStateChanged} from "firebase/auth";



const Write = (props) => {
  const userList = useSelector((state)=> state.user.list)
  const postList = useSelector((state)=> state.home.list)

  const navigate = useNavigate();
  const post_id = useParams().id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? postList && postList.find((p)=> p.id === post_id) : null;
  const [input, setInput] = React.useState(_post ? _post.txt : "");
  const [editFileUrl, setEditFileUrl] = React.useState(_post ? _post.img_url: null)
  

  console.log(postList)

  // React.useEffect(()=> {
  //   dispatch(loadPostFB());
  // }, [useSelector])

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

    if(is_edit && !_post){
      navigate(`/`);
      return;
    }

  },[])

  const user_name = userList && userList.filter((v,i)=>
    v.user_id === email
  )

  const inputFile_ref = React.useRef();
  const right = React.useRef();
  const left = React.useRef();
  const bottom = React.useRef();
 
  const dispatch = useDispatch();

  const [fileUrl, setfileUrl] = React.useState(null);
  const [fileName, setfileName] = React.useState(null);
  const [layout, setLayout] = React.useState(_post ? _post.layout : "bottom");

  
  // 레이아웃 버튼 선택
  const isChecked = (e) => {
    if (e.target.checked){
      setLayout(e.target.value)
    }
  }
  // 게시물 수정할 때 이미 들어가있어야 할 텍스트
  const txtEdit = (e) => {
    setInput(e.layout === 'left'? left.current.value : e.layout === 'right'? right.current.value : bottom.current.value)
  }
  
  // 게시물 등록하는 함수
    const addPostList = () => {
      let date = new Date().toString().slice(0,21)
      dispatch(addPostFB({
          img_url: inputFile_ref.current?.url,
          txt: layout === 'left'? left.current.value:layout === 'right'? right.current.value:bottom.current.value,
          name: is_login ? user_name[0].name : '',
          email: is_login ? email : '',
          date: date,
          layout: layout
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

  // 게시물 수정하기 함수
  const modifyPost = () => {
    let date = new Date().toString().slice(0,21)
    dispatch(modifyPostFB(
      {
        img_url: editFileUrl,
        txt: layout === 'left'? left.current.value:layout === 'right'? right.current.value:bottom.current.value,
        name: is_login ? user_name[0].name : '',
        email: is_login ? email : '',
        date: '수정됨 '+date,
        layout: layout
      },
      post_id
    ))
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
        
        { is_edit ?
        <label>
         <input type="text" defaultValue={input} onChange={txtEdit} maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'400px'}}
         ref={left}
         />
         </label>
         :
         <input type="text" placeholder='텍스트를 입력해주세요' onChange={txtEdit} maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'400px'}}
         ref={left}
         />
         }
         
      </Grid>
      <Grid item xs={12} sm={6} style={layout === 'left'? {display:'block'}:{display:'none'}} >
          { is_edit ?
          <img src={editFileUrl}  width="100%" height= "400px" alt={fileName}/>
          :
          <img src={fileUrl}  width="100%" height= "400px" alt={fileName}/>
          } 
          </Grid>
      

      {/* 왼쪽에 이미지 오른쪽에 텍스트 */}
      <Grid item xs={12} sm={6} style={layout === 'right'? {display:'block'}:{display:'none'}}>
          { is_edit ?
          <img src={editFileUrl}  width="100%" height= "400px" alt={fileName}/>
          :
          <img src={fileUrl}  width="100%" height= "400px" alt={fileName}/>
          } 
      </Grid>
      <Grid item xs={12} sm={6} style={layout === 'right'? {display:'block'}:{display:'none'}}>
        
      { is_edit ?
        <label>
         <input type="text" defaultValue={input} onChange={txtEdit} maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'400px'}}
         ref={right}
         />
         </label>
         :
         <input type="text" placeholder='텍스트를 입력해주세요' onChange={txtEdit} maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'400px'}}
         ref={right}
         />
         }
         
      </Grid>

      {/* 하단에 이미지 상단에 텍스트 */}
      <Grid item xs={12} style={layout === 'bottom'? {display:'block'}:{display:'none'}}>
        { is_edit ?
        <label>
         <input type="text" defaultValue={input} onChange={txtEdit} maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'200px'}}
         ref={bottom}
         />
         </label>
         :
         <input type="text" placeholder='텍스트를 입력해주세요' onChange={txtEdit} maxLength={300}
         style={{border:'1px solid #eee', width:'100%', height:'200px'}}
         ref={bottom}
         />
         }
      </Grid>
      <Grid item xs={12} style={layout === 'bottom'? {display:'block', overflow:'hidden', width:'100%', height: "100%"}:{display:'none'}}>
          { is_edit ?
          <img src={editFileUrl}  width="100%" height= "auto" alt={fileName}/>
          :
          <img src={fileUrl}  width="100%" height= "auto" alt={fileName}/>
          } 
        <div style={{backgroundImage:`url(${fileUrl})`}}></div>
      </Grid>
      
      </Grid>

      <Grid item xs={12}>
        
        
          {is_edit ?
          <Link to = '/'>
          <Button variant="contained" style={{float:'right', margin:'1em 0 5em 0'}}
          onClick={modifyPost}
          >수정 완료</Button>
          </Link>
          :
          <Link to = '/'>
          <Button variant="contained" style={{float:'right', margin:'1em 0 5em 0'}}
          onClick={addPostList}
          >작성 완료
          </Button>
          </Link>
        }
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