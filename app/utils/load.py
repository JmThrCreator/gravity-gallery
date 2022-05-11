import os
from PIL import Image
from config import basedir

def resize(image_name="", size_name="small", item=0):
    # get size
    size_map = {"small": 1, "large": 3}
    size = size_map[size_name]

    # get image
    path = os.path.join(basedir, "app", "static", "upload")
    image_path = os.path.join(path, image_name)
    image = Image.open(image_path)

    # resize image
    width, height = image.size
    perimiter = 1120*size
    if width > height:
        ratio = width/height
        height = perimiter/(ratio+1)
        width = perimiter-height
        height = height/2
        width = width/2
    elif width < height:
        ratio = height/width
        width = perimiter/(ratio+1)
        height = perimiter-width
        height = height/2
        width = width/2
    else:
        width = perimiter/2
        height = perimiter/2
    width = round(width)
    height = round(height)

    # is png or jpg
    if image_name.endswith(".png"):
        extension = ".png"
    elif image_name.endswith(".jpg"):
        extension = ".jpg"

    # save image
    new_image_name = size_name + "_" + str(item) + extension
    new_image_path = os.path.join(path, size_name, new_image_name)
    image = image.resize((width, height))
    image.save(new_image_path)

def get_size(path):
    image = Image.open(path)
    width, height = image.size
    return(width, height)

def get_image(image, size="small"):
    path = os.path.join(basedir, "app", "static", "upload", size, image)
    width, height = get_size(path)
    path = os.path.join("/static/upload", size, image)
    return {"path":path, "width":width, "height":height}
