app.scene.light={
	lightframe:0,
	rand:-1,
	count:0,
	statlimit:0,
	init:function(){

		// --- light character 25
		app.settings.pointLight = new THREE.PointLight(0xF08141,0,0);
		app.settings.scene.add(app.settings.pointLight);

		app.settings.hemiLight = new THREE.HemisphereLight( 0xffdbdb, 0xffdbdb, 0.19 ); 
		// app.settings.hemiLight = new THREE.HemisphereLight( 0xffdbdb, 0xffdbdb, 1 ); 
		app.settings.scene.add( app.settings.hemiLight )



		this.addHouseLights();
	},
	updateLight:function(){
		
		app.settings.pointLight.position=app.settings.controls.getObject().position;
	},
	addHouseLights:function(){

		//---------1st Light 

		var geometry = new THREE.SphereGeometry(0.25, 35, 16);
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,opacity:0.5,transparent:true} );
       	var lightRay = new THREE.Mesh( geometry, material );
       	lightRay.name="lamp1"
        // SUPER SIMPLE GLOW EFFECT
        // use sprite because it appears the same from all angles
        var spriteMaterial = new THREE.SpriteMaterial({ 
            map: new THREE.ImageUtils.loadTexture( 'assets/img/glow.png' ), 
            useScreenCoordinates: false,
            color: 0xEDC85A, 
            transparent: true, 
            blending: THREE.AdditiveBlending,
            opacity:0.5
        });
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(25, 25, 25);
        lightRay.add(sprite);

        lightRay.position.x=118;
        lightRay.position.y=38;
        lightRay.position.z=89;
        app.settings.scene.add(lightRay);
		app.settings.tablights.push(lightRay)

        // ------------- 2nd light

       	var lightRay2 = new THREE.Mesh( geometry, material );
       	lightRay2.name="lamp2"

        var sprite2 = new THREE.Sprite( spriteMaterial );
        sprite2.scale.set(25, 25, 25);
        lightRay2.add(sprite2);

        lightRay2.position.x=-124;
        lightRay2.position.y=38;
        lightRay2.position.z=-83;
        app.settings.scene.add(lightRay2);
        app.settings.tablights.push(lightRay2)

        // --------3rd light

       	var lightRay3 = new THREE.Mesh( geometry, material );
       	lightRay3.name="lamp3"

        var sprite3 = new THREE.Sprite( spriteMaterial );
        sprite3.scale.set(25, 25, 25);
        lightRay3.add(sprite3);

        lightRay3.position.x=26;
        lightRay3.position.y=38;
        lightRay3.position.z=-44;
        app.settings.scene.add(lightRay3);
        app.settings.tablights.push(lightRay3)

        // --------4th light

       	var lightRay4 = new THREE.Mesh( geometry, material );
       	lightRay4.name="lamp4"

        var sprite4 = new THREE.Sprite( spriteMaterial );
        sprite4.scale.set(25, 25, 25);
        lightRay4.add(sprite4);

        lightRay4.position.x=-94;
        lightRay4.position.y=80;
        lightRay4.position.z=44;
        app.settings.scene.add(lightRay4);
        app.settings.tablights.push(lightRay4);

        // --------5th light

       	var lightRay5 = new THREE.Mesh( geometry, material );
       	lightRay5.name="lamp5"

        var sprite5 = new THREE.Sprite( spriteMaterial );
        sprite5.scale.set(25, 25, 25);
        lightRay5.add(sprite5);

        lightRay5.position.x=125;
        lightRay5.position.y=80;
        lightRay5.position.z=-77;
        app.settings.scene.add(lightRay5);
        app.settings.tablights.push(lightRay5);



	},
	lightstatic:function(){
		this.lightframe+=0.1;
		if (this.rand==-1) {
				this.rand=this.getRandNum(0,app.settings.tablights.length-1);
				this.statlimit=100+Math.random()*1000;
		}else{
			this.count+=1
			if (this.count>this.statlimit) {

				app.settings.tablights[this.rand].children[0].scale.set(25,25,25);
				this.count=0;
				this.rand=-1;
			}else{
				app.settings.tablights[this.rand].children[0].scale.x=25*Math.abs(Math.sin(this.lightframe));
				app.settings.tablights[this.rand].children[0].scale.y=25*Math.abs(Math.sin(this.lightframe));
				app.settings.tablights[this.rand].children[0].scale.z=25*Math.abs(Math.sin(this.lightframe));
			}
			

		}
	},
	getRandNum:function(min,max){
   		return Math.floor(min+Math.random()*(max-min+1));
	}
}