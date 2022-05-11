from app.main import bp
from flask import render_template, redirect, request, url_for, jsonify
from app.utils.load import resize, get_image
from config import basedir
import os

@bp.route("/")
@bp.route("/index", methods=["GET", "POST"])
def index():

	# clear small folder
	small_path = os.path.join(basedir, "app", "static", "upload", "small")
	for file in os.listdir(small_path):
		file_path = os.path.join(small_path, file)
		os.remove(file_path)
	
	count = 0
	for file in os.listdir(os.path.join(basedir, "app", "static", "upload")):
		if file.endswith(".png") or file.endswith(".jpg"):
			resize(file, "small", count)
			count += 1

	paintings = []
	for file in os.listdir(os.path.join(basedir, "app", "static", "upload", "small")):
		if file.endswith(".png") or file.endswith(".jpg"):
			paintings.append(get_image(file, "small"))
	
	return render_template("index.html", paintings = paintings)