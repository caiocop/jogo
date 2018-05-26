let updateFcts	= [];
let renderer = new THREE.WebGLRenderer();
let geometry = new THREE.CircleGeometry( 0.02, 32 );
let mesh	= new THREE.Mesh( geometry, material );
//nave
let nave   = new THREE.OctahedronGeometry(0.08, 0);
var material  = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("img/nave.jpg"), side: THREE.DoubleSide });
let naveMesh = new THREE.Mesh(nave, material);
function start(){
    //Definição da cena
    let scene = new THREE.Scene();
    //Definição da câmera >>> PerspectiveCamera( fov, aspect, near, far )
    let camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //Tamanho da viewport
    renderer.setSize( window.innerWidth, window.innerHeight );
    //Definimos a cor de limpeza
    renderer.setClearColor( 0x000000, 1);

    document.body.appendChild( renderer.domElement );

    let circulos = [];
    let circle = new THREE.Mesh( geometry, material );
    circle.position.set(-1.4, 2.3, 0);
    circulos.push(circle);
    scene.add( circle );

    let circle1 = new THREE.Mesh( geometry, material );
    circle1.position.set(-1.0,  2.3, 0);
    circulos.push(circle1);
    scene.add( circle1 );

    let circle2 = new THREE.Mesh( geometry, material );
    circle2.position.set(-0.6,  2.3, 0);
    circulos.push(circle2);
    scene.add( circle2 );

    let circle3 = new THREE.Mesh( geometry, material );
    circle3.position.set(0.0,  2.3, 0);
    circulos.push(circle3);
    scene.add( circle3 );

    let circle4 = new THREE.Mesh( geometry, material );
    circle4.position.set(0.4,  2.3, 0);
    circulos.push(circle4);
    scene.add( circle4 );

    let circle5 = new THREE.Mesh( geometry, material );
    circle5.position.set(0.8,  2.3, 0);
    circulos.push(circle5);
    scene.add( circle5 );

    let light = new THREE.AmbientLight( 0xFFFFFF);
    scene.add( light );

    naveMesh.position.set(0, -2, 0);
    scene.add(naveMesh);

    camera.position.z = 10;

    updateFcts.push(function(){
        renderer.render( scene, camera );
    })
    let lastTimeMsec = null;
    function render(nowMsec) {
        requestAnimationFrame(render);
        naveMesh.rotation.y += .1;

        for (let i = 0; i <= 5; i++) {
            distancia = Math.floor(Math.random() * 10) / 300;
            circulos[i].position.y -= distancia;
            if (naveMesh.position.x >= circulos[i].position.x - 0.05 && naveMesh.position.x <= circulos[i].position.x + 0.05 &&
                naveMesh.position.y >= circulos[i].position.y - 0.05 && naveMesh.position.y <= circulos[i].position.y + 0.05) {
                circulos[i].position.y = 2.3;
                circulos[i].position.x = Math.floor(Math.random() * 10) - 5;
            }

            if (circulos[i].position.y - 0.05 <= -2.1 && circulos[i].position.y + 0.05 >= -2.1) {
                circulos[i].position.y = 2.3;
                circulos[i].position.x = (Math.random() * 10) - 45;
            }
        }
        lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
        let deltaMsec  = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec  = nowMsec
        // call each update function
        updateFcts.forEach(function(updateFn){
            updateFn(deltaMsec/1000, nowMsec/1000)
        })
    }

    render();

}