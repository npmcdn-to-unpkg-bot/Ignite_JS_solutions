window.onload = function(){


{//PORTFOLIO
var filter = document.querySelectorAll('.filter li a');
//console.log(filter.length);

for(var i = 0; i < filter.length; i++){

	//console.log(filter[i]);
  	filter[i].addEventListener('click', function(e) {
    div.remove();
    e.preventDefault();


	var category = e.target.innerHTML.toLowerCase();
	//console.log(category);
	var portf_images = document.querySelectorAll('#portf_images img');
	//console.log(portf_images);

	for(var j = 0; j < portf_images.length; j++){
		portf_images[j].src = 'images/portfolio/' + category + '/' + (j+1) +'.png';
	}

	});
}

var imgs = document.querySelectorAll('#portf_images img');

var div = document.createElement('div'); 
div.className = "mask";  
var span = document.createElement('span');

(function maskApear(imgs){
	for(var i = 0; i < imgs.length; i++){

  	imgs[i].addEventListener('mouseover', function(e) {
			
			var arr = e.target.currentSrc.split('/');

			span.innerHTML = arr[arr.length-2].toUpperCase().replace('%20', ' '); 
			div.appendChild(span);
			e.target.insertAdjacentElement('beforeBegin', div);
			//e.target.insertAdjacentHTML('beforeBegin', '<div id="mask"><span>ALL</span></div>');
	}); 
}
})(imgs);

}

{//FORM VALIDATION
		var inputs = document.getElementsByTagName('input');
		var spans = document.querySelectorAll('#form_inputs span');
	    var name = inputs[0], mail = inputs[1] , subject = inputs[2];
	   
	    name.addEventListener('keyup', function(){
	    	//console.log(name.value);
	    	if(name.value.search(/[^a-zA-Z]/)>=0){
	    		spans[0].style.color = 'red';
	    		name.title="Name field should contain only letters !";
	    	}
	    	else{
	    		spans[0].style.color = '#131A1C';
	    		name.title="";
	    	}
	    });

	    mail.addEventListener('keyup', function(){
	    	
	    	if(mail.value.search(/[^a-zA-Z0-9_@]/)>=0){
	    		spans[1].style.color = 'red';
	    		mail.title="Mail field should contain letters, numbers, @ and _ !";
	    	}
	    	else{
	    		spans[1].style.color = '#131A1C';
	    		mail.title="";
	    	}
	    });

	    subject.addEventListener('keyup', function(){
	    	
	    	if(subject.value.search(/[^a-zA-Z0-9]/)>=0){
	    		spans[2].style.color = 'red';
	    		subject.title="Subject field should contain letters and numbers only!";
	    	}
	    	else{
	    		spans[2].style.color = '#131A1C';
	    		subject.title="";
	    	}
	    });
}

{//CIRCLE DIAGRAMS

function drawDiagrams(canvas, skill){
	//canvas initialization
	var ctx = canvas.getContext("2d");
	//dimensions
	var W = canvas.width;
	var H = canvas.height;
	//Variables
	var degrees = 0;
	var new_degrees = 0;
	var difference = 0;
	var color = "#FFE500";
	var bgcolor = "#FFF";
	var text;
	var animation_loop;
	
	function init()
	{
		//Clear the canvas everytime a chart is drawn
		ctx.clearRect(0, 0, W, H);
		
		//Background 360 degree arc
		ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 3;
		ctx.arc(W/2, H/2, 50, 0, Math.PI*2, false); //you can see the arc now
		ctx.stroke();
		
		//gauge will be a simple arc
		//Angle in radians = angle in degrees * PI / 180
		var radians = degrees * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 3;
		//The arc starts from the rightmost end. If we deduct 90 degrees from the angles
		//the arc will start from the topmost end
		ctx.arc(W/2, H/2, 50, 0 - 270*Math.PI/180, radians - 270*Math.PI/180, false); 
		//you can see the arc now
		ctx.stroke();
		
		//Lets add the text
		ctx.fillStyle = color;
		ctx.font = "25px Oswald-light";
		text = Math.floor(degrees/360*100) + "%";
		//Lets center the text
		//deducting half of text width from position x
		text_width = ctx.measureText(text).width;
		//adding manual value to position y since the height of the text cannot
		//be measured easily. There are hacks but we will keep it manual for now.
		ctx.fillText(text, W/2 - text_width/2, H/2 + 5);
	}
	
	function draw()
	{
		//Cancel any movement animation if a new chart is requested
		if(typeof animation_loop !== undefined) clearInterval(animation_loop);
		
		//random degree from 0 to 360 -- Math.random()
		new_degrees = Math.round(skill/100*360) + 1;
		difference = new_degrees - degrees;
		//This will animate the gauge to new positions
		//The animation will take 1 second
		//time for each frame is 1sec / difference in degrees
		animation_loop = setInterval(animate_to, 2000/difference);
	}
	
	//function to make the chart move to new degrees
	function animate_to()
	{
		//clear animation loop if degrees reaches to new_degrees
		if(degrees == new_degrees) 
			clearInterval(animation_loop);
		
		if(degrees < new_degrees)
			degrees++;
		else
			degrees--;
			
		init();
	}
	
	draw();
	
}
}

var canvas = document.getElementsByClassName("canvas");

drawDiagrams(canvas[0], deadshot.web);
drawDiagrams(canvas[1], deadshot.design);
drawDiagrams(canvas[2], deadshot.programming);
drawDiagrams(canvas[3], deadshot.photography);

{//TEAM BLOCK
	var team = document.querySelector('.teammates');
	var nick = document.querySelector('#bio h4');
	var biography = document.querySelector('#bio h5');

	team.addEventListener('click', function(e){
		if(e.target.tagName == 'IMG'){
			console.log(e.target.id);
			var curr_obj = eval(e.target.id);
			nick.innerHTML = curr_obj.nickname;
			biography.innerHTML = curr_obj.bio;

			drawDiagrams(canvas[0], curr_obj.web);
			drawDiagrams(canvas[1], curr_obj.design);
			drawDiagrams(canvas[2], curr_obj.programming);
			drawDiagrams(canvas[3], curr_obj.photography);
		}

	});

}

}

{//STATISTIC BLOCK

	var clients_count = 1600, projects_count = 3200, awards_count = 40, coffee_count = 20000;
	var stat_values = document.querySelectorAll('.statistics h1');
	var targ_elem = stat_values[0];
	var startY = targ_elem.getBoundingClientRect().bottom + window.pageYOffset;


	function tick(from, to, duration) {
	    if (from > to) {
	        return;
	    } else{
	        var step;
	        var delta;
	        
	        if(to < 100) delta = 2;
	        else if(to < 10000) delta = 10;
	        else if(to > 10000) delta = 50;

	        step = duration / (to - from);
	        this.innerHTML = from;

	        setTimeout(tick.bind(this, from + delta, to, duration - step), step);
	    }
	}

//CLIENTS SLIDER VARIABLES
var target_elem = document.querySelector('.cli_logos');
var startYy = target_elem.getBoundingClientRect().bottom + window.pageYOffset;
var scrolled = false;


	window.onscroll = function () {
	
		//STATISTICS SCROLL
	   if (window.pageYOffset < startY) {
        tick.bind(stat_values[0])(0, clients_count, 3000);
        tick.bind(stat_values[1])(0, projects_count, 3000);
        tick.bind(stat_values[2])(0, awards_count, 3000);
        tick.bind(stat_values[3])(0, coffee_count, 3000);
      	} 

      	//CLIENTS SLIDER SCROLL
      	if (window.pageYOffset < startYy && !scrolled) {
	        var clients = ['cli1.png', 'cli2.png', 'cli3.png', 'cli4.png', 'cli5.png']
			var cli_logos = document.querySelectorAll('.cli_logos img');

			var clientsTimer = setInterval(function(){

				var poped = clients.pop();
				clients.unshift(poped);

				cli_logos[0].src = "images/"+ clients[0];
				cli_logos[1].src = "images/"+ clients[1];
				cli_logos[2].src = "images/"+ clients[2];
				cli_logos[3].src = "images/"+ clients[3];
				cli_logos[4].src = "images/"+ clients[4];

				scrolled = true;

			}, 3000);
    	}else{clearInterval(clientsTimer);}

	}


}

{//SLIDER

var headerSlider = function (){
return function(){
	var left_but = document.getElementById('left_but');
	var right_but = document.getElementById('right_but');
	var img = document.getElementById("photo");
	var slogan = document.getElementById("slogan");

	var slogans = ['BRANDING HAVE ANOTHER DEFINITION 1', 'BRANDING HAVE ANOTHER DEFINITION 2', 'BRANDING HAVE ANOTHER DEFINITION 3'];
	var photos = ['1.JPG', '2.JPG', '3.JPG'];
	var index = 0;

	function prevSlide(){
		(index <= 0) ? index = photos.length-1 : index--;	
		img.src = "images/"+photos[index];
		slogan.innerHTML = slogans[index];
	}

	function nextSlide(){
		(index >= photos.length-1) ? index = 0 : index++;
		img.src = "images/"+photos[index];
		slogan.innerHTML = slogans[index];
	}

	var timer = setInterval(nextSlide, 3000);

	var clearTimers = function(){
	        var lastID = 0;

	        return function(){
	            var currID = setInterval(function(){}, 1);
	            for(var id = currID; id > lastID; id--){
	                clearInterval(id);
	            };
	            lastID = currID;
	        };
	}();

	left_but.onclick = function(){
		clearTimers();
		prevSlide();
		setTimeout(function(){setInterval(nextSlide, 3000);}, 5000);
	};

	right_but.onclick = function(){
		clearTimers();
		nextSlide();
		setTimeout(function(){setInterval(nextSlide, 3000);}, 5000);
	};
};

}();

headerSlider();

}

{//SERVICES LOGOS SIZING
var serv_logos1 = document.getElementsByClassName('logos')[0];

function logoSizing(serv_logos){
	var marg_bott = 0;

	serv_logos.addEventListener('mouseover', function(e) {
		if(e.target.tagName == 'IMG'){
			marg_bott = getComputedStyle(e.target).marginBottom;
			e.target.style.marginBottom = '0';
			e.target.style.width = Math.round(e.target.offsetWidth * 1.1) + 'px';
		}
	}); 

	serv_logos.addEventListener('mouseout', function(e) {
		if(e.target.tagName == 'IMG'){
			e.target.style.marginBottom = marg_bott;
			e.target.style.width = (Math.round(e.target.offsetWidth * 0.9)+1) + 'px';
		}  
	}); 
}

logoSizing(serv_logos1);

}

{//ABOUT US LOGOS SIZING
var about_logos1 = document.getElementsByClassName('logos')[1];
var about_logos2 = document.getElementsByClassName('logos')[2];

logoSizing(about_logos1);
logoSizing(about_logos2);
}

{//SCROLL

var linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.5;  // speed
for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener('click', function(e) {
    e.preventDefault();
    var w = window.pageYOffset,  // scroll
        hash = this.href.replace(/[^#]*(.*)/, '$1');  // target element's id 
        t = document.querySelector(hash).getBoundingClientRect().top,  // padding of the browser window to id
        start = null;
    requestAnimationFrame(step);
    function step(time) {
      if (start === null) start = time;
      var progress = time - start,
          r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
      window.scrollTo(0,r);
      if (r != w + t) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash  // URL with hash
      }
    }
  }, false);
}

}

{//COMMENTS SLIDER
	var citations = ['Always be a first rate version of yourself and not a second rate version of someone else.', 
	'You were put on this earth to achieve your greatest self, to live out your purpose, and to do it courageously.',
	'Great spirits have always encountered violent opposition from mediocre minds.',
	'Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them.'];

	var autors = ['Judy Garland', 'Steve Maraboli', 'Albert Einstein', 'William Shakespeare'];

	var autor = document.querySelector('#citations h5');
	var citation = document.querySelector('#citations span');

	var coment_ul = document.getElementById('coment_ul');

	coment_ul.addEventListener('click', function(e){
		if(e.target.tagName == 'LI'){
			autor.innerHTML = autors[e.target.id];
			citation.innerHTML = '"' + citations[e.target.id] + '"';
		}

	});
}
{//MY SCROLL

/*var anchors = document.querySelectorAll('[href^="#"]');

//alert(anchors[0]);
(function myScroll(){
	for( let anch of anchors){
		//console.log(anch.getAttribute('href'));
		//var href = anch.getAttribute('href').split('#')[1];
		//var stamp = document.getElementsByName(href)[0];

		//console.log(href);
		//console.log(stamp);

		

		anch.addEventListener('click', function(e) {
	    	e.preventDefault();

	    	var targ_pos = e.pageY;
	    	console.log(targ_pos);
	    	//console.log(move_to);
	    	var href = e.target.hash.split('#')[1];
	    	//alert(href);
	    	//alert(href.length);
	    	var stamp = document.getElementsByName(href)[0];
	    	//console.log(stamp);
	    	//alert(stamp);

	    	function cumulativeOffset(element) {
		    var top = 0;
			    do {
			        top += element.offsetTop  || 0;
			        element = element.offsetParent;
			    } while(element);

			    return {
			        top: top
			    };
			};


			var move_to = cumulativeOffset(stamp).top - 40;
	    	//var move_to = stamp.getBoundingClientRect().top;
	    	//alert(move_to);
	    	console.log(move_to);
	    	//console.log(stamp);
	    	
	    	//window.scrollTo(0, move_to);

	    	//var y = 1; //SPEED DEFINED IN PIXELS
	    	var y = Math.abs(targ_pos - move_to)/1000;

	    	function moveToTarget(){
	    		if(targ_pos == move_to){
	    			console.log(targ_pos);
	    			console.log(move_to);
	    			clearInterval(scrollTimer);
	    			targ_pos == 0;
	    		}
	    		else if(targ_pos < move_to){
	    			window.scrollBy(0, y);
	    			targ_pos++;
	    		}
	    		else if(targ_pos > move_to){
	    			window.scrollBy(0, -y);
	    			targ_pos--;
	    		} 
	    		//console.log(targ_pos);
	    		//console.log(move_to);
	    	}

	    	var scrollTimer = setInterval(moveToTarget, 1);
	    	

		});
	}
})();
*/
}

{//CLIENTS SLIDER

	/*var clientsSlider = function(){
		return function(){
		var clients = ['cli1.png', 'cli2.png', 'cli3.png', 'cli4.png', 'cli5.png']
		var cli_logos = document.querySelectorAll('.cli_logos img');

		var clientsTimer = setInterval(function(){

			var poped = clients.pop();
			clients.unshift(poped);

			cli_logos[0].src = "images/"+ clients[0];
			cli_logos[1].src = "images/"+ clients[1];
			cli_logos[2].src = "images/"+ clients[2];
			cli_logos[3].src = "images/"+ clients[3];
			cli_logos[4].src = "images/"+ clients[4];

		}, 3000);
		};
	}();

	clientsSlider();*/

}