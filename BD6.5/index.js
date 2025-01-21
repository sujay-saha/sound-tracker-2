let express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let books = [];
let reviews = [];

function validateUser(user){
    if(!user.name || typeof user.name !== "string"){
        return "Name is required and should be a string";
    }
    if(!user.email || typeof user.email !== "string"){
        return "Email is required and should be a string";
    }
    return null;
}

app.post("/api/users",(req,res)=>{
    let error = validateUser(req.body);
    if(error){
        res.status(400).send(error);
    }
    let user = {id:users.length+1,...req.body};
    users.push(user);
    res.status(201).json(user);
});

function validateBook(book){
    if(!book.title || typeof book.title !== "string"){
        return "Title is required and should be a string";
    }
    if(!book.author || typeof book.author !== "string"){
        return "Author is required and should be a string";
    }
    return null;
}

app.post("/api/books",(req,res)=>{
    let error = validateBook(req.body);
    if(error){
        res.status(400).send(error);
    }
    let book = {id:users.length+1,...req.body};
    books.push(book);
    res.status(201).json(book);
});

function validateReview(review){
    if(!review.content || typeof review.content !== "string"){
        return "Content is required and should be a string";
    }
    if(!review.userId || typeof review.userId !== "number"){
        return "User Id is required and should be a Number";
    }
    return null;
}

app.post("/api/reviews",(req,res)=>{
    let error = validateReview(req.body);
    if(error){
        res.status(400).send(error);
    }
    let review = {id:users.length+1,...req.body};
    reviews.push(review);
    res.status(201).json(review);
});

module.exports = {app,validateUser,validateBook,validateReview};