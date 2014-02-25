app.scene.stage={
	init:function(){
		this.addGroundFloor();
	},
	addGroundFloor:function(){
		var loader = new THREE.OBJMTLLoader();
		loader.load( 'assets/models/house/house.obj', 'assets/models/house/house.mtl', function ( object ) {

			object.position.y =0;
			object.name="maMaison";
			app.settings.house=object
			app.settings.obstacles.push(app.settings.house)
			app.settings.scene.add( app.settings.house );
			$("#wait").css("display","none");
			$("#instructions").css("display","block");
		} );
	}
}