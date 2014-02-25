app.scene.gameobjects={
	init:function(){
		this.setQuestObj();
		this.setFuelObject();
		this.setBlockObject();
	},
	setQuestObj:function(){
		// 1st book model
		var materialArray = [];
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/book_closed.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/book_closed.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/book_top.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/book_top.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/book_side.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/book_back.png' ) }));
		var bookMaterial = new THREE.MeshFaceMaterial(materialArray);
        var geometry = new THREE.CubeGeometry(2,5,5);
        
        // init books
        for (var i = 0; i < 4; i++) {
        	var book = new THREE.Mesh( geometry, bookMaterial );
	        book.name="book"+i;
	       	app.settings.gameObj.push(book);
	        app.settings.scene.add(book);
        };

        // -------- position de l'objet dans le décors 
        for (var j = 0; j < 4; j++) {
        	switch(j){
        		case 0:
        			app.settings.gameObj[j].position.x = -135;
		        	app.settings.gameObj[j].position.y = 5;
		       		app.settings.gameObj[j].position.z = 0;
		       		app.settings.gameObj[j].rotation.z = Math.PI*0.5;
        			break;
        		case 1:
        			app.settings.gameObj[j].position.x = -93;
		        	app.settings.gameObj[j].position.y = 53;
		       		app.settings.gameObj[j].position.z = -101;
		       		app.settings.gameObj[j].rotation.y = Math.PI;
        			break;
        		case 2:
        			app.settings.gameObj[j].position.x = -109;
		        	app.settings.gameObj[j].position.y = 61;
		       		app.settings.gameObj[j].position.z = -115;
        			break;
        		case 3:
        			app.settings.gameObj[j].position.x = 50;
		        	app.settings.gameObj[j].position.y = 7;
		       		app.settings.gameObj[j].position.z = 143;
        			break;
        	}
        };

        //  2nd book model
        var book2 = new THREE.ImageUtils.loadTexture( 'assets/textures/book_open.png' );
		var bookMaterial2 = new THREE.MeshLambertMaterial( { map: book2 } );
		var geometry2 = new THREE.CubeGeometry(0.5,5,10);

        for (var k = 4; k < 7; k++) {
        	var book = new THREE.Mesh( geometry2, bookMaterial2 );
	        book.name="book"+k;
	       	app.settings.gameObj.push(book);
	        app.settings.scene.add(book);
        };
        //  --------- position
        for (var l = 4; l < 7; l++) {
        	switch(l){
        		case 4:
        			app.settings.gameObj[l].position.x = 170;
		        	app.settings.gameObj[l].position.y = 5;
		       		app.settings.gameObj[l].position.z = -153;
		       		app.settings.gameObj[l].rotation.z = Math.PI*0.5;
        			break;
        		case 5:
        			app.settings.gameObj[l].position.x = 155;
		        	app.settings.gameObj[l].position.y = 50;
		       		app.settings.gameObj[l].position.z = 31;
		       		app.settings.gameObj[l].rotation.z = Math.PI*0.5;
        			break;
        		case 6:
        			app.settings.gameObj[l].position.x = -131;
		        	app.settings.gameObj[l].position.y = 50;
		       		app.settings.gameObj[l].position.z = 0;
		       		app.settings.gameObj[l].rotation.z = Math.PI*0.5;
        			break;
        	}
        };
        app.settings.objQuestNum=7;   
	},
	setFuelObject:function(){
		// fuel model
		var materialArray = [];
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/zippo.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/zippo.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/zippo_top.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/zippo_top.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/zippo.png' ) }));
		materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( 'assets/textures/zippo.png' ) }));
		var gasMaterial = new THREE.MeshFaceMaterial(materialArray);
        var geometry = new THREE.CubeGeometry(2,4,2);
        
        // init fuel
        for (var i = 0; i < 6; i++) {
        	var gas = new THREE.Mesh( geometry, gasMaterial );
	        gas.name="gas"+i;
	        // -------- position fuel 
        	switch(i){
        		case 0:
        			gas.position.x = -51;
		        	gas.position.y = 5;
		       		gas.position.z = -162;
        			break;
        		case 1:
        			gas.position.x = -30;
		        	gas.position.y = 5;
		       		gas.position.z = -35;
        			break;
        		case 2:
        			gas.position.x = 47;
		        	gas.position.y = 67;
		       		gas.position.z = 3;
        			break;
        		case 3:
        			gas.position.x = 160;
		        	gas.position.y = 5;
		       		gas.position.z = -81;
        			break;
        		case 4:
        			gas.position.x = 146;
		        	gas.position.y = 50;
		       		gas.position.z = -170;
		       		gas.rotation.z = Math.PI*0.5;
        			break;
        		case 5:
        			gas.position.x = -35;
		        	gas.position.y = 69;
		       		gas.position.z = -188;
        			break;
        	}
        	app.settings.gameObj.push(gas);
	        app.settings.scene.add(gas);
        };

        
	},
	act:function(nameObj){
		for (var i = 0; i < 6; i++) {
			if (nameObj=="gas"+i) {
				if (app.settings.zippofuel<100) {
					app.settings.zippofuel+=35;
				}else{
					app.settings.zippofuel=100;
				}
				
				break;
			};
		};
		for (var i = 0; i < 7; i++) {
			if (nameObj=="book"+i) {
				app.settings.objQuestNum-=1;
				if (app.settings.objQuestNum>0) {
					$("#found span").empty();
					$("#found span").text(app.settings.objQuestNum);
					 $( "#found" ).animate({
					    opacity: 1,
					  }, 2000, function() {
					    $( "#found" ).animate({
						    opacity: 0,
						  }, 3000 );
					  });
				}else{
					app.settings.win=true;
				}

			};
		};
	},
	setBlockObject:function(){
		var cubeGeometry = new THREE.CubeGeometry( 46, 45, 40 );
		var crateTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/Crate.jpg' );
		var crateMaterial = new THREE.MeshLambertMaterial( { map: crateTexture } );

		// Crates to block the ways out 1st floor 

		var crate = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate.position.set(-2, 15, -227);
		crate.scale.set(1.3,1.3,1.3);
		app.settings.crate=crate;
		app.settings.obstacles.push(crate)
		app.settings.scene.add( app.settings.crate );

		var crate2 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate2.position.set(-150, 15, 140);
		crate2.rotation.y=Math.PI*0.25
		app.settings.crate2=crate2
		app.settings.obstacles.push(crate2)
		app.settings.scene.add( app.settings.crate2 );

		var crate3 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate3.position.set(-45, 19, 145);
		crate3.rotation.y=-Math.PI*0.24
		app.settings.crate3=crate3
		app.settings.obstacles.push(crate3)
		app.settings.scene.add( app.settings.crate3 );

		var crate4 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate4.position.set(-100, 19, 160);
		app.settings.crate4=crate4
		app.settings.obstacles.push(crate4)
		app.settings.scene.add( app.settings.crate4 );

		var crate5 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate5.position.set(-100, 19, -227);
		app.settings.crate5=crate5
		app.settings.obstacles.push(crate5)
		app.settings.scene.add( app.settings.crate5 );

		// Crate to block the ways out 2nd floor

		var crate6 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate6.position.set(0, 67, -224);
		crate6.scale.set(5,0.7,0.7);
		app.settings.crate6=crate6;
		app.settings.obstacles.push(crate6)
		app.settings.scene.add( app.settings.crate6 );

		var crate7 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate7.position.set(-100, 67, 90);
		crate7.scale.set(1.3,0.7,0.7);
		app.settings.crate7=crate7
		app.settings.obstacles.push(crate7)
		app.settings.scene.add( app.settings.crate7 );

		var crate72 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate72.position.set(0, 67, 110);
		crate72.scale.set(1.3,0.7,0.7);
		app.settings.crate72=crate72
		app.settings.obstacles.push(crate72)
		app.settings.scene.add( app.settings.crate72 );

		var crate73 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate73.position.set(100, 67, 90);
		crate73.scale.set(1.3,0.7,0.7);
		app.settings.crate73=crate73
		app.settings.obstacles.push(crate73)
		app.settings.scene.add( app.settings.crate73 );



		var crate8 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate8.position.set(189, 67, 0);
		crate8.scale.set(0.7,0.7,5);
		app.settings.crate8=crate8
		app.settings.obstacles.push(crate8)
		app.settings.scene.add( app.settings.crate8 );

		var crate9 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate9.position.set(-166, 67, 0);
		crate9.scale.set(0.7,0.7,5);
		app.settings.crate9=crate9
		app.settings.obstacles.push(crate9)
		app.settings.scene.add( app.settings.crate9 );





		var crate11 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate11.position.set(-125, 15, -60);
		crate11.scale.set(0.5,0.5,0.5);
		app.settings.crate11=crate11
		app.settings.obstacles.push(crate11)
		app.settings.scene.add( app.settings.crate11 );

		var crate12 = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
		crate12.position.set(125, 15, -131);
		crate12.scale.set(0.5,0.5,0.5);
		app.settings.crate12=crate12
		app.settings.obstacles.push(crate12)
		app.settings.scene.add( app.settings.crate12 );

		
	}
}