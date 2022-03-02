import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const client = axios.create({
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

client.interceptors.request.use(async req => {
    // console.log("interceptors request", req);
    const token = JSON.parse(localStorage.getItem('authTokens'));
    req.headers.Authorization =  token ? `Bearer ${token.access}` : '';
    return req;

    // if(!authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    //     req.headers.Authorization = `Bearer ${authTokens?.access}`
    // }
    // return req;okens){

    // if(!authTokens){
    //     authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    //     req.headers.Authorization = `Bearer ${authTokens?.access}`
    // }

    // const user = jwt_decode(authTokens.access)
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    // if(!isExpired) return req

    // const response = await axios.post(`api/auth/token/refresh/`, {
    //     refresh: authTokens.refresh
    //   });

    // localStorage.setItem('authTokens', JSON.stringify(response.data))
    // req.headers.Authorization = `Bearer ${response.data.access}`
    // return req
})

client.interceptors.response.use((response) => {
  // console.log("interceptors response", response);
  return response;
}
// , function (error) {
//   if (401 === error.response.status) {
//     console.log("Unauthenticated 401");
//     return error;
//       // handle error: inform user, go to login, etc
//   } else {
//       return Promise.reject(error);
//   }
// }
);

export default client;

// import axios from 'axios'

// axios.interceptors.request.use(async (config)=> {

//   let authTokens = await localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
//   if (authTokens != null) {
//       config.headers = { 'x-access-token': authTokens.access }
//   }
// //   config.url = join('http://demo.com/api/v1', config.url);
//   return config;
  
// });

// export const client = axios