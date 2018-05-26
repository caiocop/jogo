let keyboard = new THREEx.KeyboardState(renderer.domElement);
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();

updateFcts.push(function(delta, now){
    if( keyboard.pressed('left') ){
        naveMesh.position.x -= 2 * delta;
        //naveMesh.rotation.y -= 1 * delta;
    }else if( keyboard.pressed('right') ){
        naveMesh.position.x += 2 * delta;
        //naveMesh.rotation.y += 1 * delta;
    }
    if( keyboard.pressed('down') ){
        naveMesh.position.y -= 2 * delta;
    }else if( keyboard.pressed('up') ){
        naveMesh.position.y += 2 * delta;
    }
});

// only on keydown
keyboard.domElement.addEventListener('keydown', function(event){
    if( keyboard.eventMatches(event, 'w') )	mesh.scale.y	/= 2
    if( keyboard.eventMatches(event, 's') )	mesh.scale.y	*= 2
});

// only on keyup
keyboard.domElement.addEventListener('keyup', function(event){
    if( keyboard.eventMatches(event, 'a') )	mesh.scale.x	*= 2
    if( keyboard.eventMatches(event, 'd') )	mesh.scale.x	/= 2
});