import { GoogleGenerativeAI } from '@google/generative-ai';

// Set up your API key
const API_KEY = 'AIzaSyA5ufnzaHQOawh89PKRKssaOq5OLQBF85I';
const genAI = new GoogleGenerativeAI(API_KEY);

// Initialize the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a description using Google Gemini
export const generateDescription = async (text, context) => {
  try {
    // Construct the prompt using both user text and context
    const prompt = `Based on the "${context}" give answer me. Answer the following question: "${text}" in 2 or 3 lines. Do not over exaggerate it`;

    
    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Return the generated description
    return response.text();
  } catch (error) {
    console.error('Error generating description:', error);
    return null;
  }
};