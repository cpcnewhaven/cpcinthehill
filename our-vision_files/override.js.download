var camplist =   [
	'<div class="chapters">',
    	'<h5 class="chapter-choose">Choose a Congregation:</h5>',
		'<a class="chapter-switcher" href="#">Goatville</a>',
		'<div class="chapter-inner">',
			'<a href="http://www.cpcgoatville.org/">Goatville</a>',
			'<a href="http://christpresnewhaven.org/cms">Whitney</a>',
			'<a class ="last" href="http://www.anabaino.org/">Mission Anabaino</a>',
    	'</div> <!-- .chapter-inner -->',
	'</div> <!-- .chapters -->'
].join('');


// add list to the header
// $('body').prepend(camplist);
var switcher = $('a.chapter-switcher');
switcher.append('<span class="black-tri"></span>');
switcher.click(function(){
	$('.chapter-inner').slideToggle(300);
})

