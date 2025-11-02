let express=require("express");
const { dbConnection } = require("./dbConnections");
let app=express();

app.use(express.json())
app.get("/student-read",(req,res)=>{
    res.send("student view api")
})
app.post("/student-insert",async (req,res)=>{
    let myDb=await dbConnection();
    let studentCollection=myDb.collection("students")
    // let obj={
    //     sName:req.body.sName,
    //     sEmail:req.body.sEmail 
    // }
    // isko ham ese bhi likh sakte he or dusre tarike se bhi likh sakte he jese 
    let{sName,sEmail}=req.body;
    let obj={sName,sEmail}
    let insertRes=await studentCollection.insertOne(obj)
    let resobj={
        status:1,
        msg:"data insert",
        insertRes

    }
    res.send(resobj)

})
app.delete("/student-delete", async (req, res) => {
  const db = await dbConnection();
  const studentCollection = db.collection("students");

  const { sEmail } = req.body;

  const deleteRes = await studentCollection.deleteOne({ sEmail });

  res.send({ msg: "Deleted", result: deleteRes });
});

app.listen(8001, () => {
  console.log("Server running on http://localhost:8001");
});




// const express = require("express");
// const { dbConnection } = require("./dbConnections");
// const app = express();

// app.use(express.json());

// app.get("/student-read", async (req, res) => {
//   try {
//     const db = await dbConnection();
//     const collection = db.collection("students");
//     const data = await collection.find().toArray();
//     res.send(data);
//   } catch (err) {
//     res.status(500).send({ status: 0, msg: "Error fetching data", error: err.message });
//   }
// });

// app.post("/student-insert", async (req, res) => {
//   try {
//     const db = await dbConnection();
//     const collection = db.collection("students");
//     const { sName, sEmail } = req.body;
//     const result = await collection.insertOne({ sName, sEmail });
//     res.send({ status: 1, msg: "Data Inserted", insertRes: result });
//   } catch (err) {
//     res.status(500).send({ status: 0, msg: "Insert failed", error: err.message });
//   }
// });

// app.listen(8001, () => {
//   console.log("Server running on http://localhost:8001");
// });


