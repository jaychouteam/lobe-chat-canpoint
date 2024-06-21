/**
 * // 校验用户
getAuth().then(res=>{
  console.log(res);
  
})
 * 
 * 
 *  */ 
// import {getToken} from '@/utils/cookie'
import cookie from 'react-cookies'
export const getAuth = () => {
    let token=  cookie.load('CANPOINTTOKEN')??'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'
    return new Promise<boolean>((resolve, reject) => {
        // http://canpoint-cloud-api.canpoint.cn:8080/auth/user/basic/info?nowData=2024-06-20T08:02:33.888Z
        fetch('http://123.57.187.93:8080/auth/checkCompanyEmployees', {
            headers: {
                Canpointtoken:token//getToken//'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                if(data.code==200){
                    resolve(true)
                }else{
                    
                    resolve(false)
                }
                // 处理获取到的数据
            })
            .catch(error => {
                // 处理错误
            });
    })

}
 
export const myFetch = async (...args:any) => {
    console.log(222);
    console.log(cookie.load('LOBE_LOCALE'));
    
    let token;
    if (typeof window === "undefined") {
      // 客户端
      const { default: clientCookies } = await import("js-cookie");
      token = clientCookies.get("CANPOINTTOKEN");
    } else {
      // 服务器端
      const { cookies: serverCookies } = await import("next/headers");
      token = serverCookies().get("CANPOINTTOKEN").value;
    }
    console.log(token);
    
    return token
    // args[1].headers = { Authorization: `bearer ${token}` };
    // const res = await fetch(...args);
    // const data = await res.json();
    // return data;
  };







