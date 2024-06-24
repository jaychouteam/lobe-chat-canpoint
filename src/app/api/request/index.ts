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
    let token=  cookie.load('CANPOINTTOKEN')//??'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'
    return new Promise<boolean>((resolve, reject) => {
        if(!token) resolve(false)
        fetch('http://123.57.187.93:8080/auth/checkCompanyEmployees', {
            headers: {
                Canpointtoken:token//getToken//'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(2,data);
                if(data.code==200){
                    resolve(true)
                }else{
                    let url= encodeURIComponent(window.location.href) //decodeURIComponent(window.location.href)
                    console.log(window.location.href,url);
                    cookie.save('URLTOKEN',url ,{path:"/",domain:'.canpoint.cn'})
                    // window.location.href = 'http://account.canpoint.cn/#/login?isIndex=account';
                    window.open ( '//account.canpoint.cn/#/login?isIndex=account' , '_blank' ) 
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







