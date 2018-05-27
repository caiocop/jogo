let updateFcts	= [];
let renderer = new THREE.WebGLRenderer();
let geometry = new THREE.CircleGeometry( 0.02, 32 );
//nave
let nave   = new THREE.OctahedronGeometry(0.08, 0);
var material  = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture("img/nave.jpg"), side: THREE.DoubleSide });
let naveMesh = new THREE.Mesh(nave, material);

var hit = false;
var point = 0;
function start(){
    //Definição da cena
    let scene = new THREE.Scene();
    //Definição da câmera >>> PerspectiveCamera( fov, aspect, near, far )
    let camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //Tamanho da viewport
    renderer.setSize( window.innerWidth , window.innerHeight );

    document.body.appendChild( renderer.domElement );

    let circulos = [];
    for(let i = 0; i <= 20; i++){
        let position = (Math.random() * 8) - 5;
        let circle = new THREE.Mesh( geometry, material );
        circle.position.set(position, 2.3, 0);
        circulos.push(circle);
        scene.add( circle );
    }

    let light = new THREE.AmbientLight( 0xFFFFFF);
    scene.add( light );

    naveMesh.position.set(0, -1.5, 0);
    scene.add(naveMesh);

    camera.position.z = 10;

    updateFcts.push(function(){
        renderer.render( scene, camera );
    });
    let lastTimeMsec = null;
    function render(nowMsec) {
        if(!hit) {
            requestAnimationFrame(render);
            naveMesh.rotation.y += .1;

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