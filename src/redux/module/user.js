import {db } from "../../shared/firebase";



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

const LOAD = "user/LOAD"
const ADD = "user/ADD"

const initialState = {
  list: [
  //   {
  //     name:'',
  //     user_id:''
  // }
  ]
}

export function loadUser(user_list){
  return {type:LOAD, user_list}
}
export function addUser(user_list){
  return {type:ADD, user_list}
}



export const loadUserFB = () => {
  return async function (dispatch){
    const user_data = await getDocs(collection(db, "users"));
    let user_list = [];
    user_data.forEach((v)=> {
      user_list.push({id:v.id, ...v.data()})
    })
    // console.log(user_list)

    dispatch(loadUser(user_list));
  }
  
};

export const addUserFB = (user_list) => {
  
  return async function (dispatch){
    const user_data = await addDoc(collection(db, 'users'), user_list);
    const _user_data = {id: user_data, ...user_list}

    dispatch(addUser(_user_data))
  }
}


// Reducer
export default function reducer(state = initialState, action={}){
  switch (action.type){
    case "user/LOAD":{
      return {list: action.user_list, is_loaded:true}
    }
    case "user/ADD":{
      const new_user_list = [...state.list, action.user_list];
      return {list: new_user_list};
    }
    default:
      return state;
  }
}