from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from models import db, Project, Owner
import requests
import json
from flask_jwt_extended import jwt_required
import os

# from flask_cors import CORS

data = Blueprint('data', __name__)

# Get an Estimate for a Project


@data.route('/', methods=['POST'])
# @jwt_required
def get_generation_data():
    # client provides: lat/lng, area(m2), tilt(0,3)
    # data = json.loads(request.data)
    # rule of thumb 10m2 need for 1kW of panels
    data = {"lat": 46, "lng": -122, "array_type": 3, "capacity": 100}

    # Get data
    r_rad = requests.get(
        ('https://developer.nrel.gov/api/solar/solar_resource/v1.json?'
         f'api_key={os.environ.get("NREL_API_KEY")}&'
         f'lat={data["lat"]}&lon={data["lng"]}'))
    r_gen = requests.get(
        ('https://developer.nrel.gov/api/pvwatts/v5.json?'
         f'api_key={os.environ.get("NREL_API_KEY")}&'
         f'lat={data["lat"]}&lon={data["lng"]}&'
         f'system_capacity={data["capacity"]}&azimuth=180&'
         f'tilt={data["lat"]}&array_type={data["array_type"]}&module_type=1&losses=10'))
    if data["array_type"] == 3:
        # TODO: Get tracker data from subprocess
        pass

    return jsonify({"generation": r_gen.json(), "radiation": r_rad.json()})

# Get All Projects
@data.route('/projects', methods=['GET'])
def get_all_projects():

    projects_model = Project.query.all()
    print(projects_model )
    projects = []

    for project in projects_model:
        projects.append(project.to_dict_table())

    return jsonify(projects)


# Get One Projects

# @data.route('/projects/<id>', methods=['GET'])
# def get_one_project(id):

#     model_project = Project.query.filter(Project.id == id).first()
#     project = model_project.to_dict()
#     project["ow"]
#  projects_model = Project.query.all()
#   projects = []

#    for project in projects_model:
#         projects.append(project.to_dict_table())

#     return jsonify(projects)
