from flask import Flask, render_template, redirect, jsonify, request, flash, url_for, session
from flask_cors import CORS


from config import Config
from models import db
 

from routes.data import data


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
app.run(debug=True)
CORS(app)

app.register_blueprint(data, url_prefix='/api/data')


@app.route('/')
def slash():
    return jsonify(Notice='Please use /api route to access the api'), 200


@app.route('/api', methods=['GET'])
def api():
    return jsonify(message='Successful API ping'), 200