import axios from 'axios'

const baseUrl = "http://localhost:3000";

// // 封装获用户登录api
// export function userLogin(data) {
//     return axios.post(`${baseUrl}/user/register`, data);
// }


// 对外抛出
export default { baseUrl };