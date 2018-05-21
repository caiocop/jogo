////////////////////////
//		comment		  //
////////////////////////

var keyboard = new THREEx.KeyboardState(renderer.domElement);
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();

updateFcts.push(function(delta, now){
    if( keyboard.pressed('left') ){
        mesh.position.x -= 10 * delta; 
        //mesh.rotation.y -= 1 * delta;			
    }else if( keyboard.pressed('right') ){
        mesh.position.x += 10 * delta; 
        //mesh.rotation.y += 1 * delta;
    }
    if( keyboard.pressed('down') ){
        mesh.position.y -= 1 * delta;
        mesh.rotation.x += 1 * delta;		
    }else if( keyboard.pressed('up') ){
        mesh.position.y += 1 * delta;
        mesh.rotation.x -= 1 * delta;		
    }
})

// only on keydown

keyboard.domElement.addEventListener('keydown', function(event){
    if( keyboard.eventMatches(event, 'w') )	mesh.scale.y	/= 2
    if( keyboard.eventMatches(event, 's') )	mesh.scale.y	*= 2
})

// only on keyup

keyboard.domElement.addEventListener('keyup', function(event){
    if( keyboard.eventMatches(event, 'a') )	mesh.scale.x	*= 2
    if( keyboard.eventMatches(event, 'd') )	mesh.scale.x	/= 2
})