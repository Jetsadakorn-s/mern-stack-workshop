const slugify = require("slugify")
const Blogs = require('../models/blogs')
const { response } = require("express")
const blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');

exports.create=async(req,res)=>{
    try {
    const {title,content,author,image} = req.body
    let slug = slugify(title)

    if(!slug)slug = uuidv4();

    switch (true) {
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    const blog = await Blogs.create({title,content,author,slug,image})
    return res.status(200).json(blog)

}catch(err){
    return res.status(400).json(err)
}
}

exports.getAllblogs=async(req,res)=>{
    try {    
        const blogs = await Blogs.find({})
        return res.status(200).json(blogs)
    }catch(err){
        return res.status(400).json(err)
    }
}

exports.singleBlog=async(req,res)=>{
    try {
        const {slug} = req.params
        const blog = await Blogs.findOne({slug})
        return(
            res.status(200).json(blog)
        )
    }catch(err){
        return res.status(400).json(err)
    }
}

exports.remove=async(req,res)=>{
    try{
        const {slug} = req.params
        const blogs = await Blogs.findOneAndRemove({slug})
        return(
            res.status(200).json({message:"ลบบทความเรียบร้อย"})
        )
    }catch(err){
        return res.status(400).json(err)
    }
}

exports.update=async(req,res)=>{
    try{
        const {slug} = req.params
        const { title,content,author } = req.body
        const blog = await Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
        return(
            res.status(200).json(blog)
        )
    }catch(err){
        return res.status(400).json(err)
    }
}