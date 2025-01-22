let express = require("express");
const cors = require("cors");
const app = express();
const {getAllEmployees,getEmployeesById} = require("./controllers")

app.user(cors())
app.use(express.json());

app.get("/employees",async(req,res)=>{
    let employees = getAllEmployees();
    res.json({employees});
});

app.get("/employees/details/:id",async(req,res)=>{
    let id = req.params.id;
    let employee = getEmployeesById(id);
    res.json({employee});
});

module.exports = {app};