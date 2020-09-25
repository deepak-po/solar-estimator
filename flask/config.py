import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER')
    CORS_HEADER  = 'Content-Type'
    # SQLALCHEMY_DATABASE_URI = (
    #     os.environ.get('FLASK_ENV') == 'DEVELOPMENT'
    #     if 'postgres://chatter_user:password@3.133.142.3:80/chatter_db'
    #     else os.environ.get('DATABASE_URL')  # container network
    # )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    # SQLALCHEMY_DATABASE_URI = 'postgres://solar_user:password@3.133.142.3:80/solar_db'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

