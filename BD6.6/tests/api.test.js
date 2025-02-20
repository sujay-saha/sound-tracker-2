const request =require("supertest");
const { getAllEmployees } = require("../controllers");
const http = require("http");

jest.mock("../controllers",()=>({
    ...jest.requireActual("../controllers"),
    getAllEmployees:jest.fn(),
}));

let server;

beforeAll(async ()=>{
    server = http.createServer(app);
    server.listen(3001);
})

afterAll(async ()=>{
    server.close();
});

describe("Controller Function tests",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    it("should return all employees",()=>{
        let mockedEmployees = [
            {
                employeeId: 1,
                name: "Rahul Sharma",
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: "Priya Singh",
                email: "priya.singh@example.com",
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: "Ankit Verma",
                email: "ankit.verma@example.com",
                departmentId: 1,
                roleId: 3,
            }
        ];
        getAllEmployees.mockReturnValue(mockedEmployees);

        let response = getAllEmployees();
        expect(response).toBe(mockedEmployees);
        expect(response.length).toBe(3);
    });
});

describe("API Endpoint tests", () => {
    it("GET /employees should get all employees", async ( ) => {
        let mockedEmployees = [
            {
                employeeId: 1,
                name: "Rahul Sharma",
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: "Priya Singh",
                email: "priya.singh@example.com",
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: "Ankit Verma",
                email: "ankit.verma@example.com",
                departmentId: 1,
                roleId: 3,
            }
        ];
    const res = await request(server).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockedEmployees);
    
    expect(res.body.employees.length).toBe(3);
    });

    it("GET /employees/details/:id should get an employee by ID", async ( ) => {
        const res = await request(server).get("/employees/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            employee: {
            employeeId: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            departmentId: 1,
            roleId: 1,
            },
        });
    });
});