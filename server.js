const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv")



dotenv.config({path:"./config/.env"})
process.on("uncaughtException",(err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting the server due to UnCaught Exception');
    process.exit(1); // to get exit
})

connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting the server due to UnHandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});