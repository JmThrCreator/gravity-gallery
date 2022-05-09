from app.main import bp
from flask import render_template, redirect, request, url_for, jsonify
import os

@bp.route("/")
@bp.route("/index", methods=["GET", "POST"])
def index():
	painting_list = []
	for image in os.listdir("app/static/upload"):
		painting_list.append(image)
	return render_template("index.html", paintings = jsonify(painting_list))