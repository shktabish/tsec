from flask import Flask, request, jsonify
import easyocr
import os
import google.generativeai as genai
from dotenv import load_dotenv
import logging
import re  # For text cleaning
from flask_cors import CORS  # Import flask-cors for CORS support

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all domains and ports
CORS(app)

# Configure Google Generative AI with your API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))  # Ensure GOOGLE_API_KEY is set in your environment

# Endpoint 1: Extract family income from image
@app.route('/extract_income', methods=['POST'])
def extract_income():
    data = request.json
    image_path = data.get('image_path')

    # Check if the image path exists
    if not image_path or not os.path.exists(image_path):
        logging.warn("Invalid or missing image path")
        return {"error": "Invalid or missing image path"}, 400

    # Initialize EasyOCR reader
    reader = easyocr.Reader(['en'])

    try:
        # Extract text from the image
        result = reader.readtext(image_path)
        extracted_text = ' '.join([text for (bbox, text, prob) in result])

        # Print extracted text to the console
        print("Extracted Text:", extracted_text)

        # Prepare the prompt for Google Generative AI to extract family income
        family_income, income_validity = extract_family_income_google(extracted_text)

        # Save the result to a file
        with open("family_income.txt", "w") as f:
            f.write(f"Extracted Text:\n{extracted_text}\n\nFinal Family Income:\n{family_income}\n\nIncome Validity: {income_validity}")

        # Print final family income to console
        print("Final Family Income:", family_income)
        print("Income Validity:", income_validity)

        # Return the extracted income validity as a response
        return jsonify({
            "income_validity": income_validity
        }), 200

    except Exception as e:
        logging.error(f"Error during extraction: {e}")
        return {"error": f"An error occurred during text extraction: {str(e)}"}, 500


def extract_family_income_google(text):
    """
    Function to extract family income using Google Generative AI (gemini-pro model).
    """
    try:
        # Define the prompt to be sent to the AI model
        prompt = (
            "The following text contains financial information. Please extract "
            "the annual family income in numeric form and in words, if available.\n"
            f"Text: {text}\n"
            "Please extract the family income and respond only with the value in numbers as well as words."
        )

        # Create a model instance and generate content
        model = genai.GenerativeModel("gemini-pro")
        result = model.generate_content(prompt)

        # Extract the result
        family_income = result.text.strip()

        # Convert family income to numeric form for comparison
        try:
            # Extract numeric value from the response
            income_numeric = float(''.join(filter(str.isdigit, family_income)))  # Extract digits and convert to float

            # Check if the income is less than 8 lakhs
            if income_numeric < 800000:  # 8,00,000 is 8 lakhs
                validity = "valid"
            else:
                validity = "invalid"
        except ValueError:
            logging.error("Error converting family income to numeric value")
            validity = "invalid"

        return family_income, validity

    except Exception as e:
        logging.error(f"Error during AI extraction: {e}")
        return f"Error occurred during Google Generative AI API call: {str(e)}", "invalid"


# Endpoint 2: Extract form fields and provide guidance
@app.route('/extract_form_fields', methods=['POST'])
def extract_form_fields():
    data = request.json
    image_path = data.get('image_path')

    # Check if the image path exists
    if not image_path or not os.path.exists(image_path):
        return {"error": "Invalid or missing image path"}, 400

    # Initialize EasyOCR reader
    reader = easyocr.Reader(['en'])

    try:
        # Extract text from the image
        result = reader.readtext(image_path)
        extracted_text = ' '.join([text for (bbox, text, prob) in result])

        # Clean the extracted text (remove unwanted characters like *, #, etc.)
        cleaned_text = re.sub(r'[^a-zA-Z0-9\s]', '', extracted_text)

        # Print cleaned text to the console
        print("Cleaned Extracted Text:", cleaned_text)

        # Pass the cleaned text to Google Generative AI to extract form fields and guide the user
        form_guide = extract_form_fields_google(cleaned_text)

        # Print the guide to the console
        print("Form Filling Guide:", form_guide)

        # Return the extracted text and form guide as a response
        return {
            "form_filling_guide": form_guide
        }, 200

    except Exception as e:
        return {"error": f"An error occurred during text extraction: {str(e)}"}, 500


def extract_form_fields_google(text):
    """
    Function to extract form fields and provide a guide on how to fill the form using Google Generative AI (Gemini).
    """
    try:
        # Define the prompt to be sent to the AI model
        prompt = (
            "The following text contains fields from a form. Please identify all form fields "
            "and provide a basic guide on how the user should fill the form.\n"
            f"Text: {text}\n"
            "Give the guide for each field, explaining what the user should enter."
        )

        # Create a model instance and generate content
        model = genai.GenerativeModel("gemini-pro")
        result = model.generate_content(prompt)

        # Extract the result and return
        form_guide = result.text.strip()
        return form_guide if form_guide else "No form fields found or unable to generate a guide."

    except Exception as e:
        return f"Error occurred during Google Generative AI API call: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True)
