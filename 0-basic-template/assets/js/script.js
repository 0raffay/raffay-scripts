$(document).ready(function () {
  validateNumberinputs();
});


function header() {
  let stickyElement = "header";
  let stickyClass = "header-fixed";

  let stickyOffset = $(stickyElement).offset().top;
  $(document).scroll(function () {
    var sticky = $(stickyElement),
      scroll = $(window).scrollTop();
    if (scroll >= stickyOffset) sticky.addClass(stickyClass);
    else sticky.removeClass(stickyClass);
  });
}

function validateNumberinputs() {
  $("input[type='tel'], input[type='number']").on("keyup", function () {
    var regex = /^[1-9][0-9]*$/;

    if (!regex.test($(this).val())) {
      $(this).val($(this).val().replace(/[^1-9]/g, ''));
    }
  });
}
