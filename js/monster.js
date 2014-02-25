app.scene.monster={
	arriveX:false,
	arriveZ:false,
	vecteur:{},
	rotation:false,
	count:0,
	countY:0,
	up:true,
	changeposY:false,
	threshold:10,
	displaceX:0,
	displaceZ:0,
	init:function(){
		this.displaceX=(Math.random()-0.5)*2;
		this.displaceZ=(Math.random()-0.5)*2;
		this.addMonster();
		this.getAngle();


	},
	addMonster:function(){
		var loader = new THREE.OBJMTLLoader();
		loader.load( 'assets/models/monster.obj', 'assets/models/monster.mtl', function ( object ) {
			object.position.x=-50;
			object.position.y=70;
			object.position.z=-50;
			object.rotation.x=Math.PI*0.5;
			object.rotation.z=Math.PI*0.5;
			object.scale.set(5,5,5);
			object.name="monster";
			app.settings.monster=object;
			app.settings.scene.add( app.settings.monster );

		} );


	},
	monsterMove:function(){
		this.count+=1;

		if (this.count>this.threshold) {
			this.displaceX=(Math.random()-0.5)*1.5;
			this.displaceZ=(Math.random()-0.5)*1.5;
			this.count=0;
			this.countY+=1;
			this.threshold=100+Math.random()*500;
			this.getAngle();
			if (this.countY>10) {
				this.changeposY=true;
				if (app.settings.monster.position.y<30) {
					this.up=true;
				}else{
					this.up=false;
				}
				this.countY=0;
			};
		};

		if (this.changeposY) {
			this.changeY();
		};

		app.settings.monster.position.x+=this.displaceX;
		app.settings.monster.position.z+=this.displaceZ;


		if (app.settings.monster.position.z>145) {
			this.displaceZ=-this.displaceZ;
			this.getAngle();
		};
		if (app.settings.monster.position.z<-195) {
			this.displaceZ=-this.displaceZ;
			this.getAngle();
		};
		if (app.settings.monster.position.x>203) {
			this.displaceX=-this.displaceX;
			this.getAngle();
		};
		if (app.settings.monster.position.x<-134) {
			this.displaceX=-this.displaceX;
			this.getAngle();
		};
		
		if (app.settings.monster.position.x+90>app.settings.controls.getObject().position.x && app.settings.monster.position.x-90<app.settings.controls.getObject().position.x) {
            if (app.settings.monster.position.z+90>app.settings.controls.getObject().position.z && app.settings.monster.position.z-90<app.settings.controls.getObject().position.z) {
        		if (app.settings.zippo==true) {
                    this.pursuit(0.7);
                }else{
                	if (app.settings.monster.position.x+70>app.settings.controls.getObject().position.x && app.settings.monster.position.x-70<app.settings.controls.getObject().position.x) {
            			if (app.settings.monster.position.z+70>app.settings.controls.getObject().position.z && app.settings.monster.position.z-70<app.settings.controls.getObject().position.z) {
            				if (app.settings.run==true) {
            					this.pursuit(0.5);
            				}
            			}else{
    						this.stopsound();
    					}
            		}else{
						this.stopsound();
					}
                	if (app.settings.monster.position.x+50>app.settings.controls.getObject().position.x && app.settings.monster.position.x-50<app.settings.controls.getObject().position.x) {
            			if (app.settings.monster.position.z+50>app.settings.controls.getObject().position.z && app.settings.monster.position.z-50<app.settings.controls.getObject().position.z) {
            				if (app.settings.crouch==false) {
            					this.pursuit(0.4);
            				}else{
            					if (app.settings.monster.position.x+35>app.settings.controls.getObject().position.x && app.settings.monster.position.x-35<app.settings.controls.getObject().position.x) {
            						if (app.settings.monster.position.z+35>app.settings.controls.getObject().position.z && app.settings.monster.position.z-35<app.settings.controls.getObject().position.z) {
            							this.pursuit(0.4);
            						}else{
            							this.stopsound();
            						}
            					}else{
            						this.stopsound();
            					}

            				}
            			}else{
            				this.stopsound();
            			}
            		}else{
            			this.stopsound();
            		}
                }
            }else{
	        	this.stopsound();
	        }
        }else{
			this.stopsound();
        }




		if (app.settings.monster.position.x+25>app.settings.controls.getObject().position.x && app.settings.monster.position.x-25<app.settings.controls.getObject().position.x) {
            if (app.settings.monster.position.z+25>app.settings.controls.getObject().position.z && app.settings.monster.position.z-25<app.settings.controls.getObject().position.z) {
                    app.settings.physicHealth-=0.2;
            };

        };

	},
	changeY:function(){
		if (this.up) {
			app.settings.monster.position.y+=1;
			if (app.settings.monster.position.y>70) {
				app.settings.monster.position.y=70;
				this.changeposY=false;
			};
		}else{
			app.settings.monster.position.y-=1;
			if (app.settings.monster.position.y<25) {
				app.settings.monster.position.y=25;
				this.changeposY=false;
			};
		};
	},
	getAngle:function(){
		var A = 1;
		var B = Math.sqrt(this.displaceX*this.displaceX+this.displaceZ*this.displaceZ)
		var AB=this.displaceZ*1+0;
		var angle=Math.acos(AB/(A*B))
		

		if (this.displaceX>0) {
			angle=-angle
		};

		app.settings.monster.rotation.z=angle;
	},
	pursuit:function(speed){
		document.getElementById("monster").play();
		if (app.settings.monster.position.x<app.settings.controls.getObject().position.x) {
        	this.displaceX=speed;
        }else{
        	this.displaceX=-speed;
        }
        if (app.settings.monster.position.z<app.settings.controls.getObject().position.z) {
        	this.displaceZ=speed;
        }else{
        	this.displaceZ=-speed;
        }
        this.getAngle();
	},
	stopsound:function(){
		document.getElementById("monster").currentTime = 0;
        document.getElementById("monster").pause();
	}
}