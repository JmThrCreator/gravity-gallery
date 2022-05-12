from app.main import bp
from flask import render_template, redirect, request, url_for, jsonify
from app.utils.load import load_images, get_images
from config import basedir
import os

@bp.route("/")
@bp.route("/index", methods=["GET", "POST"])
def index():

	#load_images()
	paintings = get_images("small")
	
	return render_template("index.html", paintings = paintings)