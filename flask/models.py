from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, Boolean, Date, String, Float, ARRAY, Binary, JSON

db = SQLAlchemy()


class Owner(db.Model):
    __tablename__ = 'owners'

    id = Column(Integer, primary_key=True,)
    username = Column(String(40), nullable=False,)
    email = Column(String(255), nullable=False, unique=True,)
    hashed = Column(Binary(100), nullable=False,)
    firstname = Column(String(40), nullable=False,)
    lastname = Column(String(40),)
    pic = Column(String,)
    created = Column(Date,)

    projects = db.relationship('Project', backref='owner', lazy=True)

    def to_safe_object(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "hashed":self.hashed,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "pic": self.pic,
            "created": self.created,
        }


class Project(db.Model):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'), nullable=False)
    name = Column(String(255), nullable=False,)
    country = Column(String(255),)
    area = Column(Float,)
    output = Column(Float,)
    capacity = Column(Float,)
    year = Column(Integer,)
    lat = Column(Float,)
    lng = Column(Float,)
    station = Column(String(255),)
    tracker = Column(Boolean,)
    # path = Column(ARRAY(Float),)
    # path2 = Column(JSON,)
    created = Column(Date,)

    def to_dict(self):
        return {
            "id": self.id,
            # "owner_id": self.owner_id,
            "name": self.name,
            "country": self.country,
            "area": self.area,
            "output": self.output,
            "year": self.year,
            "lat": self.lat,
            "lng": self.lng,
            "tracker": self.tracker,
            # "path": self.path,
            "created": self.created,
        }

    def to_dict_table(self):
        return {

            "name": self.name,
            "country": self.country,
            "area": self.area,
            "output": self.output,
            "year": self.year,
            "lat": self.lat,
            "lng": self.lng,
        }
