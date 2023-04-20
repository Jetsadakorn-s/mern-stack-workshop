import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const EditComponent =()=>{
    const [state,setState] = useState({
        title:"",
        author:""
    })
    const {title,author} = state

    const [content,setContent] = useState('')

    const submitContent=(event)=>{
        setContent(event)
    }

    //กำหนดค่า state
    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value})
    }

    const showUpdateForm =()=>(
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
                        style={{border:'1px solid #666'}}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submit" value="Update" className="btn btn-primary"/>
        </form>
    )

    const submitForm =(e)=>{
        e.preventDefault();
        console.log("API URL : ",process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author})
        .then(response => {
            Swal.fire(
                'อัพเดทข้อมูลเรียบร้อย',
                'ข้อมูลถูกแก้ไข',
                'success'
              )
            const {title,content,author} = response.datas
            setState({...state,title,author})
            setContent(content)
        })
        .catch(err=>{
            alert(err.response.data.error);
        })
    }

    let {slug} = useParams();

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response => {
            const {title,content,author} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err => alert(err))
        //eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    )
}
export default EditComponent;