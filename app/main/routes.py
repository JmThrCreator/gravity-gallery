from app.main import bp
from flask import render_template, redirect, request, url_for, jsonify
from app.utils.load import resize, get_image
from config import basedir
import os

@bp.route("/")
@bp.route("/index", methods=["GET", "POST"])
def index():

	count = 0
	for file in os.listdir(os.path.join(basedir, "app", "static", "upload")):
		if file.endswith(".png"):
			#resize(file, "small", count)
			count += 1

	paintings = []
	for file in os.listdir(os.path.join(basedir, "app", "static", "upload", "small")):
		if file.endswith(".png"):
			paintings.append(get_image(file, "small"))
	
	return render_template("index.html", paintings = paintings)

@bp.route("/get_paintings", methods=["GET", "POST"])
def get_paintings():
	paintings = []
	for file in os.listdir(os.path.join(basedir, "app", "static", "upload", "small")):
		if file.endswith(".png"):
			paintings.append(get_image(file, "small"))
	return jsonify(paintings)
