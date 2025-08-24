// import express, { json } from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js"

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();
// app.use(express.json()); // allows json data in the req.body


// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
// }


// app.listen(PORT, () => {
//     connectDB();
//     console.log("Server started at http://localhost:" + PORT);
// })




// src/services/square-api.js

import axios from 'axios';

// Replace with your actual Square Location ID and Personal Access Token from environment variables
const LOCATION_ID = 'sandbox-sq0idb-5Qdd7kMOexMASroUY-H52Q';
const ACCESS_TOKEN = 'EAAAl40Esg3madTIJ7Im19H1t0yjAxjpujf4y7I3mJ3OYCqv3NpATytoJTx9CeYg';

const apiClient = axios.create({
  baseURL: 'https://connect.squareupsandbox.com/v2', // Use sandbox for testing
  headers: {
    'Square-Version': '2025-08-01', // Use the current API version
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const getCatalogItems = async () => {
  try {
    const response = await apiClient.post('/catalog/search', {
      object_types: ['ITEM'],
      query: {
        location_ids: [LOCATION_ID],
      },
    });
    return response.data.objects;
  } catch (error) {
    console.error('Error fetching catalog items:', error);
    return [];
  }
};
