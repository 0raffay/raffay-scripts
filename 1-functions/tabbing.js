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
  buttonAttr: "mobile-inner-tabbing-button", //Define Button
  targetAttr: "mobile-inner-tabbing-target", //Define Target Which Button Interacts with
  initialHideAll: true, //Hides All Targets And Removes Active Class Initally From all buttons
  initialHide: true, //Hide All Targets Execept From 1st one
  nothingOnActive: true, // Removes Hide Show Functionality if Button is clicked once

}, function (button, target, targetName, clickCount) {

  //do something 
  if (clickCount > 1) {
    //do something else if button was clicked before.
  }
})

function tabbingByTarget(options, callback) {
  const selector = {
    button: options.buttonAttr ? options.buttonAttr : "rf-tabbing-button",
    target: options.targetAttr ? options.targetAttr : "rf-tabbing-target",
  }
  const buttons = $(`[${selector.button}]`);
  const targets = $(`[${selector.target}]`);

  if (options.initialHideAll) {
    buttons.removeClass("active");
    targets.removeClass("active").hide();
  }
  else if (options.initialHide) {
    buttons.eq(0).addClass("active");
    targets.eq(0).addClass("active").show();
    targets.not(":first-of-type").hide();
  }



  const hide = (button, target) => {
    //buttons
    buttons.removeClass("active");
    button.addClass("active");

    //targets:
    targets.removeClass("active").hide();
    target.addClass("active").show();
  }

  const show = (button, target) => {
    button.removeClass("active");
    target.removeClass("active").hide();
  }

  // const 

  buttons.click(function () {

    let wasActive = $(this).hasClass("active");

    if (options.nothingOnActive) {
      if (wasActive) {
        return;
      }
    }

    let clickCount = 1;
    if (wasActive) {
      clickCount++
    }

    let thisButton = $(this);
    let target = $(this).attr(`${selector.button}`).trim().toLowerCase();

    targets.each(function () {
      let thisTarget = $(this).attr(`${selector.target}`).trim().toLowerCase();
      if (target == thisTarget) {


        if (wasActive) {
          show(thisButton, $(this))
        } else {
          hide(thisButton, $(this));
        }


        if (callback) {
          callback(thisButton, $(this), thisTarget, clickCount);
        }
        return;
      }

      thisButton.addClass("disabled");
    })
  })
}
