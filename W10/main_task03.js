function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ], // 2
        [  1,  1, 0 ]  // 3
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
        [ 0, 3, 2 ]  // f1
    ];
    
    var scalars = [
        0.1, // S0
        0.2, // S1
        0.8, // S2
        0.5  // S3
    ];
    
    // Create a color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
    
    var cmap2 = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = 1.0;
        var G = Math.max( Math.cos( ( S ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( ( S ) * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap2.push( [ S, '0x' + color.getHexString() ] );
    }

//    // Draw the color map
//    var lut = new THREE.Lut( 'rainbow', cmap.length );
//    lut.addColorMap( 'mycolormap', cmap );
//    lut.changeColorMap( 'mycolormap' );
//    scene.add( lut.setLegendOn( {
//        'layout':'horizontal',
//        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
//        'dimensions': { 'width': 0.15, 'height': 1.2 }
//    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();
    material.side = THREE.DoubleSide;

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    material.vertexColors = THREE.FaceColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        if(i==0){
            var id = faces[i];
            var rate = 0.7/255
            var S0 = Math.round((scalars[ id[0] ] - 0.1 ) / rate);
            var S1 = Math.round((scalars[ id[1] ] - 0.1 ) / rate);
            var S2 = Math.round((scalars[ id[2] ] - 0.1 ) / rate);
            var C0 = new THREE.Color().setHex( cmap[ S0 ][1] );
            var C1 = new THREE.Color().setHex( cmap[ S1 ][1] );
            var C2 = new THREE.Color().setHex( cmap[ S2 ][1] );
            geometry.faces[i].vertexColors.push( C0 );
            geometry.faces[i].vertexColors.push( C1 );
            geometry.faces[i].vertexColors.push( C2 );
        }else if(i==1){
            var id = faces[i];
            var rate = 0.7/255
            var S0 = Math.round((scalars[ id[0] ] - 0.1 ) / rate);
            var S1 = Math.round((scalars[ id[1] ] - 0.1 ) / rate);
            var S2 = Math.round((scalars[ id[2] ] - 0.1 ) / rate);
            var C0 = new THREE.Color().setHex( cmap2[ S0 ][1] );
            var C1 = new THREE.Color().setHex( cmap2[ S1 ][1] );
            var C2 = new THREE.Color().setHex( cmap2[ S2 ][1] );
            geometry.faces[i].vertexColors.push( C0 );
            geometry.faces[i].vertexColors.push( C1 );
            geometry.faces[i].vertexColors.push( C2 );
        }
    }
    
    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}
