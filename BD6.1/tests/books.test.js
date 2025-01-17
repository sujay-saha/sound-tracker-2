let {getBooks,getBookById,addBook} = require("../book");


let mockBooks =[
    {id:1,title:"1984",author:"George Orwell"},
    {id:2,title:"The Great Gatsby",author:"F. Scott Fitzgerald"},
    {id:3,title:"Pride and Prejudice",author:"Janer Aston"},
    {id:4,title:"To Kill a Mockingbird",author:"Harper Lee"},
];

describe("Books Functions",()=>{
    it("should get all books",()=>{
        let books = getBooks();
        expect(books.length).toBe(4);
        expect(books).toEqual(mockBooks);
    });

    it("should return a book by id",()=>{
        let book = getBookById(1);
        expect(book).toEqual(mockBooks.values[0]);
    });

    it("should return undefined for a non-existent book",()=>{
        let book = getBookById(99);
        expect(book).toBeUndefined();
    });

    it("should add a new book",()=>{
        let newBook = {title:"New Book",author:"Kim Hui"};
        let addedBook = addBook(newBook);
        expect(addedBook).toEqual({id:5,title:"New Book",author:"Kim Hui"});

        let bookLatest = getBooks();
        expect(bookLatest.length).toBe(5);
    })
});
