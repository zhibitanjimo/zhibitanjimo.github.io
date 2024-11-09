var WIDTH = 1280;
var HEIGHT = 600;
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;
var scene;
var count = 0;
var $container;
var renderer;
var camera;
var pointLight;
var globulos = [];
var bassGlobulos;
var colors = [ 0xffffff, 0x307367, 0xaaaaaa ];
var colors = [ 0x4eb9fd, 0xfdde4e, 0xfd4eca ];
var colors = [ 0xeb6473, 0x4db8ba, 0x413751, 0x83baea, 0xedc879 ];
//var colors = [ 0xffffff ];
var maxSphere = 350;
var ballRadius = 250;
var debug;

$(document).ready( function(){
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  init();
  
  $( window ).resize( function(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight ); 
		
		var size = screenSizeToObject(camera, renderer);
		debug.scale.x = size.width;
		debug.scale.y = size.height;
  });
});

function init(){
  $container = $('#container');
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.add(camera);
  camera.position.z = 1000;
  
  renderer.setSize(WIDTH, HEIGHT);
  $container.append(renderer.domElement);
	
	var light = new THREE.SpotLight();
	light.position.set( 0, 1000, -500 );
	light.castShadow = true;
	light.shadowMapWidth = 2048;
	light.shadowMapHeight = 2048;
	light.shadowBias = 0.00001;
	light.shadowDarkness = 0.1;
	scene.add(light);
  
  for( var i = 0; i < maxSphere; i++ ){
    createSphere( Math.random()*7 + 3, 15, 15, colors[ Math.round( ( colors.length - 1 ) * Math.random() ) ] );
  }
  
  loop();
	
	var size = screenSizeToObject(camera, renderer);
	debug = new THREE.Mesh( new THREE.PlaneGeometry( 1,1 ), new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, brightness: 3 } ) );
  //scene.add( debug ); 
	
	debug.scale.x = size.width;
	debug.scale.y = size.height;
}

function createSphere( radius, segments, rings, couleur ){
	var sphereMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color( couleur ), side: THREE.DoubleSide, shading: THREE.SmoothShading, wireframe: false } );
  
  var sphere = new THREE.Mesh( new THREE.SphereGeometry( radius, segments, rings), sphereMaterial);  

  sphere.geometry.verticesNeedUpdate = false;
  sphere.geometry.normalsNeedUpdate = false;
  sphere.speed = Math.random();
  sphere.angle = Math.random()*360;
  sphere.vel = Math.random()*500 + 0.25; 
	sphere.count = Math.random() * 360;
	sphere.randomness = Math.round(Math.random()*25);
	
	
	sphere.target = {};
	
	var size = screenSizeToObject(camera, renderer);	
	sphere.position.x = 0;
	sphere.position.y = 0;
  
	globulos.push( sphere );
	scene.add( sphere );
}

function moveGlobulos(){
  for( var i = 0; i < globulos.length; i++ ){
    var g = globulos[i];
		count--;
		g.count--;
		g.position.x = Math.cos(g.count/50) * ballRadius + g.randomness;
		g.position.y = Math.sin(g.count/50) * ballRadius + g.randomness;
		//g.position.z = Math.cos(g.count/50) * ballRadius + g.randomness;
		
		g.scale.x = Math.cos(g.count/5) + 1.25;
		g.scale.y = Math.cos(g.count/5) + 1.25;
		g.scale.z = Math.cos(g.count/5) + 1.25;
  }
}

function screenSizeToObject(camera, renderer) {
    var vFOV = camera.fov * Math.PI / 180; // convert vertical fov to radians 
    var height = 2 * Math.tan(vFOV / 2) * camera.position.z; // visible height
    var size = { 'width': window.innerWidth, 'height': window.innerHeight };
    var aspect = size.width / size.height;
    var width = height * aspect; // visible width
    return {
        width,
        height
    }
}



function getDistance( point1X, point1Y, point2X, point2Y ){
	var xs = 0;
	var ys = 0;

	xs = point2X - point1X;
	xs = xs * xs;

	ys = point2Y - point1Y;
	ys = ys * ys;
	
	return Math.sqrt( xs + ys );
}

function loop(){
		requestAnimationFrame( loop ); 
		count++;
    moveGlobulos();
    renderer.render(scene, camera);
}