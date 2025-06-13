from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'runs/detect/web'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = YOLO("runs/fight_detector_local3/weights/best.pt")

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']

    filename = file.filename
    filepath = os.path.join('uploads', filename)
    filepath = filepath + ".jpg"  # Aseguramos extensión .jpg

    file.save(filepath)

    if not os.path.exists(filepath):
        return jsonify({"error": "Archivo no se guardó correctamente"}), 400

    # Ejecutar el modelo YOLO
    results = model(filepath, save=True, project="runs/detect", name="web", exist_ok=True)

    # Obtener el primer resultado
    result = results[0]
    
    # Verificar si se detectaron objetos
    num_detections = len(result.boxes)

    # Obtener etiquetas detectadas (opcional)
    detected_classes = []
    if num_detections > 0:
        detected_classes = result.boxes.cls.cpu().numpy().tolist() 

    return jsonify({
        "result_path": f"runs/detect/web/{filename}",
        "detected": num_detections < 0,
        "num_detections": num_detections,
        "classes": detected_classes 
    })


@app.route('/runs/detect/web/<filename>')
def get_result(filename):
    return send_from_directory("runs/detect/web", filename)

if __name__ == '__main__':
    app.run(debug=True)
