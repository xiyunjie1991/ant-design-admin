import apiService from "@/api/http.js";


export function FindUsers(query,page,page_size) {
    return apiService({
      url: '/admin/Account/FindUsers',
      method: 'post',
      data:{
        query,
        page,
        page_size
      }
    })
  }
  
  export function GetUserInfo(id) {
    return apiService({
      url: '/admin/Account/GetUserInfo',
      method: 'post',
      data:{
        id
      }
    })
  }
  
  export function RemoveUser(user_id) {
    return apiService({
      url: '/admin/User/RemoveUser',
      method: 'post',
      data:{
        user_id
      }
    })
  }
  