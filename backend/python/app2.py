import os
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google Generative AI with your API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Function to generate a learning roadmap
import json

def generate_roadmap(user_skill_set, user_goal):
    print("Generating roadmap...")
    
    # Check if skills or goal is missing
    if not user_skill_set or not user_goal:
        return {"error": "Skills or goal missing from request"}, 400

    try:
        # Define the prompt for roadmap generation with explicit format instructions
        prompt = (
            f"Create a learning roadmap for someone with the following skills: {user_skill_set}. "
            f"The goal is to become proficient in {user_goal}. "
            "Break down the roadmap into key learning milestones and suggest a single relevant resource for each step. "
            "Strictly format the response as a compact JSON array, with no extra characters, spaces, or line breaks. "
            'Ensure the "resource" field contains a valid URL, like this: '
            '[{"title": "Step 1 Title","description": "Step 1 Description","skills": ["Skill 1", "Skill 2"],"resource": "https://example.com"},'
            '{"title": "Step 2 Title","description": "Step 2 Description","skills": ["Skill 1", "Skill 2"],"resource": "https://example.com"}]. '
            "Do not include any other text in the response—only a valid JSON array."
        )

        # Create model instance and generate roadmap
        model = genai.GenerativeModel("gemini-pro")
        result = model.generate_content(prompt)

        # Extract the result text and try to parse it as JSON
        roadmap_text = result.text.strip() if result.text else "[]"

        try:
            # Parse the generated text as JSON to ensure it's a valid format
            roadmap_json = json.loads(roadmap_text)
            
            # Ensure it's a list (JSON array)
            if not isinstance(roadmap_json, list):
                raise ValueError("Generated roadmap is not a JSON array.")
            
            return {"roadmap": roadmap_json}, 200

        except json.JSONDecodeError:
            # If parsing fails, return an error
            print(f"Error: Generated text is not valid JSON - {roadmap_text}")
            return {"error": "Invalid roadmap format received from model"}, 500

    except Exception as e:
        print(f"Error generating roadmap: {e}")
        return {"error": f"Error generating roadmap: {str(e)}"}, 500

# Function to generate a quiz and return raw response
def generate_quiz(skills):
    print("Generating quiz...")
    if not skills:
        return {"error": "Skills missing from request"}, 400

    try:
        # Define the prompt for structured quiz generation
        prompt = (
            f"Create a 5-question quiz to test proficiency in the following skills: {skills}. "
            "Provide the output in the following JSON format:\n\n"
            "[\n"
            "{\n"
            '  "question": "What is the capital of France?",\n'
            '  "options": ["Berlin", "Madrid", "Paris", "Lisbon"],\n'
            '  "answer": "Paris"\n'
            "},\n"
            "{\n"
            '  "question": "Which language is primarily used for web development?",\n'
            '  "options": ["Python", "Java", "JavaScript", "C++"],\n'
            '  "answer": "JavaScript"\n'
            "}\n"
            "]\n\n"
            "Make sure to generate 5 questions following the same format, including the question, options, and answer."
        )

        # Create model instance and generate the quiz
        model = genai.GenerativeModel("gemini-pro")
        result = model.generate_content(prompt)

        # Return the raw response text as it is
        return {"quiz": result.text.strip()}, 200

    except Exception as e:
        print(f"Error generating quiz: {e}")
        return {"error": f"Error generating quiz: {str(e)}"}, 500


# Flask route for generating a roadmap
@app.route("/generate-roadmap", methods=["POST"])
def roadmap_endpoint():
    data = request.json
    user_skill_set = data.get("skills")
    user_goal = data.get("goal")
    return generate_roadmap(user_skill_set, user_goal)

# Flask route for generating a quiz
@app.route("/generate-quiz", methods=["POST"])
def quiz_endpoint():
    data = request.json
    skills = data.get("skills")
    return generate_quiz(skills)

# Main entry point
if __name__ == "__main__":
    app.run(debug=True, port=5001)