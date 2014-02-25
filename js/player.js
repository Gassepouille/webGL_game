app.scene.player={
	init:function(){
        this.clock = new THREE.Clock();
        this.keyboard = new THREEx.KeyboardState();
        this.addPlayer();
        this.time=Date.now()-2;  
	},
    addPlayer:function(){   
        // add control
        app.controls.pointerLocker();
        // addCam to player
        this.bindCam();
        this.addHand();
    },
    addHand:function(){

        var loader = new THREE.OBJMTLLoader();
        loader.load( 'assets/models/main.obj', 'assets/models/main.mtl', function ( object ) {

            object.name="hand";
            object.scale.set(0.2,0.2,0.2);
            object.position.x=2;
            object.position.y=-3.8;
            object.position.z=2;
            object.rotation.y=1.5*Math.PI;
            app.settings.hand=object;
            var fire=app.scene.player.getfaya();
            app.settings.hand.add(fire);
            app.settings.controls.getObject().children[0].add(app.settings.hand );

        } );
    },
    bindCam:function(){
        app.settings.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 300 );
        app.settings.controls = new THREE.PointerLockControls( app.settings.camera );
        app.settings.scene.add( app.settings.controls.getObject() );
    },
    getfaya:function(){
        var geometry = new THREE.SphereGeometry( 0.2, 35, 16 ,0, Math.PI, 0, Math.PI );
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,opacity:0.1,transparent:true} );
        app.settings.faya = new THREE.Mesh( geometry, material );
        app.settings.faya.position.x=-18.5;
        app.settings.faya.position.y=14.8;
        app.settings.faya.position.z=2;
        app.settings.faya.name="faya"
        // SUPER SIMPLE GLOW EFFECT
        // use sprite because it appears the same from all angles
        var spriteMaterial = new THREE.SpriteMaterial( 
        { 
            map: new THREE.ImageUtils.loadTexture( 'assets/img/glow.png' ), 
            useScreenCoordinates: false,
            color: 0xEDC85A, transparent: false, blending: THREE.AdditiveBlending
        });
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(1, 1, 1.0);
        app.settings.faya.add(sprite); // this centers the glow at the mesh

        return app.settings.faya;

    },
    updatePlayer:function(){
        app.settings.controls.update( Date.now() - this.time );
        this.time = Date.now();
        // sound teeth
        if (app.settings.mentalHealth<15) {
            document.getElementById("teeth").currentTime = 0;
            document.getElementById("teeth").pause();
            document.getElementById("laugh").play();
        }else{
            document.getElementById("laugh").currentTime = 0;
            document.getElementById("laugh").pause();
            if (app.settings.mentalHealth<50) {
            document.getElementById("teeth").play();
            }else{
                document.getElementById("teeth").currentTime = 0;
                document.getElementById("teeth").pause();
            }
        }

        

        // zippo management
        if (app.settings.zippo && app.settings.zippofuel>0) {
            // sound zippo
            if (app.settings.hand.position.z>2){
                document.getElementById("lighter").currentTime = 0;
                document.getElementById("lighter").play();
            }
            

            app.settings.zippofuel-=0.03;

            app.settings.faya.children[0].scale.x=(0.02*app.settings.zippofuel<1)?0.02*app.settings.zippofuel:1;
            app.settings.faya.children[0].scale.y=(0.02*app.settings.zippofuel<1)?0.02*app.settings.zippofuel:1;
            app.settings.faya.children[0].scale.z=(0.02*app.settings.zippofuel<1)?0.02*app.settings.zippofuel:1;

                // intensity light
            if (app.settings.pointLight.intensity<0.02*app.settings.zippofuel && 0.02*app.settings.zippofuel<1) {
                app.settings.pointLight.intensity+=0.05
            }else{
                app.settings.pointLight.intensity=(0.02*app.settings.zippofuel<1)?0.02*app.settings.zippofuel:1;
            }

            if (app.settings.pointLight.intensity<0.3) {
                app.settings.pointLight.intensity=0.3
            };
            //  distance light
            if (app.settings.pointLight.distance<80) {
                app.settings.pointLight.distance+=1.5
            }else{
                app.settings.pointLight.distance=80;
            }
            //  Hand pos
            if (app.settings.hand.position.z>-0.5) {
                app.settings.hand.position.z-=0.1;
            }else{
                app.settings.hand.position.z=-0.5;
            }


            // FOG 
            if (app.settings.scene.fog.density>0.2/app.settings.zippofuel) {
                app.settings.scene.fog.density-=0.0002
            }else{
                app.settings.scene.fog.density=0.2/app.settings.zippofuel;
            }
            if (app.settings.scene.fog.density<0.008) {
                app.settings.scene.fog.density=0.008
            };
            if (app.settings.scene.fog.density>0.015) {
                app.settings.scene.fog.density=0.015
            };

        }else{
            if (app.settings.pointLight.intensity>0) {
                app.settings.pointLight.intensity-=0.01;
            }else{
                app.settings.pointLight.intensity=0;
            }
            
            if (app.settings.pointLight.distance>0) {
                app.settings.pointLight.distance-=1;
            }else{
                app.settings.pointLight.distance=0;
            }

            // Hand pos
            if (app.settings.hand.position.z<3) {
                app.settings.hand.position.z+=0.1;
            }else{
                app.settings.hand.position.z=3;
            }

            // FOG 
            if (app.settings.scene.fog.density<0.0175) {
                app.settings.scene.fog.density+=0.0001
            }else{
                app.settings.scene.fog.density=0.0175;
            }
        }
        app.settings.pointLight.intensity=1
        app.settings.pointLight.distance=1000

        if (!app.settings.zippo || app.settings.zippofuel<5) {
            var mentaldown=true;
            
            for (var i = 0; i < app.settings.tablights.length; i++) {
                if (app.settings.tablights[i].position.x+10>app.settings.controls.getObject().position.x && app.settings.tablights[i].position.x-10<app.settings.controls.getObject().position.x) {
                    if (app.settings.tablights[i].position.z+10>app.settings.controls.getObject().position.z && app.settings.tablights[i].position.z-10<app.settings.controls.getObject().position.z) {
                        if (app.settings.tablights[i].position.y-20<app.settings.controls.getObject().position.y && app.settings.tablights[i].position.y>app.settings.controls.getObject().position.y) {
                            if (i!=app.scene.light.rand) {
                                mentaldown=false;
                                break;
                            };
                        };
                    };

                };
            };
            (mentaldown)? app.settings.mentalHealth-=0.05:app.settings.mentalHealth+=0.003;
        };

        
        if (app.settings.mentalHealth<=0) {
            app.settings.loose=true;
        };
        if (app.settings.physicHealth<=0) {
            app.settings.loose=true;
        };
    },
}