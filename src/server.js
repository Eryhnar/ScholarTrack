import { dbConnection } from "./database/db.js";
import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT || 4001;

dbConnection()
.then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("Error connecting to database: ", error);
});