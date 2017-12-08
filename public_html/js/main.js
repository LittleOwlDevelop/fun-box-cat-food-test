// BOOTSTRAP TABLE WIDTH

const deviceMinWidth_lg = 1200;
const deviceMinWidth_md = 992;
const deviceMinWidth_sm = 768;


const preloaderAnimationDuration = 400;

// Cart class
function Card(id){
	this.GetStatusList = function(){
		return ["default", "selected", "disabled", "on_process"]; // "on_process" not used now
	},
	this.id = id;
	
	
	this.selector = ".js-cat-food-block";
	this.selectorCard = ".js-cat-food-block-card";
	this.selectorOrderText = ".js-cat-food-block-order-text";
	this.selectorOrderText__Examples = ".js-cat-food-block__order-text-example";
	this.hoverClass = "selected-can-be-hover";
	
	this.status = "default";

	
	this.setStatus = function(newStatus){
		var thisCard = this;
		
		var $DOM_thisCard = $("#" + thisCard.id);
		
		if(newStatus == thisCard.status) return 0;
		if ( $.inArray( newStatus, thisCard.GetStatusList) ){
			thisCard.status = newStatus;
			
			switch(thisCard.status){ // WARN: callback with NEW status
				case "default":
					$DOM_thisCard.removeClass("selected");
					$DOM_thisCard.removeClass(thisCard.hoverClass);
					//$DOM_thisCard.addClass("default");
					var newText = thisCard.__getExampleTextByStatus(thisCard.status);
					if(newText !== false){
						$DOM_thisCard.find(thisCard.selectorOrderText).html(newText);
						thisCard.__bindClickOnOrderLink();
					}
					break;
				case "selected":
					//$DOM_thisCard.removeClass("default");
					$DOM_thisCard.addClass("selected");
					var newText = thisCard.__getExampleTextByStatus(thisCard.status);
					if(newText !== false){
						$DOM_thisCard.find(thisCard.selectorOrderText).html(newText);
						//thisCard.__bindClickOnOrderLink();
					}
					break;
				default:
					console.log("CRITICAL ERROR: BAD NEW STATUS! What happened?");
					return false;
					break;
			}
			
			return true;
		}
		else return false;
	};
	this.getStatus = function(){
		var thisCard = this;
		
		if ( $.inArray( thisCard.status, statusList) ) return status;
		else return false;
	};
	this.__userClickedEvent = function(){
		var thisCard = this;
		
		switch(thisCard.status){
			case "disabled":
			case "on_process":
				return 0;
				break;
			case "default":
				return thisCard.setStatus("selected");
				break;
			case "selected":
				return thisCard.setStatus("default");
				break;
			default:
				return false;
				break;
		}
	};
	this.__bindClickOnOrderLink = function(){ // Delegate click from order text to card (for switch selection)
		var thisCard = this;
		
		var $DOM_thisCard = $("#" + thisCard.id);
		
		var $orderText = $DOM_thisCard.find(thisCard.selectorOrderText);
		if($orderText.find("a").length){
			$orderText.find("a").bind("click",function(e){
				e.preventDefault(e);
				
				//$DOM_thisCard.find(thisCard.selectorCard).click();
				thisCard.__userClickedEvent();
			});
		}
	};
	this.__getExampleTextByStatus = function(requiredStatus){
		var thisCard = this;
		
		var $DOM_thisCard = $("#" + thisCard.id);
		
		if ( $.inArray( requiredStatus, thisCard.GetStatusList) ){
			return $DOM_thisCard.find(thisCard.selectorOrderText__Examples + "." + requiredStatus).html();
		} else return false;
	};
	
	// INIT CARD
	var thisCard = this;
	
	var $DOM_thisCard = $("#" + thisCard.id);
	
	if($DOM_thisCard.hasClass("disabled")){
		thisCard.status = "disabled";
	}else if($DOM_thisCard.hasClass("selected")){
		thisCard.status = "selected";
	}else{
		thisCard.status = "default";
		thisCard.__bindClickOnOrderLink();
	}
	thisCard.setStatus(thisCard.status);
	
	$DOM_thisCard.find(thisCard.selectorCard).bind("click",function(e){
		thisCard.__userClickedEvent();
	}).bind("mouseleave",function(e){
		
		if(thisCard.status == "selected"){
			if(!$DOM_thisCard.hasClass(thisCard.hoverClass)) $DOM_thisCard.addClass(thisCard.hoverClass);
		}
	}).bind("mouseenter",function(e){
		
		if(thisCard.status == "selected"){
			if(!$DOM_thisCard.hasClass(thisCard.hoverClass)) $DOM_thisCard.addClass(thisCard.hoverClass);
		}
	});
	
	
};

$(function() {
	// ScrollReveal
	window.sr = ScrollReveal({ reset: false, scale: 1 });
	
	
	// CARDS
	CardsArray = {};
	for(var i = 0; i < 3; i++){
		var $card = $("#cat-food-block__" + (i+1));
		if($card.length){
			CardsArray["cat-food-block__" + (i+1)] = new Card("cat-food-block__" + (i+1));
		}
		
	}
	
});



// START PAGE

$.afterlag(function() {
	
	// PRELOADER
	var pagePreloader = document.getElementById('page-preloader');
	$('body').css('overflow','initial');
	$(pagePreloader).animate(
		{
			opacity: 0,
		},
		preloaderAnimationDuration,
		function(){
			$(this).css('display','none');
			
			
		}
	);
	
	//======== ScrollReveal -- start ========
	// CatFood's cards
	for(var i = 0; i < 3; i++){
		
		sr.reveal('.js-cat-food-block[id="cat-food-block__' + (i+1) + '"] .js-cat-food-block-card', { duration: 1000, distance: "100px", delay: preloaderAnimationDuration + (i+1)*200 });
	}
	
	
	
	
});
