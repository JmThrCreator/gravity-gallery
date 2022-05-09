let engine = Matter.Engine.create();
engine.world.gravity.y = 0;


let render = Matter.Render.create({
  element: document.body,
  engine: engine
});

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
        visible: false,
        height: render.canvas.height,
        width: render.canvas.width,
    }
  }
});
render.mouse = mouse;


let ground = Matter.Bodies.rectangle(400,600,810,60,{ isStatic: true}); 
let boxA = Matter.Bodies.rectangle(400,200,80,80,{chamfer: {radius: 10}});
let boxB = Matter.Bodies.rectangle(450,50,80,80, {chamfer: {radius: 10}});

Matter.World.add(engine.world,[boxA,boxB,ground,mouseConstraint]);

Matter.World.add(engine.world,[boxA,boxB,ground,mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);