let express = require("express");
const app = express();

app.use(express.json());

let reviews =[{id:1,content:"Great product!",userId:1},
    {id:2,content:"Not bad, could be better",userId:2},
];

let users =[{id:1,name:"John Doe",email:"john.doe@example.com"},
    {id:2,name:"Jane Smith",email:"jane.smith@example.com"},
];

async function getAllReviews(){
    return reviews;
}

app.get("/reviews",async (req,res)=>{
    const reviews = await getAllReviews();
    res.json(reviews);
});

async function getReviewById(id){
    return reviews.find((review)=>review.id===id);
}

app.get("/reviews/details/:id",async (req,res)=>{
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    if(!review) return res.status(404).send("Review not found");
    res.status(200).json(review);
});

async function addReview(review){
    review.id = reviews.length+1;
    reviews.push(review);

    return review;
}

app.post("/reviews/new",async (req,res)=>{
    const newReview = await addReview(req.body);
    res.status(201).json(newReview);
});

async function getUserById(id){
    return users.find((user)=>user.id === id);
}

app.get("/users/details/:id",async (req,res)=>{
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    console.log(user);
    if(!user) return res.status(404).send("User not found");
    res.json(user);
});

async function addUser(user){
    user.id = users.length+1;
    users.push(user);
    
    return  user;
}

app.post("/users/new", async(req,res)=>{
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
})

module.exports = {app,getAllReviews,getReviewById,addReview,getUserById,addUser};