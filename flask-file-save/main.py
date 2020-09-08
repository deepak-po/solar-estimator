from flask import Flask, render_template, redirect, jsonify, request, flash, url_for, session
# from flask_cors import CORS
from werkzeug.utils import secure_filename
import boto3
import os
import logging

from config import Config
from models import db

UPLOAD_FOLDER = './test'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

app = Flask(__name__)
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["CORS_HEADER"] = "Content-Type"

# CORS(app)



@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

# flask_cors.CORS(app, expose_headers='Authorization')