import NavbarComponent from './components/NavbarComponent';
import axios from "axios";
import {useState,useEffect} from "react";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function App() {
  const [blogs,setBlogs] = useState([])

  const fetchData=()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then(Response=>{
      setBlogs(Response.data)
    })
    .catch(err=>{
      alert(err)
    })
  }

  const deleteBlog=(slug)=>{
    axios
    .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then(Response=>{
        Swal.fire("Deleted",Response.data.message,"success")
        fetchData()
    }).catch(err=>console.log(err))
    }

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"Delete this blog?",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="container p-5">
      <NavbarComponent/>
      {blogs.map((blog,index)=>(
        <div className='row' key={index} style={{borderBottom:'1px solid silver' }}>
          <div className='col pt-3 pb-2'>
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className='py-3' dangerouslySetInnerHTML={{__html: blog.content}}></div>
            <p className='texted-muted'>ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            <Link className='btn btn-outline-success' to={`/blog/edit/${blog.slug}`}>Edit</Link> &nbsp;
            <button className='btn btn-outline-danger' onClick={()=>confirmDelete(blog.slug)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
