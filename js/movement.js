let keyboard = new THREEx.KeyboardState(renderer.domElement);
renderer.domElement.setAttribute("tabIndex", "0");
renderer.domElement.focus();

updateFcts.push(function(delta){
    if( keyboard.pressed('left') ){
        if(naveMesh.position.x > -4.7){
            naveMesh.position.x -= 2 * delta;
        }
    }else if( keyboard.pressed('right') ){
        if(naveMesh.position.x < 4.7    ){
            naveMesh.position.x += 2 * delta;
        }
    }
    if( keyboard.pressed('down') ){
        if(naveMesh.position.y > -2.1){
            naveMesh.position.y -= 2 * delta;
        }
    }else if( keyboard.pressed('up') ){
        if(naveMesh.position.y < 2.1){
            naveMesh.position.y += 2 * delta;
        }
    }
});