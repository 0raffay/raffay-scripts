// function addStickyClass(element, htmlClass, offsetAddition, sectionToFollow, callback) {
//   const addition = parseFloat(offsetAddition) || 0;
//   const sticky = $(element);

//   const handleClassToggle = () => {
//       const scroll = $(window).scrollTop();
//       const section = $(sectionToFollow);
//       const sectionToFollowHeight = section.height() || 0;
//       const sectionBottom = section.offset().top + (sectionToFollowHeight + (offsetAddition * 4));
//       const stickyOffset = section.offset().top + addition;

//       if (scroll >= stickyOffset && scroll <= sectionBottom) {
//           sticky.addClass(htmlClass || "fixed");
//       } else {
//           sticky.removeClass(htmlClass || "fixed");
//       }
//   }

//   $(window).scroll(function () {
//       handleClassToggle();
//   });

//   if(callback) {
//       callback(handleClassToggle)
//   }
// }

function addStickyClass(element, container) {
      const containerOffset = container.offsetTop;

      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        if (scrollPosition >= containerOffset) {
          element.classList.add('stickyTop');
          element.classList.remove("absoluteBottom")
          if (scrollPosition + element.offsetHeight >= containerOffset + container.offsetHeight) {
            element.classList.remove('stickyTop');
            element.classList.add("absoluteBottom")
          }
        } else {
          element.classList.remove('stickyTop');
          element.classList.remove("absoluteBottom")
        }
      });
    }

    const stickyElement = document.querySelector('.aboutusListContainer');
    const containerElement = document.getElementById('aboutSectionRow');

    addStickyClass(stickyElement, containerElement);
