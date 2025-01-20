let {getBooks,getBookById,getReviewById,getReviews,addBook} = require("./book.js");
let express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/books",async (req,res)=>{
    try{
        const books = await getBooks();
        if(books.length === 0){
            return res.status(404).json({error:"No Books Found."});
        }
        return res.json(books);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.get("/api/books/:id",(req,res)=>{
    try{
    const book = getBookById(parseInt(req.params.id));
    if(!book){
        return res.status(404).json({error:"Book not found"});}
    return res.json(book);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.get("/api/reviews",async (req,res)=>{
    try{
        const reviews = await getReviews();
        if(reviews.length===0){
            return res.status(404).json({error:"No Review Found."})
        }
        return res.json(reviews);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
});

app.get("/api/reviews/:id",async (req,res)=>{
    try{
        const review = await getReviewById(parseInt(req.params.id));
        if(!review){
            return res.status(404).json({error:"Review not found."})
        }
        return res.json(review);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
});

app.post("/api/books",(req,res)=>{
    const book = addBook(req.body);
    res.status(201).json(book);
});

module.exports = {app};