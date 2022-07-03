const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/index")

app.use(express.json())
app.use('/api', router)

//port
const PORT = config.get("port") || 5000

const start = async () => {
    try {
        //connect to mongo db
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        //start server
        app.listen(PORT, () => {
            console.log(`App has been stated on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()