$(function(){

/*------------------------------------------------------------------------------
   Design Style 73 -> Source JavaScript
   Handcrafted by Church Plant Media
------------------------------------------------------------------------------*/

// open external links in new window
    $('a[href^="http"]').attr('target', '_blank');
    $('a.external').attr('target', '_blank');

// launch audio player
	$('a[href$=".mp3"],a[href$=".m4a"],a[href$=".wav"],a[href^="/mediaPlayer/#sermonaudio"],a[href^="/mediaPlayer/#episodeaudio"]').live('click', openAudioPlayer);
	function openAudioPlayer(){

	    // Download link
	    if(this.href.match(/download\.php/)) return true;

	    //if($.inArray(site, allowed) != -1){
	    var url, dims = 'width=638,height=550';
	    if(this.href.match(/mediaPlayer/i)){
	        if(this.href.match(/\?url/)){ // Standalone audio player
	            dims = 'width=638,height=350';
	            url = '/mediaPlayer/#audio/'+encodeURIComponent(this.href.split('?url=')[1]);
	        } else {
	            url = this.href;
	        }
	    } else {
	        dims = 'width=638,height=350';
	        if(this.href.match(/assets\.com\/audio/)){ // Standalone audio player
	            url = '/mediaPlayer/#audio/'+encodeURIComponent(this.href.split('?audio=')[1]);
	        } else {
	            url = '/mediaPlayer/#audio/'+encodeURIComponent(this.href);
	        }

	    }
	    window.open(url, 'audioPlayer', dims);
	    return false;
	}

// launch video player
$('a.watch, .sl_video a, .sl_watch a, #watch a, a.video, a[href$=".m4v"],a[href$=".mp4"],a[href$=".mov"]').live('click', playVideo);
   	function iPadVideo( url ){
    var id = url.split('/').pop(),
        ajaxURL = url.match(/sermon/) ? '/api/sermons/'+id : '/api/files/'+id;

    $.getJSON(ajaxURL, function( obj ){
        var file = url.match(/sermon/) ? obj.video : obj;
        if(file.type != 'Video') return;
        if(file.url == 'embed'){

            // Vimeo or Youtube video?
            var services = file.content.match(/src="(http:)?(\/\/)?(player\.|www\.)?(youtube|vimeo)\.com\/(video|embed)\/([a-zA-Z0-9_-]+)/);
            if(services){
                var vimeo = services[4] == 'vimeo' ? true : false
                var $vidurl = [
                    'http://',
                    (vimeo ? 'player.' : ''),
                    services[4],
                    '.com/',
                    vimeo ? 'video/' : 'embed/',
                    services[6]
                ].join('');

                var theUrl = $vidurl;
            } else {
                var theUrl = url;
            }
        } else {
            var theUrl = file.url;
        }
        window.location = theUrl;
    })
}

function playVideo(){
    var place, dims="width=638,height=550";

    var matches = this.href.match(/mediaplayer\/#(sermon|episode)?video/i);
    if(matches){
        place = this.href;
    } else if( this.href.match(/assets\.com\/video/)){
        var parts = this.href.split('?');
        if(parts.length > 1){
            var matches = parts[1].match(/video=([0-9]+)/);
            if(matches.length > 1){
                var id = parseInt(matches[1]);
                dims = 'width=638,height=455';
                place  = '/mediaPlayer/#video/'+id;
            }
        }
    } else {
        place = '/mediaPlayer/#video/'+encodeURIComponent(this.href);
    }

    if(window.navigator.userAgent.indexOf('iPad') != -1){
        iPadVideo( place );
        return false;
    }

    window.open(place, 'videoPlayer', dims);
    return false;
}

// center dropdown menus to parent's width
    $('#nav > li').each(function(){
        width = 0 - Math.round((226 - $(this).width())/2);
        // pseudo-children require slightly different algorithm
        if ($(this).is(':first-child') /*|| $(this).is(':last-child')*/) {
            width = 0 - Math.round((226 - ($(this).width() + 40))/2);
        }
        $(this).find('> ul').css('margin-left', width + 'px');
    });

// add extra span element to sorting selects
    $('.sorting select').each(function(){
        var item = $(this);
        item.wrap('<span id="select'+this.name+'">'+this.options[0].text+'</span>');
    });

// resize content if sidebar > page && !sermons
    if (!$('#content').hasClass('sermon-index')) {
        var right = $('.right-c').height();
        var left = $('#content').height();
        if(right > left){
            $('#content').css('min-height', right);
        }
    }

    $('#page .link-filter').css('overflow', 'hidden');

// adjust sermon minheight
    if (!$('#content').hasClass('sermon-index')) {
        var right = $('.right-c').height();
        $('.page-content').css('min-height', right);
    }

// adjust page height if sidbar is taller then content
    // pageMinHeightChanger();
    // function pageMinHeightChanger() {
    //     var minHeight = $('#side_nav').height() + 25;
    //     $('.link-filter').css('min-height', minHeight);
    // }

// check for galleries and load additional scripts
    galleryCheck();
    function galleryCheck(){
        var gals = $('.cpmGallery');
        if(gals.length){
            $.getScript('//cpmlightsail2.com/modules/legacy/gallery/jquery.easing.min.js', function(){
                $.getScript('//cpmlightsail2.com/modules/legacy/gallery/gallery.min.js', function(){
                    $('head').append('<link rel="stylesheet" href="//cpmlightsail2.com/modules/legacy/gallery/cpmGallery.css" />');
                    gals.cpmGallery();
                });
            });
        }
    }

// check for chms and load additional scripts and stylesheets
    $('head').append('<link rel="stylesheet" type="text/css" href="//cpmlightsail2.com/modules/legacy/cpm.min.css" />');
    chmsCheck();
    function chmsCheck(){
        var cities = $('div[data-service="city"]');
        if(cities.length){
            cities.each(function(){
                var city = $(this);
                var opts = {
                    type : city.attr('data-type'),
                    items: city.attr('data-items'),
                    title: city.attr('data-title'),
                    group: city.attr('data-group'),
                    type : city.attr('data-type')
                };
                city.html('<p>Loading...</p>')
                $.get('/ajax/city', opts, function(r){
                    city.html(r);
                    city.addClass('loaded');
                });
            });
        }
        var cal = $('div.calendar[data-type="calendar"]');
        if(cal.length){
        	$('a.category-btn,div.category-box').remove();
            var calOpts = {
                service : cal.attr('data-calservice'),
                year    : cal.attr('data-year'),
                month   : cal.attr('data-month'),
                dateWrap: cal.attr('data-datewrap'),
                prevNext: cal.attr('data-prevnext')
            };
            $.get('/ajax/calendar', calOpts, function(r){
                cal.html(r);
            });
        }
        $('*[data-type="eventlist"]').each(function(){
            var t = $(this)
                ,listOpts = {
                    service : t.attr('data-listservice'),
                    start   : t.attr('data-startdate'),
                    end     : t.attr('data-enddate'),
                    groupby : t.attr('data-groupby'),
                    limit   : t.attr('data-limit')
                };
            if(window.CPM){
                if(CPM.eventTemplate){
                    if(typeof CPM.eventTemplate == 'object'){
                        CPM.eventTemplate = JSON.stringify(CPM.eventTemplate);
                    }
                    listOpts.template = CPM.eventTemplate;
                }
            }
			$.ajax({
				url : '/ajax/eventlist',
				type : 'get',
				data : listOpts,
				error:function(req, status,err){
					t.removeAttr('style');
					t.html('<p>No events scheduled</p>');
				},
				success : function(r){
					t.removeAttr('style').html(r);
				}
			});
        });
    }

// resize page is sidebar is taller
pageSizer();
function pageSizer(){
    var sideBarHeight = $('.right-c').height();
    var pageHeight = $('.left-c').height();
    if(sideBarHeight > pageHeight) {
        $('.left-c').css('min-height', sideBarHeight);
    }
}

// html5 video player
(function html5VideoCheck(){
    var vids = $('video.video-js');
    if(vids.length){
        $.getScript('https://vjs.zencdn.net/4.2.2/video.js', function(){
            $('head')
            	.append('<style type="text/css"> .videoinner * { padding:0 !important; }</style>')
				.append('<link rel="stylesheet" type="text/css" href="//s3.amazonaws.com/churchplantmedia-cms/mediaplayer/inpagevideo.css" />');

            vids.each(function(){
	            var $video		= $(this);
				var $parent		= $video.parent().parent();
	            var dataWidth	= parseInt( $video.parent().attr('data-width') );
                var parentWidth = $parent.width();
                var videoWidth;
				var videoHeight;

				if(dataWidth && dataWidth != 100){
					parentWidth	= parentWidth*(dataWidth/100);
					videoHeight = parentWidth*(9/16);
				} else {
					videoHeight = parentWidth*(9/16);
				}

                this.width  = parentWidth;
                this.height = videoHeight;

                var options = {
                    techOrder : ['html5','flash']
                };

                _V_(this, options,
                    function(){
                        var controls = $('.vjs-control-bar').addClass('vjs-fade-in');

                        this.on('mouseenter', function(){
                            controls.removeClass('vjs-fade-out').addClass('vjs-fade-in');
                        });
                        this.on('mouseleave', function(){
                            controls.removeClass('vjs-fade-in').addClass('vjs-fade-out');
                        });
                    }
                );
            })
        });
    }
})();

/*------------------------------------------------------------------------------
    Blog Scripts
------------------------------------------------------------------------------*/

// activate blog sorting filter dropdowns
    $('.blog-sort select').on('change', function(){
        if(this.selectedIndex != 0){
            window.location = this.value;
        }
    });

// prevent recursive blog category url madness
    if(window.location.href.indexOf("category") >= 0 || window.location.href.indexOf("keyword") >= 0){
        $('.blog-categories').hide();
    }

// prettify comment status messages
    if ( $('#comment-status p').length > 0 ) {
        message = $('#comment-status p');
        $('.comment-leave').html(message);
    }
    if ( $('#error ul li').length > 0 ) {
        message = $('#error');
        $('.comment-leave').html(message);
    }

// remove final border-span if pagination isn't present

    if ($('#pagination').length == 0){
        $('.blog-wrap .border-span').last().css('display', 'none');
    }

/*------------------------------------------------------------------------------
    Calendar Scripts
------------------------------------------------------------------------------*/

// switch the calendar tab views
    $('#cal-switch a').on('click', switchCalTabs);
    function switchCalTabs(){
        $('#list-view')[ this.rel == 'events-calendar' ? 'hide' : 'fadeIn']();
        $('#events-calendar')[ this.rel == 'events-calendar' ? 'fadeIn' : 'hide']();
        $('.category-btn')[ this.rel == 'events-calendar' ? 'show' : 'hide']();
        $('.category-box input').prop('checked', true);
        $('.category-box').hide();
        $('#cal-switch li').removeClass('current');
        $(this).parent().addClass('current');
        return false;
    }

// switch the calendar months
    $('#events-calendar caption a').live('click', switchCalendar);
    function switchCalendar(){
        var parts = $(this).attr('href').split('/');
        var month = parts.pop();
        var year  = parts.pop();
        $.get('/ajax/events/', { month:month, year:year }, function(data){
            var cal = $('#events-calendar'),
                cat = $('#event-cat').val();
            cal.html(data);
            if(cat && cat !== '0') cal.find('li').not('.category_'+cat).hide();
        });
        hideToday();
        return false;
    }

// hide "today" text in the calendar
    hideToday();
    function hideToday() {
        if ($('td.today span').text().indexOf('Today') >= 0) {
            $('td.today span:first-child').hide();
        }
    }

// toggle the category box in the calendar
    $('.category-btn').live('click', function(){
        $('.category-box').fadeToggle(150);
    });

// activate the calendar-view category checkboxes (in pop-out)
    $('#filter_list input').bind('click', filterCalEvents);
    function filterCalEvents() {
        var self = this;
        var listItems = $('#events-calendar li.category_'+this.value)[this.checked ? 'fadeIn' : 'fadeOut'](150);
        if(listItems){
            listItems.each(function(){
                var me = $(this),
                    dad = me.parent();
                if(self.checked){
                    dad.show();
                }
                else {
                    var blind = dad.find('.event_details:visible');
                }
            });
        }
    }

// activate the list-view category checkboxes (in sidebar)
    $('.listcategories input').bind('click', filterListEvents);
    function filterListEvents() {
        var self = this;
        var listItems = $('#list-view div.category_'+this.value)[this.checked ? 'fadeIn' : 'fadeOut'](150);
        if(listItems){
            listItems.each(function(){
                var me = $(this),
                    dad = me.parent();
                if(self.checked){
                    dad.show();
                }
                else {
                    var blind = dad.find('.event_details:visible');
                }
            });
        }
    }

// change margin if cat
    if($('.calendar td li span').length > 0){
        $('.calendar td li').css('margin-left', '10px');
    }


/*------------------------------------------------------------------------------
     Fin.
------------------------------------------------------------------------------*/

});
