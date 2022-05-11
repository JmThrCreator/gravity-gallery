// check if gravity-on has been pressed
window.onclick = function(event) {
    var targetId = event.target.id;
    console.log(targetId);
    if (targetId == "gravity") {
        var gravityOn = document.getElementById("gravity");
        if (gravityOn.className == "bi bi-arrow-down-circle") {
            gravityOn.className = "bi bi-slash-circle";
            world.gravity.y = 1;
        }
        else if (gravityOn.className == "bi bi-slash-circle") {
            gravityOn.className = "bi bi-arrow-down-circle";
            world.gravity.y = 0;
        }
    }
    else if (targetId == "add-body") {
        //get random value from paintingList
        var random = Math.floor(Math.random() * paintingList.length);
        //create new body
        var randomX = Math.floor(Math.random() * (width - 100));

        new Box(randomX, 100, paintingList[random].width/2, paintingList[random].height/2, paintingList[random].path);
    }
    else if (targetId == "clear-bodies") {
        clearBodies();
    }
    else if (targetId == "reset-bodies") {
        resetBodies();
    }

}