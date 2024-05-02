import express from "express"
import cors from "cors"
import admin from "./route/admin.route.js"
import containers from "./route/containers.route.js"
import visions from "./route/visions.route.js"
import multer from "multer"
import bodyParser from 'body-parser';


const app = express()

app.use(cors())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


app.use(express.json())

// app.use(multer({ storage: multer.memoryStorage()}).single('file'));

app.use("/", admin)
app.use("/container",containers)
app.use("/vision",visions)
app.use("*", (req, res) => res.status(404).json({error : "not found"}))

export default app