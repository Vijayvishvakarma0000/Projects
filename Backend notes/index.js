/*                                                       MongoDb
                                            +++++++++++++++++++++++++++


mongodb ak non relational data base hota he jo data ko json format me store karta he isme information document ke form me store hoti he 
rdbms se data acces store karna hota he to hamre pass sql hota he jabki non realtional data base me data add karne ya access karne ke liye 
methods ka use kiya jata he agar mmujhe mthods cll karna he to me (db.) likhna padta he isme jo data he key vlues pair ki form me data hota he yah apr collection store hote he 
agar suppose mene likaha use student db agar mongo db me student  name ka data base nahi hota to vaha par automatically create ho jat he 
yah par object  ki form  me data store kiya jata he relational me hame rules follw karn e padte he jabki mongo me rules nnahi follow karn epadte he or 
mongo db ye facility he deta he  ki ye structure ko predefined karke rakhta he jabki hame mysql me structure ka dhyan me rkhkar data store karn padhta he 
yha par user aone hisb se changes kar sakta he 

advantage of mongodb
mongo db ke andar methds hoti he or vo method db ke andar hoti he isliye he hma mmongo db me db ke nadra hoti he 
data base ko mene create kiye 
fir dtabase ki

collection is a combination of doccument or document is collection of object 

*/

//                                                       ########################## methods  Name 
/*
       db.students.insertOne({id: 1, name: "Vijay", age: 22}); kisi ak key ko yadi insert karna he to ham insert one ka use ka


       db.students.find({name: "Vijay"}); jab ham find method ka use karte he to hame pura obj return akrega .

       db.students.deleteOne({id: 1});  jab hame kisi ak key ko delete karn ahe to ham iski help se akr sakte he 

       db.students.updateOne({id: 1}, {$set: {age: 23}});

        

                                      


*/
//                                                       limit method()
/*
 Agar tumhare DB me 1000 records hain, lekin tumhe sirf 5 hi record dikhane hain, to tum limit() ka use karoge.

 db.users.find().limit(5)

*/

/*                                                       Mongodb operator
                                      ++++++++++++++++++++++++++++++++++++++++++++++


1. Comparison Operators

Documents ko compare karne ke liye use hote hain.
| Operator | Meaning | Example |
|----------|---------|---------|
| $eq | equal to | {age: {$eq: 22}} |
| $ne | not equal | {age: {$ne: 22}} |
| $gt | greater than | {age: {$gt: 18}} |
| $gte | greater or equal | {age: {$gte: 18}} |
| $lt | less than | {age: {$lt: 30}} |
| $lte | less or equal | {age: {$lte: 30}} |
| $in | in array | {city: {$in: ["Bhopal","Indore"]}} |
| $nin | not in array | {city: {$nin: ["Bhopal"]}} |

2. Logical Operators

Multiple conditions combine karne ke liye.
| Operator | Meaning | Example |
|----------|---------|---------|
| $and | AND | {$and: [{age: {$gt: 18}}, {city: "Bhopal"}]} |
| $or | OR | {$or: [{age: 18}, {city: "Indore"}]} |
| $not | NOT | {age: {$not: {$gt: 30}}} |
| $nor | NOR | {$nor: [{age: 18}, {city: "Indore"}]} |

*/

/*                                                       What is backend ?
                                   -+++++++++++++++++++++++++++++++++++++++++++++++++++++


"Backend ek application ka wo part hota hai jo server side pe chalta hai. Ye business logic handle karta hai, database se data store ya fetch 
karta hai, client ke requests ko process karta hai aur frontend ko response bhejta hai. Simple words me, backend ek engine ki tarah hota hai jo 
background me kaam karke app ko properly chalata hai."
[in english] 
"Backend is the part of an application that runs on the server side. It handles business logic, manages databases, processes client requests, 
and sends responses to the frontend. In simple terms, it is the engine of an application that works behind the scenes to make everything function 
properly."

*/

/*                                                       Client-Server Architecture Kya Hai?
                                                 ++++++++++++++++++++++++++++++++++++++++++++++

        🔹 Flow (Step by Step)

"Jab user frontend pe koi action karta hai, client HTTP request bhejta hai server ko. Server request ko process karta hai, middleware aur business
 logic apply karta hai, database se data fetch ya update karta hai agar zarurat ho, aur response client ko bhejta hai. Client data ko render karke
 user ko display karta hai. Ye flow frontend, backend aur database ke beech smooth communication ensure karta hai."

Client sends request → User frontend se koi action karta hai (search, login, etc.).

Server receives request → Server request ko handle karta hai (Express/Node.js).

Server processes data → Agar data database se chahiye, server database me query karta hai.

Server sends response → Server processed data ko client ko bhejta hai.

Client displays result → Frontend user ko result dikhata hai.


English:
"Client-Server Architecture is a design model where the client (frontend) sends requests to the server (backend), the server processes these
 requests, interacts with the database if needed, and sends the response back to the client. This allows dynamic communication and proper separation 
 of responsibilities."

Hinglish:
"Client-Server Architecture me client (frontend) request bhejta hai server (backend) ko, server request process karta hai, database se data fetch
 ya store karta hai, aur response client ko wapas bhejta hai. Isse dynamic communication possible hota hai aur responsibilities clearly separate 
 hoti hain."

 🔹 Complete Backend Flow (Client → Server → Database → Client)
Step by Step Process:

User Action (Client Side)

User frontend par koi action karta hai: login, search, add to cart, submit form, etc.

Frontend (browser/mobile app) request ko prepare karta hai (HTTP request).

Request Sent to Server

Request frontend se backend server (Node.js + Express) ko jaati hai.

Request me URL, method (GET, POST, PUT, DELETE) aur data (body/parameters) hota hai.

Server Receives Request

Server request ko route karta hai (Express routes).

Middleware se request process hoti hai (authentication, logging, validation).

Server Interacts with Database

Agar request me data fetch/update/store karna hai, server database (MongoDB) ko query bhejta hai.

Database query process hoti hai → data retrieve ya modify hota hai.

Server Processes Response

Server business logic apply karta hai (filtering, calculations, formatting).

Response JSON/HTML/XML format me client ke liye ready hota hai.

Response Sent to Client

Server processed data ko client ko bhejta hai.

Client Displays Result

Frontend received data ko render karta hai → user screen par result dekhta hai (table, cards, messages, notifications).




  +-------+       HTTP Request       +---------+       Query      +---------+
  |       | --------------------->  |         | ----------------> |         |
  | Client|                         | Server  |                   | Database|
  |(User) | <---------------------  |         | <---------------- |         |
  +-------+       HTTP Response      +---------+       Result     +---------+
       |                               |   ^
       |                               |   |
       |  Render/Display               |   |
       +-------------------------------+---+


*/

/*                                                       what is http ?
                                         +++++++++++++++++++++++++++++++++++++++++++++++++

    "HTTP ek protocol hai jo client aur server ke beech communication ke liye use hota hai. Client request bhejta hai (GET, POST, etc.) URL, 
    headers aur optional body ke saath. Server request process karta hai, database se data fetch/update karta hai agar zarurat ho, aur response
     bhejta hai status code, headers aur body ke saath. Isse frontend aur backend smoothly communicate karte hain."

*/

/*                                                       HTTP aur HTTPS me kya difference hai?
                                        +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

HTTP, yaani HyperText Transfer Protocol, ek protocol hai jo client aur server ke beech communication ke liye use hota hai. Ye simple aur fast hai,
 lekin secure nahi hai, kyunki data plain text me transfer hota hai. Iska matlab hai ki koi bhi attacker network traffic capture karke data read 
 ya modify kar sakta hai. HTTP default port 80 use karta hai aur URL me http:// prefix hota hai. Ye method static websites ya testing ke liye use 
 hota hai, lekin sensitive data ke liye secure nahi hai. HTTP me data encryption nahi hoti, server authentication nahi hoti, aur data integrity ki
 guarantee bhi nahi hoti.

HTTPS, yaani HyperText Transfer Protocol Secure, HTTP ka secure version hai jo SSL/TLS encryption ka use karta hai. HTTPS client aur server ke
 beech data ko encrypt karta hai, isliye communication confidential, tamper-proof aur authenticated hoti hai. Jab browser HTTPS request bhejta hai, 
 server SSL/TLS certificate provide karta hai, jise browser verify karta hai aur secure session key exchange hota hai. Isse ensure hota hai ki client 
 sahi server ke saath communicate kar raha hai aur data safe rahe. HTTPS default port 443 use karta hai aur URL me https:// prefix ke saath padlock 
 symbol dikhta hai, jo user ko trust aur security feel karata hai. Ye sensitive operations, jaise login, payment, banking, aur personal data transfer 
 ke liye mandatory hai. HTTPS data integrity maintain karta hai, encryption ke wajah se attackers data read ya modify nahi kar sakte. Iska ek aur
  advantage ye hai ki Google SEO me HTTPS websites ko prefer karta hai, isliye SEO ranking bhi improve hoti hai.

"SSL (Secure Sockets Layer) aur TLS (Transport Layer Security) security protocols hain jo client aur server ke beech data encrypt karte hain. 
 SSL purana version hai, TLS updated aur secure version hai. Ye encryption, authentication, data integrity aur trust ensure karte hain aur HTTPS
 ka backbone hain."

Short me, HTTP fast aur basic communication ke liye use hota hai lekin insecure hai, jabki HTTPS encrypted, secure aur reliable communication
provide karta hai, jo modern websites aur sensitive operations ke liye essential hai.





HTTP – Key Points
: Client aur server ke beech data send aur receive karta hai.
: Simple protocol hai, data plain text me jata hai → fast communication.
: Web pages aur resources fetch karta hai.
: Server request process karta hai aur response return karta hai without encryption.
: Port 80 use karta hai.
: Standard port for non-secure HTTP communication.
: Browser me padlock symbol nahi dikhata.
: Data unencrypted hota hai, security aur trust nahi hoti.
: Data easily readable aur tamperable hota hai.
: Encryption nahi hoti, isliye attacker read ya modify kar sakta hai.

HTTPS – Key Points
: Client aur server ke beech encrypted data transfer karta hai.
: SSL/TLS encryption use hota hai → data confidential aur secure rehta hai.
: Server authenticate karta hai.
: SSL/TLS certificate verify hota hai → client sure hota hai ki correct server ke saath communicate kar raha hai.
: Data integrity maintain karta hai.
: Encryption aur session key ensure karte hain ki data transfer ke dauran modify na ho.
: Browser me padlock aur https:// symbol show karta hai.
: Users ko trust aur security feel karana → sensitive operations ke liye reliable.
: Port 443 use karta hai aur SEO me preference deta hai.
: Standard secure communication port hai aur Google HTTPS websites ko prefer karta hai.


*/

/*                                                       HTTP METHODS
                                          +++++++++++++++++++++++++++++
"HTTP methods batate hain client server pe kya action perform karna chahta hai. GET data fetch karta hai, POST naya data create karta hai, PUT 
resource replace karta hai, PATCH partial update karta hai, DELETE data remove karta hai, HEAD sirf headers fetch karta hai, aur OPTIONS server 
kaunsa methods allow karta hai ye check karta hai. Client request bhejta hai, server process karta hai aur response return karta hai."

*/

/*                                                       REST API
                                ++++++++++++++++++++++++++++++++++++++++++++++
                                
"REST API ek tarika hai jisme client (website ya app) server ke saath communicate karke data fetch, create, update, ya delete karta hai HTTP
 methods (GET, POST, PUT, DELETE) use karke."
"REST API basically client aur server ke beech data exchange ka simple aur standard tarika hai."

*/

/*                                                       what is node js and express js ?
                               +++++++++++++++++++++++++++++++++++++++++++++++++++++++

Node.js ek JavaScript runtime environment hai jo server side pe JavaScript run karne deta hai, yani browser ke bahar. Iska main purpose hai backend 
development me JavaScript use karna aur fast, scalable aur efficient applications banana. Node.js asynchronous aur event-driven hai, jiska matlab hai
ki multiple tasks simultaneously execute ho sakte hain without blocking the server. Ye single-threaded hota hai lekin event loop ke through high
performance aur scalability provide karta hai. Node.js cross-platform hai aur isme NPM (Node Package Manager) ka support hota hai, jisse libraries 
aur modules easily install aur manage kiye ja sakte hain. Node.js ke through full-stack JavaScript possible hai, jisme frontend aur backend dono 
me JavaScript ka use karke code reuse kiya ja sakta hai.

Express.js Node.js ka lightweight web framework hai jo server-side applications aur APIs build karna easy banata hai. Express.js routing system 
provide karta hai jisse URL endpoints define karke requests handle karna simple ho jata hai. Isme middleware support bhi hota hai, jisse logging, 
authentication, aur error handling jaise functions implement karna easy hota hai. Express.js HTTP methods (GET, POST, PUT, DELETE) ko efficiently 
handle karta hai aur dynamic HTML pages generate karne ke liye template engines (EJS, Pug, Handlebars) ka support bhi provide karta hai. Ye framework 
fast, lightweight aur scalable hai, jisse large applications build karna simple ho jata hai.

Summary: Node.js ek fast aur scalable server-side runtime hai jo JavaScript use karta hai, aur Express.js uska framework hai jo server-side 
development ko simple, structured aur efficient banata hai, routing, middleware aur APIs ke through.


*/

/*                                                       Backend setup
                                             +++++++++++++++++++++++++++++++++++


                                   🏗 Folder Structure (Basic to Industry-Ready)                         

                                        backend/
                                          │
                                          ├── server.js            → main entry point (starts the app)
                                          ├── package.json         → dependencies & scripts
                                          │
                                          ├── config/
                                          │   └── db.js            → database connection file (MongoDB/MySQL)
                                          │
                                          ├── controllers/
                                          │   └── userController.js → logic for handling requests
                                          │
                                          ├── models/
                                          │   └── userModel.js      → schema/model (MongoDB)
                                          │
                                          ├── routes/
                                          │   └── userRoutes.js     → API routes (like /api/users)
                                          │
                                          ├── middleware/
                                          │   └── authMiddleware.js → token validation, authentication
                                          │
                                          └── .env                  → environment variables (PORT, DB_URL, SECRET_KEY)



  ====>                                   Initialization steps for installation
                                   
                                           npm init -y
                                           npm install express mongoose dotenv cors


                                   ⚡ Step 1: Create server.js

                                           import express from "express";
                                           import dotenv from "dotenv";
                                           import cors from "cors";
                                           import connectDB from "./config/db.js";
                                           import userRoutes from "./routes/userRoutes.js";
                                           
                                           dotenv.config();
                                           const app = express();
                                           
                                           app.use(cors());
                                           app.use(express.json());
                                           
                                           connectDB();
                                           
                                           app.use("/api/users", userRoutes);
                                           
                                           app.get("/", (req, res) => {
                                             res.send("API is running...");
                                           });
                                           
                                           const PORT = process.env.PORT || 5000;
                                           app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


       📖 Meaning:

          express → Node.js ka framework hai jo HTTP requests handle karne me help karta hai. (easy route system deta hai)
          
          dotenv → .env file se environment variables read karne ke liye (like DB URL, PORT, etc.) 
            👉dotenv.config();
          
          cors → Cross-Origin Resource Sharing enable karta hai.
            👉app.use(cors());

            👉 Matlab agar frontend React (localhost:3000) aur backend (localhost:5000) alag ports pe ho — to dono communicate kar sakein.
          
          connectDB → ye hamara MongoDB connection function hai jo DB connect karega.
            👉 connectDB();
          
          userRoutes → isme user-related API routes define honge (like /api/users).

            👉 app.use("/api/users", userRoutes);




                                    🧩 Step 2: Database Connection (config/db.js)

                                            import mongoose from "mongoose";

                                            const connectDB = async () => {
                                              try {
                                                await mongoose.connect(process.env.MONGO_URI);
                                                console.log("MongoDB Connected Successfully ✅");
                                              } catch (error) {
                                                console.error("DB Connection Failed ❌", error.message);
                                                process.exit(1);
                                              }
                                            };
                                            
                                            export default connectDB;



       📖 Meaning:

       mongoose → MongoDB ke saath kaam karne ke liye ODM (Object Data Modeling) library hai.
       
       mongoose.connect() → database se connection banata hai.
       
       try...catch → agar connection fail ho jaye to error handle karta hai.
       
       process.exit(1) → agar DB connect nahi hui to poora server band kar deta hai (fail safe).
       
       export default connectDB → is function ko server.js me import karke use kar sakte hain.


                                   🧩 3️⃣ models/userModel.js

                                            import mongoose from "mongoose";
         
                                            const userSchema = new mongoose.Schema({
                                              name: String,
                                              email: String,
                                              password: String,
                                            });
                                            
                                            const User = mongoose.model("User", userSchema);
                                            export default User;




       📖 Meaning:

        Schema → database me document ka structure define karta hai (like table ka structure SQL me).

        model() → schema se ek model banata hai jiske through CRUD operations (find, save, delete, etc.) kar sakte ho.


                                  🧠 4️⃣ controllers/userController.js


                                           import User from "../models/userModel.js";

                                           export const getUsers = async (req, res) => {
                                             const users = await User.find();
                                             res.json(users);
                                           };
                                           
                                           export const addUser = async (req, res) => {
                                             const { name, email, password } = req.body;
                                             const newUser = new User({ name, email, password });
                                             await newUser.save();
                                             res.status(201).json(newUser);
                                           };

      
       📖 Meaning:

       

       Controller me actual logic hota hai jo route ke call hone par execute hota hai.
       
       getUsers() → DB se sabhi users laata hai aur frontend ko bhejta hai.
       
       addUser() → frontend se data leke DB me store karta hai.
       
       res.json() → data ko JSON form me response karta hai.


                                  🚏 5️⃣ routes/userRoutes.js

                                           import express from "express";
                                           import { getUsers, addUser } from "../controllers/userController.js";
                                           
                                           const router = express.Router();
                                           
                                           router.get("/", getUsers);
                                           router.post("/", addUser);
                                           
                                           export default router;


       📖 Meaning:

        express.Router() → mini Express app jisme hum chhoti chhoti routes likhte hain.
        
        router.get() → GET request handle karega (data fetch karna).
        
        router.post() → POST request handle karega (data add karna).
        
        export default router → is router ko server.js me use karte hain.    
        
        
                                  🧾 6️⃣ .env

                                          
                                          PORT=5000
                                          MONGO_URI=mongodb+srv://your-db-url


       📖 Meaning:

        .env file me sensitive data hota hai (like DB URL, secret keys).
        
        Ye version control me push nahi hoti (security ke liye).                                   

*/

/*                                                       cunstructor,Middileware
                                      +++++++++++++++++++++++++++++

cunstructor:
Middileware :
middleware root level or route level ya specific 
jab bhi aap server ke instance ko ya app ke andar use name ki method ko call karte he tab use root level middleware kaha jata he 
jab aap kisi routes me jakar middleware ko attache kar dete ho 

 middleware function: esa fun jo req, res use fun ko middleware fun kahte 

 esa fun jo 3 parameter leta he vo hi middleware hota he 




*/

/*                                                       🧩 Middleware Kya Hota Hai?
                                                ++++++++++++++++++++++++++++++++++++++++++++++

👉 Middleware ek function hota hai jo request (req) aur response (res) ke beech me kaam karta hai.
Ye request ko modify, check, log, ya filter kar sakta hai before wo route tak पहुंचे.

Matlab — jab koi request aati hai, to middleware use intercept karta hai aur kuch kaam karke aage next() function se route handler tak bhejta hai.


const express = require("express");
const app = express();

const myMiddleware = (req, res, next) => {
  console.log("Middleware Chala!");
  next(); // aage route ko call karega
};

app.use(myMiddleware); // global middleware

app.get("/", (req, res) => {
  res.send("Hello from Homepage!");
});

app.listen(5000, () => console.log("Server running"));


🧩 1️⃣ Root Level Middleware (Application-Level Middleware)
    📘 Definition:

Root-level middleware wo hota hai jo poori application par apply hota hai,
matlab har route ke liye chalega chahe request /, /users, /products ya /about par ho.

Ye middleware ko app.use() ke sath lagaya jata hai.

import express from "express";
const app = express();

// ✅ Root Level Middleware
app.use((req, res, next) => {
  console.log("🌐 Root level middleware executed");
  console.log("Request URL:", req.url);
  next(); // aage route par bhejta hai
});

app.get("/", (req, res) => {
  res.send("Welcome to Homepage!");
});

app.get("/about", (req, res) => {
  res.send("This is About Page!");
});

app.listen(5000, () => console.log("Server running on port 5000"));


🧩 2️⃣ Route Level Middleware (Router-Level Middleware)
📘 Definition:

Route-level middleware sirf specific route(s) ke liye apply hota hai.
Matlab agar tumhe sirf /users ke route par koi checking lagani hai (jaise authentication), to us route ke sath middleware laga sakte ho.

Ye middleware router.get(), router.post(), etc. ke andar ya pehle likha jata hai.

import express from "express";
const app = express();

// ✅ Route Level Middleware
const checkAuth = (req, res, next) => {
  const loggedIn = false; // suppose user login nahi hai
  if (loggedIn) {
    console.log("✅ User Authenticated");
    next(); // aage route chalane do
  } else {
    res.status(401).send("❌ Unauthorized Access");
  }
};

app.get("/public", (req, res) => {
  res.send("This is a public route — anyone can access");
});

// ❗ Sirf is route par middleware chalega
app.get("/dashboard", checkAuth, (req, res) => {
  res.send("Welcome to your dashboard");
});

app.listen(5000, () => console.log("Server running on port 5000"));


*/


/*                                                        What is authentication 
                               ++++++++++++++++++++++++++++++++++++++++++++++++++++




*/

/*                                                        STEPS OF CONNECT THE FRONTEND + BACKEND + MONGODB

                                          Full Flow Explanation: Frontend + Backend + MongoDB


                                          Step 1: Project Setup
                                          
                                          Folder Structure
                                          
                                          Ek main folder → backendProject
                                          
                                          Uske andar do separate folders:
                                          
                                          frontend → React app
                                          
                                          backend → Node.js + Express app
                                          
                                          Frontend Setup
                                          
                                          npx create-react-app frontend
                                          
                                          Login aur Register page banaye → simple forms
                                          
                                          Backend Setup
                                          
                                          npm init -y → package.json
                                          
                                          Install dependencies:
                                          
                                          express → server create karne ke liye
                                          
                                          mongoose → MongoDB ke liye
                                          
                                          cors → frontend aur backend ko connect karne ke liye
                                          
                                          dotenv → environment variables ke liye
                                          
                                          Create server.js → backend ka main file
                                          
                                          Create .env → MongoDB URI aur port store karne ke liye
                                          
                                          Step 2: Database Connection
                                          
                                          MongoDB Atlas ya Local MongoDB setup kiya
                                          
                                          .env me DB URI: MONGO_URI=mongodb://127.0.0.1:27017/mernproject
                                          
                                          Backend me mongoose.connect(process.env.MONGO_URI)
                                          
                                          Agar connection successful → console me message aata hai
                                          
                                          Concept:
                                          
                                          MongoDB ek NoSQL database hai → data JSON format me store hota hai
                                          
                                          Collection → table jaisa
                                          
                                          Document → row jaisa
                                          
                                          Step 3: Backend Routing
                                          
                                          User model:

  # fRONTED PART creating login and register page 

       import React, { useState } from "react";
       import axios from "axios";
       
       function Register() {
         const [user, setUser] = useState({ name: "", email: "", password: "" });
       
         const handleChange = (e) => {
           setUser({ ...user, [e.target.name]: e.target.value });
         };
       
         const handleSubmit = async (e) => {
           e.preventDefault();
           try {
             const res = await axios.post("http://localhost:5000/api/users/register", user);
             console.log(res.data);
             alert(res.data.message);
             setUser({ name: "", email: "", password: "" });
           } catch (err) {
             console.error(err.response.data);
             alert(err.response.data.message);
           }
         };
       
         return (
           <div className="form-container">
             <h2>Register</h2>
             <form onSubmit={handleSubmit}>
               <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={user.name} />
               <input type="email" name="email" placeholder="Email" onChange={handleChange} value={user.email} />
               <input type="password" name="password" placeholder="Password" onChange={handleChange} value={user.password} />
               <button type="submit">Register</button>
             </form>
           </div>
         );
       }
       
       export default Register;


  import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", login);
      console.log(res.data);
      alert(res.data.message);
      setLogin({ email: "", password: "" });
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={login.email} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={login.password} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;




#Backend part steps 

   Folder Structure (Beginner-friendly)
       backendProject/
       │
       ├─ server.js
       ├─ .env
       ├─ package.json
       ├─ config/
       │   └─ db.js
       ├─ controllers/
       │   └─ userController.js
       ├─ models/
       │   └─ userModel.js
       └─ routes/
           └─ userRoutes.js
       

step:1
🔹 1️⃣ .env file

       MONGO_URI=mongodb://localhost:27017/mydb
       PORT=5000

step:2
🔹 2️⃣ config/db.js
       const mongoose = require('mongoose');

       const connectDB = async () => {
         try {
           await mongoose.connect(process.env.MONGO_URI);
           console.log('✅ MongoDB connected successfully');
         } catch (err) {
           console.error('❌ MongoDB connection failed:', err.message);
           process.exit(1);
         }
       };
       
       module.exports = connectDB;
       
step:3
🔹 3️⃣ models/userModel.js

      const mongoose = require('mongoose');

      const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
      }); 
      
      module.exports = mongoose.model('User', userSchema);

step:4
🔹 4️⃣ controllers/userController.js

        const User = require('../models/userModel');
       
       // Register
       const registerUser = async (req, res) => {
         try {
           const { name, email, password } = req.body;
       
           if (!name || !email || !password) {
             return res.status(400).json({ message: 'Please fill all fields' });
           }
       
           const existingUser = await User.findOne({ email });
           if (existingUser) {
             return res.status(400).json({ message: 'User already exists' });
           }
       
           const newUser = await User.create({ name, email, password });
           console.log('New user created:', newUser);
       
           res.status(201).json({
             message: 'User registered successfully',
             user: newUser
           });
         } catch (err) {
           console.error('Error in registration:', err);
           res.status(500).json({ message: 'Something went wrong' });
         }
       };
       
       // Login
       const loginUser = async (req, res) => {
         try {
           const { email, password } = req.body;
       
           const user = await User.findOne({ email });
           if (!user) {
             return res.status(404).json({ message: 'User not found' });
           }
       
           if (user.password !== password) {
             return res.status(400).json({ message: 'Invalid password' });
           }
       
           res.json({
             message: 'Login successful',
             user
           });
         } catch (err) {
           console.error('Error in login:', err);
           res.status(500).json({ message: 'Something went wrong' });
         }
       };
       
       module.exports = { registerUser, loginUser };

step:5
🔹 5️⃣ routes/userRoutes.js

       const express = require('express');
       const router = express.Router();
       const { registerUser, loginUser } = require('../controllers/userController');
       
       router.post('/register', registerUser);
       router.post('/login', loginUser);
       
       module.exports = router;
       
      

step:6
🔹 6️⃣ server.js

       const express = require('express');
       const dotenv = require('dotenv');
       const cors = require('cors');
       const connectDB = require('./config/db');
       
       dotenv.config();
       connectDB();
       
       const app = express();
       app.use(cors());
       app.use(express.json());
       
       const userRoutes = require('./routes/userRoutes');
       app.use('/api/users', userRoutes);
       
       app.get('/', (req, res) => res.send('Backend is running 🚀'));
       
       const PORT = process.env.PORT || 5000;
       app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

step:7
🔹 7️⃣ Test with Postman

       Register

       Method: POST
       
       URL: http://localhost:5000/api/users/register
       
       Headers: Content-Type: application/json
       
       Body:

        {
          "name": "Vijay",
          "email": "vijay@gmail.com",
          "password": "123456"
        }
        
        Login
        
        Method: POST
        
        URL: http://localhost:5000/api/users/login
        
        Headers: Content-Type: application/json
        
        Body:

        {
         "email": "vijay@gmail.com",
         "password": "123456"
       }
       
       
*/

/*                                                       Backend me Validation karne ke tarike  

🧱 Step 1: Mongoose Schema Validation

👉 Ye basic rules MongoDB ke level par check karega (jaise required fields, min length, unique, etc.)


Mongoose me sirf required aur minlength hi nahi, balki 10+ tarah ke built-in validators hote hain 👇

Main sabko explain karta hu example ke sath taaki tum directly apne schema me use kar sako 👇

🧩 1️⃣ required

➡ Field empty nahi hona chahiye.

name: {
  type: String,
  required: [true, "Name is required"]
}

🧩 2️⃣ minlength / maxlength

➡ String ki length ke liye.
password: {
  type: String,
  minlength: [6, "Password must be at least 6 characters"],
  maxlength: [20, "Password cannot exceed 20 characters"]
}

🧩 3️⃣ match (Regex Validation)

➡ Specific pattern ke liye (jaise email format).
email: {
  type: String,
  match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
}


🧩 4️⃣ enum

➡ Field ke values sirf limited options me se honi chahiye.

role: {
  type: String,
  enum: ["user", "admin", "manager"],
  default: "user"
}

🧩 5️⃣ unique

➡ Duplicate entry nahi honi chahiye (mostly email ke liye use hota hai).

email: {
  type: String,
  unique: true
}

🧩 6️⃣ default

➡ Agar value na di jaye to automatic default value set karta hai.

status: {
  type: String,
  default: "active"
}

🧩 7️⃣ validate (Custom Validator Function)

➡ Apna custom logic likhne ke liye.

age: {
  type: Number,
  validate: {
    validator: function(value) {
      return value >= 18;
    },
    message: "Age must be at least 18"
  }
}

🧩 8️⃣ min / max

➡ Number ke liye limit.

price: {
  type: Number,
  min: [0, "Price cannot be negative"],
  max: [10000, "Price too high"]
}


🧩 9️⃣ trim

➡ Extra spaces automatically remove karta hai.
name: {
  type: String,
  trim: true
}

🧩 🔟 lowercase / uppercase

➡ Automatic case conversion.

email: {
  type: String,
  lowercase: true
}

🧩 1️⃣1️⃣ timestamps

➡ Schema ke level par create/update time automatically add karta hai.

const userSchema = new mongoose.Schema({
  name: String,
  email: String
}, { timestamps: true });


💡 Example Full Schema

  
    const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    minlength: [3, "Min 3 characters"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"]
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [6, "At least 6 characters"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  age: {
    type: Number,
    min: [18, "Must be 18 or older"]
  }
}, { timestamps: true });

*/

/*                                                       JWT TOkens
                                          ================================   
                                          
🔹 What is JWT?

JWT (JSON Web Token) ek secure token-based authentication method hai.
Ye mainly use hota hai client aur server ke beech data securely transmit karne ke liye.

Ye ek token hota hai (ek string jaisa) jo user ke identity ko represent karta hai.

Jab user login karta hai, server uske liye ek JWT token create karta hai aur client ko de deta hai.

Client har request ke saath wo token bhejta hai → server verify karta hai → agar valid hua to access deta hai.

🔹 JWT ke 3 Main Components hote hain

JWT 3 parts me divided hota hai (dot . se separate):

 xxxxx.yyyyy.zzzzz




Part	Name                                       	Description
1️⃣	Header                	Token ka type (JWT) aur algorithm (e.g. HS256) batata hai.
2️⃣	Payload               	User ke data (claims) rakhta hai jaise id, email, role.
3️⃣	Signature	              Token ko verify karta hai ke data change nahi hua. Ye secret key se banaya jata hai.


for example 

Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "userId": "12345",
  "email": "user@gmail.com",
  "role": "admin"
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)

🔹 JWT Flow Diagram (Text-based)

   +-----------+                         +------------+
   |   Client  |                         |   Server   |
   +-----------+                         +------------+
         |                                       |
         | 1. Send Login Request (email, pwd)    |
         |-------------------------------------->|
         |                                       |
         | 2. Verify Credentials (DB check)      |
         |                                       |
         | 3. Create JWT (Header+Payload+Sign)   |
         |<--------------------------------------|
         |                                       |
         | 4. Store JWT in localStorage          |
         |                                       |
         | 5. Send JWT in Authorization Header   |
         |-------------------------------------->|
         |                                       |
         | 6. Verify Token using secret key      |
         |                                       |
         | 7. If valid → Send protected data     |
         |<--------------------------------------|

🔹 JWT Flow Explanation (Step-by-Step)
🧩 Step 1: User Login

User email & password ke sath server ko request bhejta hai.

🧩 Step 2: Server Validation

Server DB me check karta hai ki user exist karta hai ya nahi.

🧩 Step 3: Token Generation

Agar credentials sahi hain:

Server ek JWT generate karta hai

Usme user info + secret key use hoti hai

Server token client ko send karta hai

🧩 Step 4: Token Storage

Client token ko localStorage ya cookie me save karta hai.

🧩 Step 5: Sending Request with Token

Next time jab client protected API call karega, wo token ko Authorization header me bhejta hai:

Authorization: Bearer <token>

🧩 Step 6: Token Verification

Server token ko verify karta hai using same secret key.
Agar token valid hai → access milta hai,
agar invalid hai → “Unauthorized” response milta hai.



Live example for JWT TOKEN 

Maan lo hum ek E-commerce website bana rahe hain —

User login karega → token milega → phir usi token se hi wo apna profile ya order dekh paayega.

🔹 Step-by-Step Live Example (with JWT Flow)
🧩 Step 1: User Login Request

Client (browser) form me fill karta hai:

 Email: user@gmail.com
 Password: 12345

 Aur ye request bhejta hai backend par:

 POST /login
Content-Type: application/json

{
  "email": "user@gmail.com",
  "password": "12345"
}

🧩 Step 2: Server Credentials Verify karta hai

Backend (Express + MongoDB) code check karta hai:

// Express route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Database me user find karo
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Agar sahi mila to JWT generate karenge (next step)
});

Yaha tak humne sirf check kiya ke user exist karta hai ya nahi.


🧩 Step 3: JWT Token Generate karna

Agar email-password sahi hai, to hum token banate hain:

import jwt from "jsonwebtoken";

const token = jwt.sign(
  { id: user._id, email: user.email, role: "customer" },
  "mySecretKey",
  { expiresIn: "1h" }
);

res.json({ message: "Login successful", token });

✅ Server ab client ko token bhejta hai, jaise:

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}

🧩 Step 4: Client Token Store karta hai

Frontend (React ya JS) me hum token ko store karte hain:
  
 localStorage.setItem("token", data.token);

 Taaki har future request me hum ye token bhej saken.

🧩 Step 5: Client Protected API Call karta hai

Ab user apna profile dekhna chahta hai → to hum token ke sath request bhejenge:

GET /profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

🧩 Step 6: Server Token Verify karta hai

Backend code me ek middleware hota hai jo har request se pehle token verify karta hai:

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ message: "Token missing" });

  jwt.verify(token, "mySecretKey", (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = user; // user data save
    next();
  });
}

// Protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: "Profile accessed", user: req.user });
});


👉 Agar token valid hua → user ka profile data milta hai
👉 Agar token invalid ya missing hua → “Unauthorized access” error milta hai

✅ Conclusion:

JWT ek secure bridge hai jo client aur server ke beech authentication maintain karta hai.

Login hone par token milta hai,

har baar password ke bajay wo token authorize karta hai.
Isse fast, stateless, aur secure authentication system banta hai. 🔒





*/

/*                                                     Websocket & .IO
                                       --------------------------------------------

1. WebSocket Kya Hai?

Definition:

WebSocket ek bi-directional (दोनों दिशाओं में), real-time communication protocol hai jo client aur server ke beech ek permanent connection 
banata hai.

🔁 Normal HTTP Request vs WebSocket

| Feature       | HTTP                      | WebSocket                           |
| ------------- | ------------------------- | ----------------------------------- |
| Communication | One-way (Client → Server) | Two-way (Client ↔ Server)           |
| Connection    | Short-lived               | Persistent (long-lived)             |
| Latency       | High                      | Very Low                            |
| Example       | REST APIs                 | Real-time apps (chat, live updates) |







*/