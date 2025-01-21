const request =require("supertest");
const {app,validateUser,validateBook,validateReview} = require("../index.js");
const http = require("http");

let server;

beforeAll((done)=>{
    server = http.createServer(app);
    server.listen(3001,done);
})

afterAll((done)=>{
    server.close(done);
});

describe("API Endpoints to add data",()=>{
    it("should add a new user with valid input", async()=>{
        let user ={name:"John Doe",email:"johndoe@rmail.com"
        };
        const response = await request(server).post("/api/users").send(user);
        expect(response.statusCode).toEqual(201);
        user.id =1;
        expect(response.body).toEqual(user);
    });

    it("should return 400 for invalid user input", async()=>{
        let mockInvalidUser = {name: 1, email: "a@h.com"};
        const response = await request(server).post("/api/users").send(mockInvalidUser);
        expect(response.statusCode).toEqual(400);
        expect(response.text).toEqual("Name is required and should be a string");
    });

    it("should add a new book with valid input",async ()=>{
        let book = {title : "Eat That Frog!", author:"Brian Tracy"};
        const res = await request(server).post("/api/books").send(book);

        expect(res.status).toEqual(201);
        book.id = 3;
        expect(res.body).toEqual(book);
    });

    it("should return 400 for invalid book input", async()=>{
        let mockInvalidBook = {title : "Eat That Frog!", author:1};;
        const response = await request(server).post("/api/books").send(mockInvalidBook);
        expect(response.statusCode).toEqual(400);
        expect(response.text).toEqual("Author is required and should be a string");
    });

    it("should add a new review with valid input",async ()=>{
        let review = {content : "Its Great!", userId:1};
        const res = await request(server).post("/api/reviews").send(review);

        expect(res.status).toEqual(201);
        review.id = 3;
        expect(res.body).toEqual(review);
    });

    it("should return 400 for invalid review input", async()=>{
        let mockInvalidReview = {content : "Eat That Frog!", userId:"asd"};;
        const response = await request(server).post("/api/reviews").send(mockInvalidReview);
        expect(response.statusCode).toEqual(400);
        expect(response.text).toEqual("User Id is required and should be a Number");
    });
});

describe("Validation Functions",()=>{
    it("should validate user input correctly",()=>{
        let user ={name:"John Doe",email:"johndoe@rmail.com"};
        expect(validateUser(user)).toBeNull();
        expect(validateUser({name:"John Doe"})).toEqual("Email is required and should be a string");
        expect(validateUser({email:"johndoe@rmail.com"})).toEqual("Name is required and should be a string")
    });

    it("should validate book input correctly",()=>{
        let book = {title : "Eat That Frog!", author:"Brian Tracy"};
        expect(validateBook(book)).toBeNull(); 
        expect(validateBook({title : "Eat That Frog!"})).toEqual("Author is required and should be a string");
        expect(validateBook({author:"Brian Tracy"})).toEqual("Title is required and should be a string");
    });

    it("should validate review input correctly",()=>{
        let review = {content : "Its Great!", userId:1};
        expect(validateReview(review)).toBeNull(); 
        expect(validateReview({content : "Its Great!"})).toEqual("User Id is required and should be a Number");
        expect(validateReview({userId:1})).toEqual("Content is required and should be a string");
    });
})
