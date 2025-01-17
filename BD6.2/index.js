let express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let authors =[{authorId:1,name:"George Orwell",book:"1984"},
    {authorId:2,name:"Aldous Huxley",book:"Brave New World"},
    {authorId:3,name:"Ray Bradbury",book:"Fahrenheit 451"},
];

function getAuthors(){
    return authors;
}

app.get("/authors",(req,res)=>{
    res.json(getAuthors());
});

function getAuthorById(id){
    return authors.find((author)=>{author.authorId===id});
}

app.get("/authors/details/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let author = getAuthorById(id);
    if(author){
        res.json(author);
    }else{
        res.status(400).send("Author not found");
    }
});

function addAuthor(authorObj){
    authors.push(authorObj);
    return authorObj;
}

app.post("/authors/new",(req,res)=>{
    let authorId = req.query.authorId;
    let name = req.query.name;
    let book = req.query.book;
    let addedAuthor = addAuthor({authorId,name,book});
    res.status(201).json(addedAuthor);
});

module.exports = {app,getAuthorById,getAuthors,addAuthor};