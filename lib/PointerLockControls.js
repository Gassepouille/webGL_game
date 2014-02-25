/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.x = -8;
	yawObject.position.y = 30;
	yawObject.position.z = 62;
	yawObject.add( pitchObject );
	yawObject.name="playa";
	var frame=0;
	var gamepad={
		connected:false,
		up:false,
		right:false,
		down:false,
		left:false,
		O:false,
		U:false,
		Y:false,
		A:false,
		l1:false,
		l2:false,
		l3:false,
		r1:false,
		r2:false,
		r3:false,
		joystickLeft:{
			axeX:0,
			axeY:0,
		},
		joystickRight:{
			axeX:0,
			axeY:0,
		}
	}
	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	var acceleration=1;
	var crouch=false;
	var Jump=false;
	var JumpHeight=0;
	var canJump = true;
	var padForward=false;
	var padRight=false;
	var padBackward=false;
	var padLeft=false;
	var padacceleration=1;
	var padcrouch=false;
	var padJump=false;
	var rising=false;
	var padrising=false;
	var velocity = new THREE.Vector3();
	var crouchvalue=0;
	var PI_2 = Math.PI / 2;

	// ------- Collision var 
	var myY=20;
   	yawObject.caster = new THREE.Raycaster();
   	var groundDistance=18;
   	yawObject.groundCollision = new THREE.Raycaster();
	yawObject.groundCollision.ray.direction.set( 0, -1, 0 );

	// -------- CollectObject
	var arrayQuest=app.settings.gameObj;
	var pickItUp=false;
	var picking=false;
	var lastcheck=-1;

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};
	var onKeyDown = function ( event ) {
		switch ( event.keyCode ) {

			case 38: // up
			case 69: // e
				moveForward = true;
				break;

			case 37: // left
			case 83: // s
				moveLeft = true; break;

			case 40: // down
			case 68: // d
				moveBackward = true;
				break;

			case 39: // right
			case 70: // f
				moveRight = true;
				break;

			case 32: // space
				if(canJump)rising=Jump=true;				
				// true;
				break;

			case 16: // shift
				acceleration=2;
				break;

			case 65: // a
			case 81: // q
				crouch=true;
				break;
			case 71: // g
				picking=true;
				break;
			case 13: // enter
				app.settings.reload=true;
				break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 69: // e
				moveForward = false;
				break;

			case 37: // left
			case 83: // s
				moveLeft = false;
				break;

			case 40: // down
			case 68: // d
				moveBackward = false;
				break;

			case 39: // right
			case 70: // f
				moveRight = false;
				break;

			case 16: // shift
				acceleration = 1;
				break;

			case 65: // a
			case 81: // q
				crouch=false;
				crouching=true;
				break;

			case 71: // g
				picking=false;
				break;
			case 13: // enter
				app.settings.reload=false;
				break;
			case 73: // i
				console.log(yawObject.position)
				break;

		}

	};
	var lightOn=function(){
		if (app.settings.zippofuel>0) {
			app.settings.zippo=true;
		};
	}
	var lightOff=function(){
		app.settings.zippo=false;
	}
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mousedown', lightOn, false );
	document.addEventListener( 'mouseup', lightOff, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, -1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
			var v = yawObject.position.clone();
			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();

	this.update = function ( delta ) {
		if (isNaN(yawObject.position.z)) {
			yawObject.position.z=110
		};
		if (isNaN(yawObject.position.x)) {
			yawObject.position.x=100
		};
		this.updateGamepad();
		this.checkView();
		if ( scope.enabled === false ) return;

		
		frame+=(acceleration!=1 || padacceleration!=1)?0.3 : 0.2;
		delta *= 0.1;
		velocity.x += ( - velocity.x ) * 0.08 * delta;
		velocity.z += ( - velocity.z ) * 0.08 * delta;

		if ( moveForward || padForward ){
			velocity.z -= 0.04 *acceleration*padacceleration* delta;
		}
		if ( moveBackward || padBackward ){
			velocity.z += 0.04 *acceleration*padacceleration* delta;
		}

		if ( moveLeft || padLeft){
			velocity.x -= 0.04 *acceleration*padacceleration* delta;
		}
		if ( moveRight || padRight ){
			velocity.x += 0.04 *acceleration*padacceleration* delta;
		}
		if (moveRight || padRight || moveLeft || padLeft || moveBackward || padBackward || moveForward || padForward) {
			myY+=(acceleration!=1 || padacceleration!=1)?Math.sin(frame)*0.3 : Math.sin(frame)*0.2;
			// audio steps
			if (Math.sin(frame)<-0.9 && canJump) document.getElementById("step").play();
		};
		// audio breath
		if(acceleration!=1 || padacceleration!=1){
			if (app.settings.mentalHealth>50) document.getElementById("breath").play();
			app.settings.run=false;
		}else{
			app.settings.run=true;
			document.getElementById("breath").pause();
			document.getElementById("breath").currentTime = 0;
		}
		
		if (picking) {
			if (pickItUp==true) {
				var nameObj=lastcheck.name;
				removeFromArray(lastcheck.name)
				app.settings.scene.remove(lastcheck)
				picking=false;
				app.scene.gameobjects.act(nameObj)
			};
		};

		if (Jump  || padJump ) {
			if (rising||padrising) {
				
				JumpHeight+=1;
				
				if (JumpHeight>4) rising=padrising=false;
			}else{
				JumpHeight-=1;
			}
			myY+=JumpHeight;
			
			if (JumpHeight<0) {
				Jump=false;
				padJump=false;
				JumpHeight=0;
				
			};
		};
		if (crouch||padcrouch) {
			app.settings.crouch=true;
			groundDistance=11;
			crouchvalue+=1;
			if (crouchvalue>7){
				crouchvalue=7
			};
		}else{
			groundDistance=18
			crouchvalue-=1;
			if (crouchvalue<0)crouchvalue=0;
			app.settings.crouch=false;
		}

		this.testCollision();

		yawObject.translateX( velocity.x );
		yawObject.translateZ( velocity.z );

		yawObject.position.y=myY-crouchvalue;


	};
	// ---------------------- Gamepad controls
	this.updateGamepad=function(){
		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
			var gamepads = navigator.webkitGetGamepads();

			gamepad.connected = !! gamepads[0];

			// if a gamepad is connected this object will be fill 
			if (!gamepads[0])
				return false;

			// We get the 1st connected gamepad
			var mainGamepad = gamepads[0];

			gamepad.up = mainGamepad.buttons[12] === 1;
			gamepad.right = mainGamepad.buttons[15] === 1;
			gamepad.down = mainGamepad.buttons[13] === 1;
			gamepad.left = mainGamepad.buttons[14] === 1;

			gamepad.O = mainGamepad.buttons[0] === 1;
			gamepad.U = mainGamepad.buttons[2] === 1;
			gamepad.Y = mainGamepad.buttons[3] === 1;
			gamepad.A = mainGamepad.buttons[1] === 1;

			gamepad.l1 = mainGamepad.buttons[6];
			gamepad.l2 = mainGamepad.buttons[4];
			gamepad.r1 = mainGamepad.buttons[7];

			gamepad.joystickLeft.axeX = mainGamepad.axes[0];
			gamepad.joystickLeft.axeY = mainGamepad.axes[1];
			gamepad.joystickRight.axeX = mainGamepad.axes[2];
			gamepad.joystickRight.axeY = mainGamepad.axes[3];

			// error threshold for joystick
			gamepad.joystickLeft.axeX = ( Math.abs(0 - gamepad.joystickLeft.axeX) > 0.15) ? gamepad.joystickLeft.axeX : 0;
			gamepad.joystickLeft.axeY = ( Math.abs(0 - gamepad.joystickLeft.axeY) > 0.15) ? gamepad.joystickLeft.axeY : 0;

			gamepad.joystickRight.axeX = ( Math.abs(0 - gamepad.joystickRight.axeX) > 0.15) ? gamepad.joystickRight.axeX : 0;
			gamepad.joystickRight.axeY = ( Math.abs(0 - gamepad.joystickRight.axeY) > 0.15) ? gamepad.joystickRight.axeY : 0;
			gamepadbuttondown();
		};
	};
	var gamepadbuttondown=function(){
		padForward =(gamepad.up)? true : false;
		padRight =(gamepad.right)? true : false;
		padBackward =(gamepad.down)? true : false;
		padLeft=(gamepad.left)? true : false;
		padacceleration=(gamepad.l1>0.05)? 1+gamepad.l1:1;
		padcrouch=(gamepad.l2)? true:false;
		picking=(gamepad.U)?true:false;
		app.settings.reload=(gamepad.Y)?true:false;

		if (gamepad.O) {
			if(canJump)padrising=padJump=true;
		};

		if (gamepad.r1>0.05) {
			lightOn();
		}else{
			lightOff();
		}

		yawObject.rotation.y -= gamepad.joystickRight.axeX*0.03;
		pitchObject.rotation.x -= gamepad.joystickRight.axeY*0.03 ;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
	};
	// --------------------------Collision Test
	this.testCollision=function(){
		var collisions, distanceCol = 8;
		var obstacles = this.getObstacles();
		for (var i = 0; i < 8; i++) {
			var myRayVec=this.getRay(i);
			var ray = new THREE.Raycaster(yawObject.position, myRayVec, yawObject.position, distanceCol);
			collisions = ray.intersectObjects(obstacles,true);
			if (collisions.length > 0 && collisions[0].distance <= distanceCol) {
				// front
                if ((i === 0 || i === 1 || i === 7) && velocity.z <0) {
                    velocity.z=0;
                    // back
                } else if ((i === 3 || i === 4 || i === 5) && velocity.z >0) {
                    velocity.z=0;
                }
                // left
                if ((i === 1 || i === 2 || i === 3) && velocity.x <0) {
                    velocity.x=0;
                   // right
                } else if ((i === 5 || i === 6 || i === 7) && velocity.x >0) {
                    velocity.x=0;
                }
            }
		};

		// ------------ Ground collision

		var groundRayDir= new THREE.Vector3( 0, -1, 0 );
		var groundRay = new THREE.Raycaster(yawObject.position, groundRayDir, yawObject.position, groundDistance-1-Math.sin(frame)*0.1);
		var groundCollisions = groundRay.intersectObjects(obstacles,true);
		if (groundCollisions.length > 0 && groundCollisions[0].distance <= groundDistance-1-Math.sin(frame)*0.1) {
			if (myY<yawObject.position.y+(yawObject.position.y-groundCollisions[0].distance)) {
				 myY+=1;
			};	
		}
		var groundRay2 = new THREE.Raycaster(yawObject.position, groundRayDir, yawObject.position, 20);
		var groundCollisions2 = groundRay2.intersectObjects(obstacles,true);
		if (groundCollisions2.length == 0) {
			myY-=1;
			canJump=false;
		}else{
			canJump=true;
		}




	};
	// ----------------------------------------------------------------- List of obstacles
	this.getObstacles=function(){
		var myObstacles=app.settings.obstacles;
		return myObstacles;
	}
	this.getRay=function(myAngle){
		var vector = this.getDirection()
		var axis = new THREE.Vector3( 0, 1, 0 );
		vector.y=-1;
		switch( myAngle ) {
			case 0: // front
				var angle = 2*Math.PI;
				break;
			case 1: // front left
				var angle = Math.PI / 4;
				break;
			case 2: // left
				var angle = Math.PI / 2;
				break;
			case 3: // back left
				var angle = 3*Math.PI / 4;
				break;
			case 4: // back
				var angle = Math.PI ;
				break;
			case 5: // back right
				var angle = 5*Math.PI / 4;
				break;
			case 6: // right
				var angle = 3*Math.PI / 2;
				break;
			case 7: // front right
				var angle = 7*Math.PI / 4;
				break;
		}

		var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );
		return vector.applyMatrix4( matrix );
	};
	this.getQuestObject=function(){
		var myQuestObj=arrayQuest;
		return myQuestObj;
	}
	var removeFromArray=function(name){
		for (var i = 0; i < arrayQuest.length; i++) {
			if (arrayQuest[i].name==name) {
				app.settings.scene.remove(arrayQuest[i])
				arrayQuest.splice(i,1);
				break;
			};
		};
	}
	this.checkView=function(){
		var detectObj, distanceDetect = 80;
		var obstacles = this.getQuestObject();
		var myView=this.getDirection();
		var rayQuest = new THREE.Raycaster(yawObject.position, myView, yawObject.position, distanceDetect);
		detectObj = rayQuest.intersectObjects(obstacles,true);
		
		if (detectObj.length > 0 && detectObj[0].distance <= distanceDetect) {
			if (!pickItUp){
				document.getElementById("oh").currentTime = 0;
				document.getElementById("oh").play();
				var sprite=this.addGlow();
				detectObj[0].object.add(sprite)
				lastcheck=detectObj[0].object;
			}
			pickItUp=true;
        }else{
        	pickItUp=false;
        	if (lastcheck!=-1) {
        		lastcheck.remove(lastcheck.children[0])
        		lastcheck=-1;
        	};
        	
        	document.getElementById("oh").pause();
        }
	}
	this.addGlow=function(){
		 var spriteMaterial = new THREE.SpriteMaterial({ 
            map: new THREE.ImageUtils.loadTexture( 'assets/img/glow.png' ), 
            useScreenCoordinates: false,
            color: 0xff0000, 
            transparent: true, 
            blending: THREE.AdditiveBlending,
            opacity:0.3
        });
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.name="lightmyfire"
        sprite.scale.set(6, 6, 6);
        return sprite;
	}
	

};
