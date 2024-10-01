from flask import Flask, render_template, request, jsonify
import numpy as np
from deepface import DeepFace
import json
import base64
import cv2
import os

app = Flask(__name__)

# Function to analyze emotion in an image
def analyze_emotion(image):
    result = DeepFace.analyze(image, actions=['emotion'])
    return result[0]['emotion']

# Function to normalize emotion scores
def normalize_scores(scores):
    total = sum(scores.values())
    normalized_scores = {emotion: (score / total) * 100 for emotion, score in scores.items()}
    return normalized_scores

# Function to save data to a file
def save_data(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    image_data = data['image']
    
    # Decode the base64 image
    image = base64.b64decode(image_data)
    
    # Convert the image to a format suitable for DeepFace
    np_image = np.frombuffer(image, dtype=np.uint8)
    frame = cv2.imdecode(np_image, flags=cv2.IMREAD_COLOR)

    # Analyze emotion
    result = analyze_emotion(frame)
    normalized_result = normalize_scores(result)

    # Save output data to a file
    output_data = {'emotion': normalized_result}
    save_data(output_data, 'output.json')
    
    return jsonify({'emotion': normalized_result})

if __name__ == "__main__":
    app.run(debug=True, port = 5002)
