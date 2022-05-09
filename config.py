import os

# gets base directory

basedir = os.path.abspath(os.path.dirname(__file__))

# create config class

class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "secret"

