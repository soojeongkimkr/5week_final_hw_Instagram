//firebase에서 데이터 가져오기
import {db} from "../../shared/firebase";

// firebase 데이터 제어하는 훅들
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const LOAD = "home/LOAD"
const ADD = "home/ADD"
const MODIFY = "home/MODIFY"
const DELETE = "home/DELETE"


const initialState = {
  list: [
    // {
    //   img_url:'',
    //   txt:'',
    //   name:''
    // }
  ]
  
}


export function loadPost(post_list){
  return {type:LOAD, post_list}
}
export function addPost(post_list){
  return {type:ADD, post_list}
}
export function modifyPost(post_list){
  return {type:MODIFY, post_list}
}
export function deletePost(id){
  return {type:DELETE, id}
}


export const loadPostFB = () => {
  return async function (dispatch){
    const post_data = await getDocs(collection(db, "img"));
    let post_list = [];
    post_data.forEach((v)=> {
      post_list.push({id:v.id, ...v.data()})
    })
    // console.log(post_list)

    dispatch(loadPost(post_list));
  }
  
};

export const addPostFB = (post_list) => {
  return async function (dispatch){
    const user_data = await addDoc(collection(db, 'img'), post_list);
    const post_data = { id: user_data.id, date: Date.now(), ...post_list}

    dispatch(addPost(post_data))
    console.log(post_data)
  }
}

export const modifyPostFB = (post_list, id) => {

  return async function (dispatch, useState){
    const docRef = await doc(collection(db, 'img'), id);
    await updateDoc(docRef, {...post_list, id:id})
    const _doc = await getDoc(docRef);

    const modify_post = [...useState().home.list]
    modify_post.map((v,i) => {
      if(v.id === id){
        return v = {..._doc.data()};
        }
        return v;
      })
    // console.log(modify_post)

    dispatch(modifyPost(modify_post))
      
  }
}

export const deletePostFB = (id) => {
  return async function (dispatch, getState){
    const docRef = await doc(db, 'img', id);
    await deleteDoc(docRef);
    
    //리덕스 데이터도 바꿔주기
    const _post_list = getState().home.list;
    const post_id = _post_list.find((v)=>{
      return v.id === id
    })
    dispatch(deletePost(post_id))

    
    
  }
}




// Reducer
export default function reducer(state = initialState, action={}){
  switch (action.type){
    case "home/LOAD":{
      return {list: action.post_list}
    }
    case "home/ADD":{
      const new_post_list = [ action.post_list, ...state.list];
      return {list: new_post_list};
    }
    case "home/MODIFY":{
      const modify_post = [...action.post_list]
      console.log(modify_post)
      return {list: modify_post}
    }
    case "home/DELETE":{
      const new_post_list = state.list.filter((l,i)=>{
        return action.id.id !== l.id
      })
      
      return {list: new_post_list}
      
    }
    
    default:
      return state;
  }
}