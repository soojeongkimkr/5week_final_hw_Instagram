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

const LOAD = "LOAD"
const ADD = "ADD"


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
    const post_data = { ...post_list}

    dispatch(addPost(post_data))
  }
}




// Reducer
export default function reducer(state = initialState, action={}){
  switch (action.type){
    case "LOAD":{
      return {list: action.post_list}
    }
    case "ADD":{
      const new_post_list = [ action.post_list, ...state.list,];
      return {list: new_post_list};
    }
    default:
      return state;
  }
}