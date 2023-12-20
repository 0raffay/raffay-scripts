function addStickyClass(element, htmlClass, offsetAddition, sectionToFollow, callback) {
  const addition = parseFloat(offsetAddition) || 0;
  const sticky = $(element);

  const handleClassToggle = () => {
      const scroll = $(window).scrollTop();
      const section = $(sectionToFollow);
      const sectionToFollowHeight = section.height() || 0;
      const sectionBottom = section.offset().top + (sectionToFollowHeight + (offsetAddition * 4));
      const stickyOffset = section.offset().top + addition;

      if (scroll >= stickyOffset && scroll <= sectionBottom) {
          sticky.addClass(htmlClass || "fixed");
      } else {
          sticky.removeClass(htmlClass || "fixed");
      }
  }

  $(window).scroll(function () {
      handleClassToggle();
  });

  if(callback) {
      callback(handleClassToggle)
  }
}