import { app} from "./server.js";
import "dotenv/config"



const server = app.listen( process.env.Server_port,()=>{
    console.log("Server is running on port :",process.env.Server_port)
    }
);