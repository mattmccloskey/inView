$.fn.inView = function()
{
	var scroll = InView.scroll,
		lats = $(this).data('inview:lats') || [1, .5, 0],
		offset = $(this).offset(),
		height = $(this).outerHeight(),
		pos = $.extend(offset, { height: height, bottom: offset.top + height }),
		args = [];

	// Is it on the page?
	if(pos.top < scroll.y + scroll.height && pos.bottom > scroll.y)
	{
		$(this).data('isinview', true);
		// What percentage of the element height is laying on the window latitudes
		var lat_percs = [];
		for(var i = 0, l = lats.length; i < l; i++)
		{
			args.push((scroll.y + (scroll.height * lats[i]) - pos.top) / pos.height);
		}
		
		// how much is on the page?
		// var showing = Math.min(scroll.y + scroll.height - pos.top, scroll.height);
		// showing -= Math.max(scroll.y + scroll.height - pos.bottom, 0);
		// args.push(showing);

		args.push(scroll);
		args.push(pos);
		
		// for(var i = 0, l = lats.length; i < l; i++)
		// {
		// 	args.push((scroll.y + (scroll.height * lats[i]) - pos.top) / (scroll.height * (1-lats[i])));
		// }
		
		return args;
	}
	else
	{
		$(this).data('isinview', false);
		return false;
	}
};


var InView = {};
InView.active = false;
InView.elements = [];
InView.scroll = { y: 0, height: 0 };
InView.register = function(el)
{
	if( ! InView.active) InView.start();
	InView.elements.push(el);
};

InView.start = function()
{
	InView.scroll = { y: $(window).scrollTop(), height: $(window).height() };
	$(window).scroll(InView.onScroll);
	//$(window).addEventListener('touchmove', InView.onScroll);
	InView.active = true;
};

InView.onScroll = function()
{
	InView.scroll = { y: $(window).scrollTop(), height: $(window).height() };
	for(var i = 0, l = InView.elements.length; i < l; i++)
	{
		InView.checkElement(InView.elements[i]);
	};
};

InView.checkElement = function(el)
{
	var wasInView = el.data('isinview'),
		args = el.inView(),
		isInView = el.data('isinview');
	if(args !== false)
	{
		el.trigger('inView', args);
	}

	if(wasInView === false && isInView === true)
	{
		el.trigger('inViewBegin', args);
	}
	else if(wasInView === true && isInView === false)
	{
		el.trigger('inViewEnd', args);
	}
};


$.event.special.inView = {
	enabled: true,
	setup: function()
	{
		InView.register($(this));
		$(this).data('isinview', false);
		InView.checkElement($(this));
	},
	teardown: function()
	{

	}
};
$.event.special.inViewBegin = {
	enabled: true,
	setup: function()
	{
		InView.register($(this));
		$(this).data('isinview', false);
		InView.checkElement($(this));
	},
	teardown: function()
	{

	}
};
$.event.special.inViewEnd = {
	enabled: true,
	setup: function()
	{
		InView.register($(this));
		$(this).data('isinview', false);
		InView.checkElement($(this));
	},
	teardown: function()
	{

	}
};