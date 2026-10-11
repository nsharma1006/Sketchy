import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware.js";
import {JWT_PASS} from "@repo/backend-common/config"
import {SignInSchema , SignUpSchema , RoomSchema} from "@repo/common/schema"
import {prisma} from "@repo/db"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"; "cookie-parser"
import cors from "cors"
import type { DecodedPayload } from "./gloabal.js";
import { decode } from "node:punycode";

const app = express();


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000" , "http://192.168.0.182:3000",],
    credentials: true,
  })
);
app.use(cookieParser())

app.get("/health", (req, res) => {
  res.json({
    message: "HTTP Backend is healthy",
  });
});

app.post("/signup", async(req, res) => {
  // Sign Up
  const result = SignUpSchema.safeParse(req.body)
  if(!result.success){
    return res.json({
      "message" : "Invalid input"
    })
  }
  console.log("========== SIGN UP ==========");
  const hashedPassword = await bcrypt.hash(result.data.password, 10); 
  try {
    const user = await prisma.user.create({
    data :{
      email : result.data.email,
      password : hashedPassword,
      name : result.data.name
    }
  })
  return res.json({
    userId : user.id,
  })
    
  } catch (error) {
  
    console.error("========== PRISMA ERROR ==========");
  console.error(error);
  console.error(error instanceof Error ? error.message : String(error));
  console.error("==================================");

  return res.status(500).json({
    error: error instanceof Error ? error.message : error,
  });
  }
  
});
app.get("/me" ,  (req , res)=>{
  const token = req.cookies["JWT_TOKEN"]
  if(!token){
    return res.json({message : "Unauthorized"})
  }
  const decoded = jwt.verify(
      token,
      JWT_PASS,
    ) as DecodedPayload;
  const userId = decoded.userId
  if(!userId){
    return res.json({
      message : "Not authorized"
    })
  }
    return res.json({
      userId
    });
})
app.post("/signin", async (req, res) => {
  const result = SignInSchema.safeParse(req.body)
  if(!result.success){
    return res.json({
      "message" : "Invalid input"
    })
  }
  const findingUser = await prisma.user.findUnique({
    where:{
      email : result.data.email
    }
  })
  if(!findingUser){
    return res.json({
      "message" : "Such account doesn't exist"
    })
  }

  const isMatched = await bcrypt.compare(result.data.password, findingUser.password)
  if(!isMatched){
    return res.json({
      "message" : "Password is incorrect"
    })
  }

  const token = jwt.sign(
    {
      userId: findingUser.id,
    },
    JWT_PASS || "",
  );
  res.setHeader("authorization" , `Bearer ${token}`)
  res.cookie("JWT_TOKEN" , token)
  return res.json({ token });
});


app.post("/room" , middleware , async (req , res) => {
  const parsedData = RoomSchema.safeParse(req.body)
  if(!parsedData.success){
    return res.json({
      "message" : "Invalid input"
    })
  }
  const userId = req.userId
  if(!userId){
    return res.json({
      "message" : "User not authenticated"
    })
  }

  const room = await prisma.room.create({
    data : {
      name : parsedData.data.name,
      adminId : userId
    }
  })

  return res.json({
    roomId : room.id,
  })
})

app.get("/chats/:roomId" , async(req , res) => {
  const roomId = Number(req.params.roomId)
  const chats = await prisma.chat.findMany({
    where:{
      roomId : roomId
    },
    orderBy : {
      createdAt : "desc"
    },
    take :50
  }) 
  return res.json({
    chats : chats
  })
})
app.get("/shapes/:roomId" , async(req , res) => {
  const roomId = Number(req.params.roomId)
  const shapes = await prisma.shape.findMany({
    where:{
      roomId : roomId
    },

  }) 
  return res.json({
    shapes : shapes
  })
})

app.get("/room/:roomName" , async(req , res) => {
  const roomName = req.params.roomName
  const room = await prisma.room.findFirst({
    where : {
      name : roomName
    }
  })
  return res.json({
    room
  })
})
app.get("/room" , async(req , res) => {
  const room = await prisma.room.findMany({})
  return res.json({
    room
  })
})

app.listen(3001, () => console.log("HTTP Backend is running on port 3001"));
