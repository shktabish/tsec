import os
from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google Generative AI with your API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask app
app = Flask(__name__)

# Function to generate a learning roadmap
def generate_roadmap(user_skill_set, user_goal):
    print("Generating roadmap...")
    if not user_skill_set or not user_goal:
        return {"error": "Skills or goal missing from request"}, 400

    try:
        # Define the prompt for roadmap generation
        prompt = (
            f"Create a learning roadmap for someone with the following skills: {user_skill_set}. "
            f"The goal is to become proficient in {user_goal}. Please break down the roadmap into "
            "key learning milestones and suggest relevant resources or steps."
        )

        # Create model instance and generate roadmap
        model = genai.GenerativeModel("gemini-pro")
        result = model.generate_content(prompt)

        # Extract the result and return
        roadmap = result.text.strip() if result.text else "Roadmap could not be generated."
        return {"roadmap": roadmap}, 200

    except Exception as e:
        print(f"Error generating roadmap: {e}")
        return {"error": f"Error generating roadmap: {str(e)}"}, 500

# Function to generate a quiz
def generate_quiz(skills):
    print("Generating quiz...")
    if not skills:
        return {"error": "Skills missing from request"}, 400

    try:
        # Define the prompt for quiz generation
        prompt = (
            f"Create a 5-question quiz to test proficiency in the following skills: {skills}. "
            "Provide multiple-choice questions where each question has 4 options and one correct answer."
        )

        # Create model instance and generate quiz
        model = genai.GenerativeModel("gemini-pro")
        result = model.generate_content(prompt)

        # Extract the result and return
        quiz = result.text.strip() if result.text else "Quiz could not be generated."
        return {"quiz": quiz}, 200

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
    app.run(debug=True)
