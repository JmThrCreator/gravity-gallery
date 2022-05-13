# Gravity Gallery

A gallery with physics for artists or photographers showcase their images in a unique way. Made using matter.js.

## Setup

Create a virtual environment and install the dependencies using the following commands:

```
python3 -m venv venv
venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## How to use

Start by uploading your files to app/static/upload; there should be some sample images there already. Note that this app only works with 9 paintings in the gallery, though this can be extended. You should also replace the link button found in app/templates/gallery.html (with id="link") to yours.

Finally, run the "run.py" file and you should be set. Alternatively, execute the following commands:

```
venv\Scripts\activate
flask run
```

Drag images to throw them around the screen, double click them to enlarge and use the panel on the right to: add images, change gravity, clear, reset and visit page.
