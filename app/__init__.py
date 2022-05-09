from flask import Flask
from config import Config as config_class

# create app

app = Flask(__name__)

# config

app.config.from_object(config_class)

# blueprints

from app.main import bp as main_bp
app.register_blueprint(main_bp)