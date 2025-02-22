
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

$(window).on("scroll", function() {
    var section = $(".counterSection");
    var windowHeight = $(window).height();
    var windowScrollTop = $(window).scrollTop();
    var sectionOffset = section.offset().top;
    if (windowScrollTop + (windowHeight / 2) > sectionOffset) {
      $(".count").each(function() {
        var $this = $(this);
        // Check if the counter has already been animated
        if (!$this.data("animated")) {
          var countValue = $this.text().replace(/,/g, '');
          $this.text("0");
          $this.data("animated", true); // Mark as animated to avoid resetting
          $({
            Counter: 0
          }).animate(
            {
              Counter: countValue,
            },
            {
              duration: 2000,
              easing: "swing",
              step: function() {
                $this.text(Math.ceil(this.Counter).toLocaleString());
              },
              complete: function() {
                $this.text(this.Counter.toLocaleString());
              },
            }
          );
        }
      });
    }
  });
