import axios from "axios";
const API_BASE_URL = "http://localhost:4000/user/";

// ✅ Helper function to make requests with Fetch
const fetchAPI = async (endpoint, method = "GET", data = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Allows sending and receiving cookies
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(API_BASE_URL + endpoint, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};


// ✅ Google Authentication API Call (Replaces axios)
export const googleAuth = (code) => fetchAPI(`google?code=${code}`, "GET");


export const upladFile = async (data) => {
    try{
        const response = await axios.post("http://localhost:4000/upload", data);
        return response.data; // Return the response data
    }
    catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Rethrow the error for further handling
    }
}       
