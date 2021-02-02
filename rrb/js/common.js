document.addEventListener("DOMContentLoaded", function() {
	
	var cursor = document.querySelector(".cursor");
	var isHover = document.querySelectorAll("a, .img-wrap > img, .video__poster, .panel__btn, .menu__toggle, .sidenav ul li, .checkbox, .form__btn"
	);
	var cursorHover = isHover.length;

	
/***************************************************************
 
	Курсор движение
	
	*************************************************************/

	document.onmousemove = function(event){
		cursor.style.display = 'block';
		cursor.style.left = event.clientX + 'px';
		cursor.style.top = event.clientY + 'px';
	}
	document.onmouseout = function(event){
		cursor.style.display = "none";
	}

	
/***************************************************************
 
	Мышь Hover
	
	*************************************************************/

	while(cursorHover--){
		isHover[cursorHover].onmouseover = function(){
			cursor.classList.add("isHover");
		}
		isHover[cursorHover].onmouseout = function(){
			cursor.classList.remove("isHover");
		}
	}
	
/***************************************************************
 
	Parallax
	
	*************************************************************/

	$(window).scroll(function(){

		var st = $(this).scrollTop();

		$('.content__card').css({
			"transform" : "translate(0%, -" + st /10 + "%",
		});

	});

/***************************************************************
 
	Gamburger
	
	*************************************************************/

$('.menu__toggle').on('click', function(){
	$( 'body' ).toggleClass( "sidenav-open" );
});

$(window).on('resize load', function(){
	let widthBody = $('body').width();
	if( widthBody > 1094 )
	$('body').removeClass('sidenav-open');
});

$('.sidenav').on('click', function(){
	$( 'body' ).removeClass( "sidenav-open" );
});



/***************************************************************
 
	Подчёркивание REALPAY
	
	*************************************************************/

setTimeout(function(){
	var k = document.querySelector(".content__title");
	k.classList.add("is-appeared");
}, 500);

/***************************************************************
 
	Адаптивный play, replay
	
	*************************************************************/

$(window).on('resize load', function(){
	var fff = $('.video__poster').width();

	if(fff < 921) {
		$('.btn-play, .btn-replay').css({
			"width": fff / 6.02
		});
	}
	
	else 
		$('.btn-play, .btn-replay').css({
			"width": 153
		});
});

/***************************************************************
 
	Video Player
	
	*************************************************************/

document.querySelector('#play').onclick = play;
document.querySelector('#video__poster').onclick = startVideo;
document.querySelector('#pause').onclick = pause;
document.querySelector('#muted').onclick = muted;
document.querySelector('#unmuted').onclick = unmuted;
document.querySelector('#close').onclick = close;

let video;
let display;
let progress;
let displayStatus;
let durationBar;

video = document.querySelector('#video-player');
progress = document.querySelector('#position-bar');
displayStatus = document.querySelector('#display-status');
durationBar = document.querySelector('#duration-bar');


// video.ontimeupdate = progressUpdate;
// durationBar.onclick = videoRewind;

function startVideo(){
	$('#video__content').css({
		'opacity' : '1',
		'visibility' : 'visible'
	});
	video.play();
	video.currentTime = 0;
}

function play(){
	video.play();
	$('.panel__item--play').css({
		'display' : 'none',
	});
	$('.panel__item--pause').css({
		'display' : 'block'
	});
}
function pause(){
	video.pause();
	$('.panel__item--play').css({
		'display' : 'block',
	});
	$('.panel__item--pause').css({
		'display' : 'none'
	});

}
function muted(){
	video.volume = 0;
	$('.panel__item--muted').css({
		'display' : 'none',
	});
	$('.panel__item--unmuted').css({
		'display' : 'block'
	});		
}

function unmuted(){
		video.volume = 1;
		$('.panel__item--muted').css({
			'display' : 'block',
		});
		$('.panel__item--unmuted').css({
			'display' : 'none'
		});	
}



// function progressUpdate(){
// 	let d = video.duration;
// 	let c = video.currentTime;
// 	let progress = (c*100)/d;
// 	$('#position-bar').css({
// 		"width": progress + '%'
// 	});
// 	c = Math.floor(c);
// 	let min = Math.floor(c/60);
// 	let sec = Math.floor(c - (min*60));
// 	let result;
// 	if(sec < 10 & min < 10) result = '0' + min + ':0' + sec;
// 	if(sec >= 10 & min < 10) result = '0' + min + ':' + sec;
// 	if(sec < 10 & min >= 10) result = min + ':0' + sec;
// 	if(sec < 10 & min < 10) result = '0' + min + ':0' + sec;
// 	displayStatus.innerHTML = result;
// }

// function videoRewind(){
// 	let w = this.offsetWidth;
// 	let o = event.offsetX;
// 	let p = (o*100)/w;
// 	$('#position-bar').css({
// 		"width": p + '%'
// 	});
// 	let d = video.duration;
// 	video.pause();
// 	video.currentTime = d * (o/w);
// 	video.play();
// }

function close(){
	$('#video__content').css({
		'opacity' : '0',
		'visibility' : 'hidden'
	});
	$('.btn-replay').css({
		'display' : 'block',
	});
	$('.btn-play').css({
		'display' : 'none',
	});
	video.pause();
}

video.addEventListener('ended', function () {
     
	$('#video__content').css({
		'opacity' : '0',
		'visibility' : 'hidden'
	});
	$('.btn-replay').css({
		'display' : 'block',
	});
	$('.btn-play').css({
		'display' : 'none',
	});
}, false);



/***************************************************************
 
	Checkbox
	
	*************************************************************/

let check = document.querySelector('#checkbox');
document.querySelector('#checkbox').onchange = toggleCheck;


function toggleCheck(){
	check.classList.toggle("checked");
}

/***************************************************************
 
	Focus on input (cursor auto)
	
	*************************************************************/

let isForm = document.querySelectorAll('.formInput');
let lengthIsForm = isForm.length;
let body = document.querySelector('body');


while(lengthIsForm--){
	isForm[lengthIsForm].onfocus = function(){
		body.classList.add('isForm');
	this.onmouseout = function(){
	body.classList.remove('isForm');
	}
	this.onmouseover = function(){
	body.classList.add('isForm');
	}
	}

	isForm[lengthIsForm].onblur = function(){
		body.classList.remove('isForm');
		this.onmouseover = null;

	}
}


/***************************************************************
 
	E-mail Ajax Send
	
	*************************************************************/


// $("form.form").submit(function() { //Change
// 	var th = $(this);
// 	$.ajax({
// 		type: "POST",
// 		url: "../mail.php", //Change
// 		data: th.serialize()
// 	}).done(function() {
// 		$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
// 		setTimeout(function() {
// 			$(th).find('.success').removeClass('active').fadeOut();
// 			th.trigger("reset");
// 		}, 3000);
// 	});
// 	return false;
// });

document.querySelector('.form__btn').onclick = successActive
let success = document.querySelector('.form .success');
function successActive(e){
	e.preventDefault();
	scrollToForm();
	$('.form .success').addClass('active').css('display', 'flex').hide().fadeIn();
	setTimeout(function() {
		$('.form .success').removeClass('active').fadeOut();
		$("form.form").trigger("reset");
	}, 3000);
};



/***************************************************************
 
	Плавный скролл
	
	*************************************************************/

let link = document.querySelectorAll('.link, .content__btn a'); 
let lengthLink = link.length; 
let scrolled; 
let timer;


$(window).on('resize load', function(){
	v = document.getElementById('s-video').offsetTop + 60;
	i = document.getElementById('s-info').offsetTop - 60;
	f = document.getElementById('s-form').offsetTop - 60;
	p = document.getElementById('s-partners').offsetTop - 60;
	console.log(v);

});

while(lengthLink--){
	link[lengthLink].onclick = function(e){
		console.log(v);
		e.preventDefault();
		scrolled = window.pageYOffset;
		let attr = this.getAttribute('href')
		if ( attr == '#1' ) scrollToVideo();
		if ( attr == '#2' ) scrollToInfo();
		if ( attr == '#3' ) scrollToForm();
		if ( attr == '#4' ) scrollToPartners();
	}
}

function scrollToVideo(){
	if( scrolled < v ){
		scrolled = scrolled + 15;
		window.scrollTo(0, scrolled);
		timer = setTimeout(scrollToVideo, 1);
	}
	else {
		clearTimeout(timer);
		window.scrollTo(0, v);
	}
}

function scrollToInfo(){
	if( scrolled < i ){
		scrolled = scrolled + 20;
		window.scrollTo(0, scrolled);
		timer = setTimeout(scrollToInfo, 1);
	}
	else {
		clearTimeout(timer);
		window.scrollTo(0, i);
	}

}

function scrollToForm(){
	if( scrolled < f ){
		scrolled = scrolled + 25;
		window.scrollTo(0, scrolled);
		timer = setTimeout(scrollToForm, 1);
	}
	else {
		clearTimeout(timer);
		window.scrollTo(0, f);
	}
}

function scrollToPartners(){
	if( scrolled < p ){
		scrolled = scrolled + 30;
		window.scrollTo(0, scrolled);
		timer = setTimeout(scrollToPartners, 1);
	}
	else {
		clearTimeout(timer);
		window.scrollTo(0, p);
	}
}








// console.log('1');
});