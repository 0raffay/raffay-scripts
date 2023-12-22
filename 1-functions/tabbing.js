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




function tabbingByTarget(buttonDataAttribute, targetsDataAttribute, initalHide = false, nothingOnActive = true, callback) {
    const selector = {
        button: buttonDataAttribute ? buttonDataAttribute : "rf-tabbing-button",
        target: targetsDataAttribute ? targetsDataAttribute : "rf-tabbing-target",
    }
    const buttons = $(`[${selector.button}]`);
    const targets = $(`[${selector.target}]`);

    if (initalHide) {
        buttons.eq(0).addClass("active");
        targets.eq(0).addClass("active").show();
        targets.not(":first-of-type").hide();
    }


    const hideShow = (button, target) => {
        //buttons
        buttons.removeClass("active");
        button.addClass("active");

        //targets:
        targets.removeClass("active").hide();
        target.addClass("active").show();
    }

    buttons.click(function () {
        if (nothingOnActive) {
            if ($(this).hasClass("active")) {
                return;
            }
        }

        let clickCount = 1;
        if ($(this).hasClass("active")) {
            clickCount++
        }

        let thisButton = $(this);
        let target = $(this).attr(`${selector.button}`);
        targets.each(function () {
            let thisTarget = $(this).attr(`${selector.target}`);
            if (target == thisTarget) {
                hideShow(thisButton, $(this));
                if (callback) {
                    callback(thisButton, $(this), thisTarget, clickCount);
                }
                return;
            }

            thisButton.addClass("disabled");
        })
    })
}
