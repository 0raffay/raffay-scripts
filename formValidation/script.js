function stepFormValidation() {
    $(".volunteerSecondForm").hide();
    const allFieldsNotEmpty = $(".not-empty-field");
    const numberField = $(".numberField");
    const emailField = $(".emailField");
    const $submitButton = $(".firstNextButton");

    var switchThisStep = false;

    function checkIfEmpty() {
        allFieldsNotEmpty.each(function () {
            const itsValue = $(this).val();
            if (itsValue === "") {
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }
        });
    }

    function numberFieldValidation() {
        const numberFieldValue = numberField.val();
        const numberRegex = /^\d{9,}$/;
        if (!numberRegex.test(numberFieldValue)) {
            numberField.addClass("error");
        } else {
            numberField.removeClass("error");
        }
    }

    function emailFieldValidation() {
        const emailFieldValue = emailField.val();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailFieldValue)) {
            emailField.addClass("error");
        } else {
            emailField.removeClass("error");
        }
    }

    function updateButtonStatus() {
        let errorClassOnEmpty = allFieldsNotEmpty.hasClass("error");
        let errorClassOnRegex = $(".regex-required-field").hasClass("error");

        if (errorClassOnEmpty || errorClassOnRegex) {
            $submitButton.prop("disabled", true);
            switchThisStep = false;
        } else {
            $submitButton.prop("disabled", false);
            switchThisStep = true;
        }
    }

    function switchSteps() {
        if (switchThisStep) {
            $(".volunteerFirstForm").hide();
            $(".volunteerSecondForm").show();
        }
    }

    $submitButton.click(function (e) {
        checkIfEmpty();
        numberFieldValidation();
        emailFieldValidation();
        updateButtonStatus();
        switchSteps();

        e.preventDefault();
    });

    allFieldsNotEmpty.change(function () {
        $(this).removeClass("error");
        updateButtonStatus();
    });

    numberField.change(function () {
        numberFieldValidation();
        updateButtonStatus();
    });

    emailField.change(function () {
        emailFieldValidation();
        updateButtonStatus();
    });
}

stepFormValidation();
