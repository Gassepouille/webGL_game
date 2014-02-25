app.scene.engine={
	boolbrain:true,
	boolheart:true,
	init:function(){
		var thedate = new Date();
		var thenow= thedate.getTime();
		app.settings.myTime2=thenow;


		// ----------------------------------------Stats
		this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.bottom = '0px';
		this.stats.domElement.style.zIndex = 100;
		$("body").append( this.stats.domElement );
		// ----------------------------------------Stats



		 window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function( callback ){
	                window.setTimeout(callback, 1000 / 60);
	              };
	    })();
	    (function animLoop(){
	    	requestAnimFrame(animLoop);
	    	app.scene.engine.myRender();
	    })()
	},
	myRender:function(){
		if (app.settings.gamestart && app.settings.win==false && app.settings.loose==false) {
			app.settings.renderer.render( app.settings.scene, app.settings.camera );
			// player Update
			app.scene.player.updatePlayer();
			app.scene.light.updateLight();
			app.scene.monster.monsterMove();
			app.scene.light.lightstatic();


			this.renderLife();
		}else{
			if (app.settings.win) {
				$("#win").animate({
				    top:0,
				    opacity:1,
				  }, 1500 );
				if (app.settings.reload) {
					location.reload();
				};
			};
			if (app.settings.loose) {
				$("#loose").animate({
				    top:0,
				    opacity:1,
				  }, 1500 );
				if (app.settings.reload) {
					location.reload();
				};
			};
		}
		if (app.settings.gamestart) {
			document.getElementById("theme").play();
		};
		// ----------------------------------------Stats
		this.stats.update();
		// ----------------------------------------Stats
	},
	// -------------------------------------------Life and Gas management
	renderLife:function(){
		var gas=document.getElementById("gas");

		var heartis=Math.floor(app.settings.physicHealth);
		var headis=Math.floor(app.settings.mentalHealth);
		switch (true) {
		    case (headis >=75 ):
		        $("#mental").css("backgroundPosition","0px 0px");
		        break;
		    case (headis < 75 && headis >= 50):
		        $("#mental").css("backgroundPosition","-100px 0px");
		        break;
		    case (headis < 50 && headis >= 30):
		        $("#mental").css("backgroundPosition","-200px 0px");
		        break;
		    case (headis < 30 && headis >= 15):
		        $("#mental").css("backgroundPosition","-300px 0px");
		        break;
		    case (headis < 15 ):
		        $("#mental").css("backgroundPosition","-400px 0px");
		        break;
		}
		if (headis==75||headis==50||headis==30||headis==15) {
			if (app.scene.engine.boolbrain==true) {
				app.scene.engine.boolbrain=false;

				$("#blur").animate({ opacity: "1" }, 150 )
							.animate({ opacity: "0" }, 150 )
				$("#mental").animate({ opacity: "0" }, 500 )
							.animate({ opacity: "1" }, 500 )
							.animate({ opacity: "0" }, 500 )
							.animate({ opacity: "1" }, 500, function() {
							    app.scene.engine.boolbrain=true;
						 	})
			};

		};
		
		switch (true) {
		    case (heartis >=75 ):
		        $("#phys").css("backgroundPosition","0px 0px");
		        break;
		    case (heartis < 75 && heartis >= 50):
		        $("#phys").css("backgroundPosition","-100px 0px");
		        break;
		    case (heartis < 50 && heartis >= 25):
		        $("#phys").css("backgroundPosition","-200px 0px");
		        break;
		    case (heartis < 25 && heartis >= 0):
		        $("#phys").css("backgroundPosition","-300px 0px");
		        break;
		}
		if (heartis==75||heartis==50||heartis==25) {
			if (app.scene.engine.boolheart==true) {
				app.scene.engine.boolheart=false;
				$("#blur").animate({ opacity: "1" }, 150 )
							.animate({ opacity: "0" }, 150 )
				$("#phys").animate({ opacity: "0" }, 500 )
							.animate({ opacity: "1" }, 500 )
							.animate({ opacity: "0" }, 500 )
							.animate({ opacity: "1" }, 500, function() {
							    app.scene.engine.boolheart=true;
						 	})
				document.getElementById("hurt").currentTime = 0;
				document.getElementById("hurt").play();
			};

		};



		gas.style.height=Math.floor(app.settings.zippofuel*0.5)+"px";


		var date = new Date();
		var now= date.getTime();
		var addtime=10000+25000*Math.random()
		if (now>app.settings.myTime+addtime) {
			var randunit=(Math.random()<0.5)?1:2;
			var randunit2=this.getRandNum(0,9);
			var monSon="atmo"+randunit+""+randunit2;
			document.getElementById(monSon).currentTime = 0;
            document.getElementById(monSon).play();
			app.settings.myTime=now;
		};
		if (now>app.settings.myTime2+63500) {
			var rand=this.getRandNum(0,5);
			var womSon="wom"+rand;
			document.getElementById(womSon).currentTime = 0;
            document.getElementById(womSon).play();
            app.settings.myTime2=now;
		};
	},
	getRandNum:function(min,max){
   		return Math.floor(min+Math.random()*(max-min+1));
	}
}