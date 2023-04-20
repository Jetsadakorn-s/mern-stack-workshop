import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios"
import Swal from 'sweetalert2'
import { authenticate } from "../services/authorize";
import { redirect } from "react-router";

const LoginComponent = (props) =>{
    const [state,setState] = useState({
        username:"",
        password:""
    })

    const {username,password} = state

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value})
    }

    const submitForm =(e)=>{
        e.preventDefault();
        axios
        .post(`http://localhost:5500/api/login`,{username,password})
        .then(Response=>{
            authenticate(Response,()=>props.history)
        }).catch(err=>{
            console.log(err)
            Swal.fire('แจ้งเตือน','รหัสผ่านไม่ถูกต้อง','error')
        })
    }

    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={inputValue("username")}/>
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={inputValue("password")}/>
                </div>
                <br/>
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    )
}
export default (LoginComponent)