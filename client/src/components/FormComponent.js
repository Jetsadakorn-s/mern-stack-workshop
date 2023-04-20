import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const FormComponent =()=>{
    const [state,setState] = useState({
        title:"",
        author:""
    })
    const {title,author} = state

    const [content,setContent] = useState('')

    //กำหนดค่า state
    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value})
    }
    
    const submitContent=(event)=>{
        setContent(event)
    }

    const submitForm =(e)=>{
        e.preventDefault();
        console.log("API URL",process.env.REACT_APP_API)
        axios
        .post("http://localhost:5500/api/blogs/create",{title,content,author})
        .then(response => {
            Swal.fire('บันทึกข้อมูลเรียบร้อย','ข้อมูลถูกบันทึกแล้ว','success')
            setState({...state,title:"",author:""})
            setContent("")
        })
        .catch(err=>{
            alert(err.response.data.error);
        })
    }
    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        style={{border:'1px solid #666'}}
                    />
                    {/* <textarea className="form-control" value={content} onChange={inputValue("content")}></textarea> */}
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    )
}
export default FormComponent;