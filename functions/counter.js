function counter(sectionClass, counterClass) {
	$(window).on("scroll", function () {
		var section = $(sectionClass);
		if (section.length == 0) {
			return;
		}
		var windowHeight = $(window).height();
		var windowScrollTop = $(window).scrollTop();
		var sectionOffset = section.offset().top;


		if (windowScrollTop + windowHeight > sectionOffset) {
			//main Animation Code:
			$(counterClass).each(function () {
				$(this)
					.prop("Counter", 0)
					.animate(
						{
							Counter: $(this).text(),
						},
						{
							duration: 2000,
							easing: "swing",
							step: function (now) {
								$(this).text(Math.ceil(now));
							},
						}
					);
			});
			$(window).off("scroll");
		}
	});
}

//Counter:
counter(".counterSection", ".counterSection .count");
