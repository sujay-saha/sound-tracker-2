const request = require("supertest");
const {app,getAllReviews,getReviewById,addReview,getUserById,addUser}= require("../index.js")
const http = require("http");

jest.mock("../index.js",()=>({
    ...jest.requireActual("../index.js"),
    getAllReviews:jest.fn(),
    getReviewById:jest.fn(),
    addReview:jest.fn(),
    getUserById:jest.fn(),
    addUser:jest.fn()
}));

let server;

beforeAll((done)=>{
    server = http.createServer(app);
    server.listen(3001,done);
})

afterAll((done)=>{
    server.close(done);
});

describe("API Endpoints",()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    });

    it("should retrieve all reviews", async ()=>{
        let mockReviews =[{id:1,content:"Great product!",userId:1},
            {id:2,content:"Not bad, could be better",userId:2},
        ];

        getAllReviews.mockResolvedValue(mockReviews);
        const result = await request(server).get("/reviews")
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockReviews);
    });
    it("should retrieve a specific review by id",async()=>{
        let mockReview ={id:1,content:"Great product!",userId:1};
        getReviewById.mockResolvedValue(mockReview);

        const result = await request(server).get("/reviews/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(mockReview);
    });

    it("should add an new review",async()=>{
        let newMockReview ={id:3,content:"Product is awesome!",userId:2};

        addReview.mockResolvedValue(newMockReview);
        const result = await request(server)
            .post("/reviews/new")
            .send({content:"Product is awesome!",userId:2});

        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(newMockReview);

    });

    it("should retrieve specific user by id",async()=>{
        let users =[{id:1,name:"John Doe",email:"john.doe@example.com"},
            {id:2,name:"Jane Smith",email:"jane.smith@example.com"},
        ];
        getUserById.mockResolvedValue(users[0]);

        const result = await request(server).get("/users/details/1");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(users[0]);
    });

    it("should add a new user",async()=>{
        const mockUser = {id:3,name:"Alice Doeasd",email:"alice.doasd@example.com"};

        addUser.mockResolvedValue(mockUser);
        const result = await request(server)
            .post("/users/new")
            .send({name:"Alice Doeasd",email:"alice.doasd@example.com"});

        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(mockUser);
    });

    it("should return 404 for not existing review",async()=>{
        getReviewById.mockResolvedValue(null);

        let result = await request(server).get("/reviews/details/5");
        expect(result.statusCode).toEqual(404);
    });

    it("should return 404 for not existing user",async()=>{
        getUserById.mockResolvedValue(null);

        let result = await request(server).get("/users/details/5");
        expect(result.statusCode).toEqual(404);
    });
});