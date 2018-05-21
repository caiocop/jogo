var renderer = new THREE.WebGLRenderer();
var updateFcts	= [];
var geometry	= new THREE.BoxGeometry( 1, 1, 1);
var material	= new THREE.MeshNormalMaterial();
var mesh	= new THREE.Mesh( geometry, material );
function start(){
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.z = 10;
    
	/////////////////////////////
	//		add an object	   //
    /////////////////////////////
	
	scene.add( mesh );
	
	///////////////////////////////
	//		render the scene	 //
	///////////////////////////////
	updateFcts.push(function(){
		renderer.render( scene, camera );		
	})
	/////////////////////////////
	//		loop runner		   //
	/////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
	})

}