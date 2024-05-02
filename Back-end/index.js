import app from "./app.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import adminDAO from "./dao/adminDAO.js"
import containerDAO from "./dao/containersDAO.js"
import visionDAO from "./dao/visionsDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT

MongoClient.connect(
    process.env.CONTAINERS_DB_URI,
    {
        minPoolSize: 50,

        useBigInt64 : true,
      },

).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
    .then(async client => {
        await adminDAO.injectDB(client)
        await containerDAO.injectDB(client)
        await visionDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

