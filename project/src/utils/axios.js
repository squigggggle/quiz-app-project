import axios from "axios";

// Create an axios instance
const quizAPIInstance = axios.create({
  baseURL: "https://s1-24-id608001-project-squigggggle.onrender.com", // Replace with your own API URL
  timeout: 10000, // 10 seconds. Increase if requests are timing out
});

export { quizAPIInstance };