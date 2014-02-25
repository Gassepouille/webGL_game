app={
	init:function(){
		this.scene.init();
		this.scene.stage.init();
		this.scene.gameobjects.init();
		this.scene.player.init();
		this.scene.monster.init();
		this.scene.light.init();
		this.scene.engine.init();
		this.launchSound();
		this.creditClick();
		this.setblur();
	},
	launchSound:function(){
		var son=document.getElementById("ost");
		son.play();
	},
	creditClick:function(){
		var credclicked=false;
		$("body").on("click","#credits", function(){
			credclicked=!credclicked;
			if (credclicked) {
				$( "#credName" ).animate({
				    bottom:100
				  }, 1500 );
			}else{
				$( "#credName" ).animate({
				    bottom:-200
				  }, 1500 );
			}
		})
	},
	setblur:function(){
		$("#blur").css("width", window.innerWidth);
		$("#blur").css("height", window.innerHeight+200);
	}
}