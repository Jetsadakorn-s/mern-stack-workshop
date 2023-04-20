import axios from "axios"
import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";

const SingleComponent=(props)=> {
    const [blog,setBlog] = useState('')
    const { slug } = useParams();

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response => {
            setBlog(response.data)
        })
        .catch(err => alert(err))
         // eslint-disable-next-line
    },[])
    
    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>{blog.title}</h1>
            <p dangerouslySetInnerHTML={{__html: blog.content}}></p>
            <p>Author : {blog.author}</p>
        </div>
    )
}

export default SingleComponent;