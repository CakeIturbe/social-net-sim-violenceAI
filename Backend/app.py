from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import os
import traceback

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'runs/detect/web'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = YOLO("runs/fight_detector_local3/weights/best.pt")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files.get('image')
        if not file:
            return jsonify({"error": "No se recibió archivo"}), 400

        filename = file.filename
        filepath = os.path.join(UPLOAD_FOLDER, filename + ".jpg")
        file.save(filepath)

        if not os.path.exists(filepath):
            print(f"Archivo guardado erroneamente")
            return jsonify({"error": "Archivo no se guardó correctamente"}), 400

        # Ejecutar modelo YOLO
        results = model(filepath, save=True, project="runs/detect", name="web", exist_ok=True)
        result = results[0]

        # Revisar detecciones
        num_detections = len(result.boxes)
        detected_classes = []
        if num_detections > 0:
            detected_classes = result.boxes.cls.cpu().numpy().tolist()

        return jsonify({
            "result_path": f"runs/detect/web/{filename}",
            "is_approved": num_detections < 1, 
            "num_detections": num_detections,
            "classes": detected_classes
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



@app.route('/runs/detect/web/<filename>')
def get_result(filename):
    return send_from_directory("runs/detect/web", filename)

if __name__ == '__main__':
    app.run(debug=True)
