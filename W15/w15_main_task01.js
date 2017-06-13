var colorvalue = 0;
var formvalue = 0;

function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    
    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue, colorvalue );
    screen.scene.add( surfaces );
    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    document.getElementById("change-color").addEventListener("click", function(){
        if(colorvalue == 0 || colorvalue == 1){
            colorvalue++;
        }else if(colorvalue == 2){
            colorvalue = 0;
        }

        screen.scene.remove( surfaces );

        if(formvalue == 0){
            surfaces = Isosurfaces( volume, isovalue, colorvalue );
        }else if(formvalue == 1){
            surfaces = Isosurfaces2( volume, isovalue, colorvalue );
        }

        screen.scene.add( surfaces );
    });

    document.getElementById("change-form").addEventListener("click", function(){
        if(formvalue == 0){
            formvalue++;
        }else if(formvalue == 1){
            formvalue = 0;
        }

        screen.scene.remove( surfaces );

        if(formvalue == 0){
            surfaces = Isosurfaces( volume, isovalue, colorvalue );
        }else if(formvalue == 1){
            surfaces = Isosurfaces2( volume, isovalue, colorvalue );
        }

        screen.scene.add( surfaces );
    });

    screen.loop();
}
