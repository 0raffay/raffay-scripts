
// WITHOUT COMMAS:
$(window).on("scroll", function () {
    var section = $(".aboutText");
    var windowHeight = $(window).height();
    var windowScrollTop = $(window).scrollTop();
    var sectionOffset = section.offset().top;

    if (windowScrollTop + windowHeight > sectionOffset) {
        //main Animation Code:
        $(".count").each(function () {
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

//WITH COMMMAS:
$(window).on("scroll", function () {
   var section = $(".cta-states");
    var windowHeight = $(window).height();
    var windowScrollTop = $(window).scrollTop();
    var sectionOffset = section.offset().top;
    if (windowScrollTop + windowHeight > sectionOffset) {
        // Main Animation Code:
        $(".count").each(function () {
            var $this = $(this);
            var countValue = $this.text().replace(/,/g, ''); // Remove commas
            $({ Counter: 0 }).animate(
                {
                    Counter: countValue,
                },
                {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                        $this.text(Math.ceil(this.Counter).toLocaleString()); // Add commas back
                    },
                    complete: function () {
                        $this.text(this.Counter.toLocaleString()); // Ensure the final value has commas
                    },
                }
            );
        });
        $(window).off("scroll");
    }
});
