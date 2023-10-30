function toggler(options) {
    const button = $(options.button);
    const action = $(options.actionContainer);
    const classToAdd = options.actionClass || "active";

    if (options.removeAction) {
        let _eventTrigger = $(options.removeAction.eventTrigger);
        let event = options.removeAction.event;

        _eventTrigger.on(event, function () {
            action.removeClass(classToAdd);
        });
    }

    button.click(function (e) {
        console.log("workign");
        if (options.preventDefault) {
            e.preventDefault();
        }
        button.toggleClass(classToAdd);
        action.toggleClass(classToAdd);
    });
}

toggler({
    button: "[data-cart-button]",
    actionContainer: ".cart",
    actionClass: "active",
    preventDefault: true,
    removeAction: { eventTrigger: window.body, event: "click" },
});