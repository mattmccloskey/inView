# inView
Javascript event to tell you when an element has been scrolled into the viewport, and how much of it is visible

### Example
```
$(".box")
  .on("inViewBegin", function(){
	  $(this).addClass("inView");
  })
  .on("inViewEnd", function(){
  	$(this).removeClass("inView");
  });
```
