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

export const jumpLogin =()=> {
    let url = encodeURIComponent(window.location.href) //decodeURIComponent(window.location.href)
    console.log(window.location.href, url);
    cookie.save('URLTOKEN', url, { domain: '.canpoint.cn', path: "/" })
    // window.location.href = 'http://account.canpoint.cn/#/login?isIndex=account';
    setTimeout(() => {
        window.open('//account.canpoint.cn/#/login?isIndex=account', '_blank')
    }, 0)
}

export const getAuth = () => {
    let token = cookie.load('CANPOINTTOKEN')
    return new Promise<boolean>((resolve) => {
        if (!token) {
            jumpLogin()
            resolve(false)
            return
        }
        fetch('http://canpoint-cloud-api.canpoint.cn/auth/checkCompanyEmployees', {
            headers: {
                Canpointtoken: token//getToken//'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(2, data);
                if (data.code === 200) {
                    resolve(true)
                } else {
                    jumpLogin()
                    resolve(false)
                }
                // 处理获取到的数据
            })
            .catch(() => {
                // 处理错误
            });
    })

}









