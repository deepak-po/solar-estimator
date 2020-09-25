from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from models import db, Project, Owner
import requests
import json
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import bcrypt
import os

# from flask_cors import CORS

data = Blueprint('data', __name__)

# Get an Estimate for a Project


@data.route('/', methods=['POST'])
# @jwt_required
def get_generation_data():
    # client provides: lat/lng, area(m2), tilt(0,3)
    client_data = json.loads(request.data)
    # rule of thumb 10m2 need for 1kW of panels
    client_array = 3 if client_data["tracker"] else 0
    client_capacity = float(client_data["area"])*1000*1000/10
    print(client_capacity)
    data = {"lat": client_data["centroid"]["lat"],
            "lng": client_data["centroid"]["lng"],
            "array_type": client_array,
            "capacity": client_capacity}

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

    print(r_gen.json()["outputs"])
    print(r_gen.json())
    project = Project(
        owner_id=client_data["user"],
        name=client_data["name"],
        country="UNITED STATES",
        area=float(client_data["area"]),
        output=float(r_gen.json()["outputs"]["ac_annual"])/1000000,
        capacity=client_capacity,
        year=2020,
        lat=client_data["centroid"]["lat"],
        lng=client_data["centroid"]["lng"],
        station=r_gen.json()["station_info"]["city"],
        tracker=True if client_array else False,
        # path=client_data["path"],
        # path2=client_data["path"],
    )
    db.session.add(project)
    db.session.commit()

    return jsonify({"generation": r_gen.json(), "radiation": r_rad.json()})

# Get All Projects


@data.route('/projects', methods=['GET'])
def get_all_projects():

    projects_model = Project.query.all()
    print(projects_model)
    projects = []

    for project in projects_model:
        projects.append(project.to_dict_table())

    return jsonify(projects)


# Get all tweets for one user
@data.route("/projects/<id>", methods=["GET"])
def get_owner_projects(id):

    model_projects = Project.query.filter(Project.owner_id == id).all()
    projects = []
    for model_project in model_projects:
        project = model_project.to_dict()
        # tweet["user"] = model_tweet.user.to_safe_object()
        projects.append(project)

    return jsonify(projects)


def set_password(password):
    hashed = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt())
    return hashed


def verify_password(password, hashed):
    # Return value could be made more sophisticated
    if bcrypt.checkpw(password.encode('utf-8'), hashed):
        return True
    else:
        return False


@data.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    owner = Owner(
        email=data['email'],
        username=data["username"],
        hashed=set_password(data['password'])
    )
    db.session.add(owner)
    db.session.commit()

    model_owner = Owner.query.filter_by(email=data['email']).first()
    owner = model_owner.to_safe_object()
    token = create_access_token(identity={"id": owner["id"]})
    return jsonify(token=token, id=owner["id"])

@data.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    model_owner = Owner.query.filter_by(email=data['email']).first()
    owner = model_owner.to_safe_object()
    verified = verify_password(data["password"], owner["hashed"])
    token = create_access_token(identity={"id": owner["id"]})
    return jsonify(token=token, id=owner["id"])

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
