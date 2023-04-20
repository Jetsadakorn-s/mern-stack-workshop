
//เก็บ token / username
export const authenticate = (response) =>{
    if(window !== "undefined"){
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))
    }
}