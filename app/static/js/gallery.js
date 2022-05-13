// Setup
var Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  World = Matter.World,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Render = Matter.Render,
  Runner = Matter.Runner

var width = window.innerWidth, height = window.innerHeight;
    
// Engine
var engine = Engine.create(),
  world = engine.world;
world.gravity.y = 0;

// Render
let render = Render.create({
  element: document.body,
  engine: engine,
  options:
  {
    wireframes: false,
  }
});

render.canvas.width = width
render.canvas.height = height
render.options.pixelRatio = 1;
//render.options.background = '#fafafa';

Render.run(render);

// Runner
var runner = Matter.Runner.create();
Runner.run(runner, engine);

// Bodies
new Boundary(width/2,height,width,40) // bottom
new Boundary(width/2,0,width,40) // top
new Boundary(0,height/2,40,height) // left
new Boundary(width,height/2,40,height) // right

new Gallery(width/2-290, height/2-230, 3, 3, 50, 50, 160, 120);

// Mouse
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: false
    }
  }
});
render.mouse = mouse;
World.add(world, mouseConstraint);

// Events

// Mouse over image
Matter.Events.on(mouseConstraint, 'mousemove', function (event) {

  let mousePosition = event.mouse.position;
  let bodies = Matter.Composite.allBodies(engine.world);
  var foundPhysics = Matter.Query.point(bodies, mousePosition);

  var cursor = ""

  for (let i = 0; i < foundPhysics.length; i++) {
    if (foundPhysics[0] == undefined) cursor = "default"
    else if (foundPhysics[i].render.sprite.texture == undefined) cursor = "pointer"
    else if (foundPhysics[i].render.sprite.texture.split('large')[1] == undefined) { cursor = "pointer"; break; }
    else cursor = "default";
  }

  document.body.style.cursor = cursor;
  


});

// Double click
document.addEventListener('dblclick', function(event) {

  // Get value clicked
  let pos = mouse.position;
  let bodies = Matter.Composite.allBodies(engine.world);
  var foundPhysics = Matter.Query.point(bodies, pos);
  
  removeBodies(background = true, gallery = false, boundaries = false);

  if (foundPhysics[0] == undefined) return;
  else {

    // Get body texture
    let body = foundPhysics[0]
    let texture = body.render.sprite.texture;

    // Get large texture
    let number = texture.split('.').shift().split('_').pop();
    let largeTexture = texture.replace("small_" + number, 'large_'+ number);
    largeTexture = largeTexture.replace("small", 'large');

    // Get width and length
    let body_width = body.bounds.max.x - body.bounds.min.x;
    let body_height = body.bounds.max.y - body.bounds.min.y;

    // Create large image
    new Background(largeTexture, width/2, height/2, body_width, body_height);
  }
})

// Clear bodies
function clearBodies() {

  removeBodies(background = false, gallery = true, boundaries = true);
  
  // Bodies
  new Boundary(width/2,height,width,40) // bottom
  new Boundary(width/2,0,width,40) // top
  new Boundary(0,height/2,40,height) // left
  new Boundary(width,height/2,40,height) // right

  // Mouse
  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: {
        visible: false
      }
    }
  });
  render.mouse = mouse;
  World.add(world, mouseConstraint);
}


// Reset bodies
function resetBodies() {
  
  // Remove all bodies except background
  removeBodies(background = false, gallery = true, boundaries = true);
  
  // Bodies
  new Boundary(width/2,height,width,40) // bottom
  new Boundary(width/2,0,width,40) // top
  new Boundary(0,height/2,40,height) // left
  new Boundary(width,height/2,40,height) // right

  new Gallery(width/2-290, height/2-230, 3, 3, 50, 50, 160, 120);

  // Mouse
  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: {
        visible: false
      }
    }
  });
  render.mouse = mouse;
  World.add(world, mouseConstraint);
}

// Resize Window
window.addEventListener('resize', function () {
  width = window.innerWidth;
  height = window.innerHeight;
  render.canvas.width = width
  render.canvas.height = height

  // Remove boundaries
  removeBodies(boundaries = true)

  // Resize background
  let bodies = Matter.Composite.allBodies(engine.world);
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].render.sprite.texture == undefined) continue;
    else if (bodies[i].render.sprite.texture.split('large')[1] != undefined) {
      bodies[i].position.x = width/2;
      bodies[i].position.y = height/2;
    }
  }

  // Recreate bodies
  new Boundary(width/2,height,width,40) // bottom
  new Boundary(width/2,0,width,40) // top
  new Boundary(0,height/2,40,height) // left
  new Boundary(width,height/2,40,height) // right
});

function removeBodies(background = false, gallery = false, boundaries = false) {

  let bodies = Matter.Composite.allBodies(engine.world);
  for (let i = 0; i < bodies.length; i++) {
    // No texture = boundaries
    if (bodies[i].render.sprite.texture == undefined) { 
      if (boundaries) World.remove(world, bodies[i]) 
    }
    // Has large in texture = background
    else if (bodies[i].render.sprite.texture.split('large')[1] != undefined) { 
      if (background) World.remove(world, bodies[i]) 
    }
    // Otherwise = gallery
    else { 
      if (gallery) World.remove(world, bodies[i], true) 
    }
  }
}

// Sort
Matter.Events.on(engine.world, "afterAdd", function(items) {
  engine.world.bodies.sort((a, b) => {
      return b.collisionFilter.category - a.collisionFilter.category;
  });
});


