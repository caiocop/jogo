//Definição da cena
var scene = new THREE.Scene();

//Definição da câmera >>> PerspectiveCamera( fov, aspect, near, far )
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Definição do renderizador
var renderer = new THREE.WebGLRenderer();

//Tamanho da viewport
renderer.setSize( window.innerWidth, window.innerHeight );

//Definimos a cor de limpeza
renderer.setClearColor( 0x000000, 1);

document.body.appendChild( renderer.domElement );

//Definição do Objeto
var sphere   = new THREE.SphereGeometry(0.10, 32, 32);

//Definição do Material
var material  = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexturduete("img/planetaterra.jpg"),
    side: THREE.DoubleSide });
material.bumpMap = THREE.ImageUtils.loadTexture('img/planetaterrabump.jpg');
material.bumpScale = 0.04;

material.specularMap = THREE.ImageUtils.loadTexture('img/planetaterraspec.jpg');
material.specular = new THREE.Color('orange');

//material.wireframe = true;
var terraMesh = new THREE.Mesh(sphere, material);
terraMesh.position.set(1.6, 0.7, 0);
scene.add(terraMesh);

var light = new THREE.AmbientLight( 0xFFFFFF);
scene.add( light );

var light = new THREE.SpotLight();
light.position.set(100, 80, 30);
light.intensity = 1.2
scene.add(light);

camera.position.z = 4;

function render(){
    requestAnimationFrame( render );
    terraMesh.rotation.y += .01;
    renderer.render( scene, camera );
}
render();