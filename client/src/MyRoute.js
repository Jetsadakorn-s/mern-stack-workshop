import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"

const MyRoute = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={App}/>
                <Route path="/create" exact Component={FormComponent}/>
                <Route path="/blog/:slug" exact Component={SingleComponent}/>
                <Route path="/blog/edit/:slug" exact Component={EditComponent}/>
                <Route path="/login" exact Component={LoginComponent}/>
            </Routes>
        </BrowserRouter>
    )
}
export default MyRoute;