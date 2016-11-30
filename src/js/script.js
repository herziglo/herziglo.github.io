var camera;
var scene;
var renderer;
var cube;
 
var particleSystem;

init();
animate();
  
function init() {

	//paramètres basic
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set( 0, 0, 50 );
	
	renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x000000, 0 ); // the default
    document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
  
	//Lumière
	var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, -1, 1 ).normalize();
    scene.add(light);
	
	//Particule
	particleSystem = createParticleSystem();
	scene.add(particleSystem);
	
    render();
}

function createParticleSystem() {
     
    // The number of particles in a particle system is not easily changed.
    var particleCount = 200;
	
    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();
 
    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {
     
        // This will create all the vertices in a range of -200 to 200 in all directions
        var x = Math.random() * 400 - 200;
        var y = Math.random() * 400 - 200;
        var z = Math.random() * 400 - 200;
		
        // Create the vertex
        var particle = new THREE.Vector3(x, y, z);
         
        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }
	
    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: 0xffffff, 
             size: 7,
             map: THREE.ImageUtils.loadTexture("../../resources/images/phone.png"),
             blending: THREE.AdditiveBlending,
             transparent: true,
            });
      
    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
 
    return particleSystem;  
}

function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < -200) {
            vert.y = Math.random() * 400 - 200;
        }
        vert.y -= 0.2;
    }
    particleSystem.geometry.verticesNeedUpdate = true;
	particleSystem.rotation.x -= .001;
	particleSystem.rotation.y -= .001;
	particleSystem.rotation.z -= .001;
     
}
  
function animate() {
	animateParticles();
	
	render();
	requestAnimationFrame( animate );
}

function render(){
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}