const request = require("supertest");
const {app}= require("../index.js");
const {getBooks,getBookById,getReviewById,getReviews} = require("../book.js");
const http = require("http");

jest.mock("../book.js",()=>({
    ...jest.requireActual("../book.js"),
    getBooks:jest.fn(),
    getBookById:jest.fn(),
    getReviewById:jest.fn(),
    getReviews:jest.fn(),
}));

let server;

beforeAll((done)=>{
    server = http.createServer(app);
    server.listen(3001,done);
})

afterAll((done)=>{
    server.close(done);
});

describe("API Error Handling Test",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it("GET /api.books should return 404 if no books are found", async ()=>{
        getBooks.mockResolvedValue([]);
        const response = await request(server).get("/api/books");

        expect(response.statusCode).toEqual(404);
    });

    it("GET API /api/books/:id should return 404 for non-existing book",async()=>{
        getBookById.mockReturnValue(undefined);
        const response = await request(server).get("/api/books/900");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Book not found");
    });

    it("GET API /api/reviews should return 404 if no reviews are found", async()=>{
        getReviews.mockReturnValue([]);

        const response = await request(server).get("/api/reviews");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No Review Found.");
    });

    it("GET API /api/reviews should return 404 for non-existing review",async ()=>{
        getReviewById.mockResolvedValue(null);

        const response = await request(server).get("/api/reviews/999");
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Review not found.")
    })
});