let books =[
    {id:1,title:"1984",author:"George Orwell"},
    {id:2,title:"The Great Gatsby",author:"F. Scott Fitzgerald"},
    {id:3,title:"Pride and Prejudice",author:"Janer Aston"},
    {id:4,title:"To Kill a Mockingbird",author:"Harper Lee"},
];

function getBooks(){
    return books;
}

function getBookById(id){
    return books.find((book)=>{book.id === id});
}

function addBook(book){
    let newBook ={id:books.length+1,title:book.title,author:book.author};

    books.push(newBook);
    return newBook;
}

module.exports = {getBookById,getBooks,addBook};