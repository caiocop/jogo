
let updateFcts	= [];
let renderer = new THREE.WebGLRenderer();
console.log("renderer");
//nave
var nave   = new THREE.OctahedronGeometry(0.08, 0);
var material  = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("img/nave.jpg"), side: THREE.DoubleSide });
var naveMesh = new THREE.Mesh(nave, material);
console.log("nave");
var hit = false;
var point = 0;
function start(){
    console.log("start");
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 1);

    document.body.appendChild( renderer.domElement );


    let circulos = [];
    let circleMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("img/meteor.jpg"),
        side: THREE.DoubleSide
    });
    for(let i = 0; i <= 20; i++){
        let geometry = new THREE.CircleGeometry( Math.random() * 0.1, 32 );
        let position = (Math.random() * 8) - 5;
        let circle = new THREE.Mesh( geometry, circleMaterial );
        circle.position.set(position, 2.3, 0);

        circulos.push(circle);
        scene.add( circle );
    }

    let light = new THREE.AmbientLight( 0xFFFFFF);
    scene.add( light );

    naveMesh.position.set(0, -1.5, 0);
    scene.add(naveMesh);

    camera.position.z = 10;

    // Load the background texture
    var texture = THREE.ImageUtils.loadTexture("img/espaco.jpg");
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: texture
        }));

    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;

    // Create your background scene
    var backgroundScene = new THREE.Scene();
    var backgroundCamera = new THREE.Camera();
    backgroundScene .add(backgroundCamera );
    backgroundScene .add(backgroundMesh );

    updateFcts.push(function(){

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );

    renderer.render( scene, camera );


    });
    let lastTimeMsec = null;
    function render(nowMsec) {

        if(!hit) {
            requestAnimationFrame(render);

            for (let i = 0; i <= 20; i++) {
                circulos[i].position.y -= Math.floor(Math.random() * 10) / 60;
                if (naveMesh.position.x >= circulos[i].position.x - 0.1 && naveMesh.position.x <= circulos[i].position.x + 0.1 &&
                    naveMesh.position.y >= circulos[i].position.y - 0.1 && naveMesh.position.y <= circulos[i].position.y + 0.1) {
                    hit = true;
                }

                if (circulos[i].position.y - 0.05 < -2.1) {
                    circulos[i].position.y = 2.3;
                    circulos[i].position.x = (Math.random() * 8) - 5;
                    point ++;

                }
            }
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            let deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;
            updateFcts.forEach(function (updateFn) {
                updateFn(deltaMsec / 1000, nowMsec / 1000)
            });
        }else{
            if(confirm("Fim! pontos: "+point)){
                for (let i = 0; i <= 20; i++) {
                    circulos[i].position.y = 2.3;
                }
                naveMesh.position.set(0, -1.5, 0);
                requestAnimationFrame(render);
                hit = false;
                point = 0;
            }
        }
    }
    render();
}
