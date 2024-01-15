function tabbing(
    buttonClassByContainer,
    panelClassByContainer,
    utilityClassToAdd, callback) {
    let activeClass = utilityClassToAdd ? utilityClassToAdd : "active";
    let buttons = $(buttonClassByContainer);
    let panels = $(panelClassByContainer);

    panels.not(panels.eq(0)).hide();

    buttons.click(function () {
        let itsIndex = $(this).index();
        if (panels.eq(itsIndex).length != 0) {
            buttons.removeClass(activeClass);
            $(this).addClass(activeClass);
            panels.hide();
            panels.eq(itsIndex).show().addClass(activeClass);
            if (callback) {
                callback();
            }
        } else {
            $(this).addClass("disabled");
        }
    });
}

tabbing(".tabbingButtons button", ".tabbingPanels .tabbingPanel");



/******************
   tabbingByTarget 
 ******************/
tabbingByTarget({
  buttonAttr: "rfTabbing-open", //Define Button
  targetAttr: "rfTabbing-target", //Define Target Which Button Interacts with
  initialHideAll: true, //Hides All Targets And Removes Active Class Initally From all buttons
  initialHide: true, //Hide All Targets Execept From 1st one
  nothingOnActive: true, // Removes Hide Show Functionality if Button is clicked once

}, function (button, target, clickCount, targetName ) {

  //do something 
  if (clickCount > 1) {
    //do something else if button was clicked before.
  }
})

 function tabbingByTarget(options, callback) {
            const selector = {
                button: options.buttonAttr ? options.buttonAttr : "rfTabbing-open",
                target: options.targetAttr ? options.targetAttr : "rfTabbing-target",
            }
            const buttons = $(`[${selector.button}]`);
            const targets = $(`[${selector.target}]`);

            if (options.initialHideAll) {
                buttons.removeClass("active");
                targets.removeClass("active").hide();
            }
            else if (options.initialHide) {
                buttons.eq(0).addClass("active");
                targets.not(":first-of-type").hide();
                targets.eq(0).addClass("active").show();
            }

            buttons.click(function () {
                let wasActive = $(this).hasClass("active");

                if (options.nothingOnActive && wasActive) {
                    return;
                }

                let clickCount = 1;
                if (wasActive) {
                    clickCount++
                }

                let thisButton = $(this);
                let target = thisButton.attr(`${selector.button}`).trim().toLowerCase();

                let allElementsToShow = targets.filter(`[${selector.target}="${target}"]`);

                if (allElementsToShow.length) {
                    buttons.removeClass("active");
                    thisButton.addClass("active");

                    targets.removeClass("active").hide();

                    allElementsToShow.each(function () {
                        $(this).show();
                    });

                    if (callback) {
                        callback(thisButton, allElementsToShow, clickCount ,target);
                    }
                } else {
                    thisButton.addClass("disabled")
                }
                thisButton.removeClass("disabled");
            });
        }
