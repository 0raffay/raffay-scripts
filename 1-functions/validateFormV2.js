function validateForm(options, action) {
    let errorClass = options.errorClass || "error";
    let disableClass = options.disableClass || "disabled";

    let isValid = false;
    let form = $(options.form);
    let button = options.button ? $(options.button) : form.find("button[type='submit']");
    let inputs = $(options.inputs);

    let specialFields = options?.specialFields?.selector;

    function checkInputs(_this) {
        let isSpecial = undefined;

        function checkIfSpecialFields(input) {
            isSpecial = input.attr(specialFields) !== undefined;
            let regexString = input.attr(specialFields);

            if (isSpecial) {
                let regex = new RegExp(regexString);
                validateSpecialFields(input, regex);
            }
        }

        function validateSpecialFields(field, regex) {
            let fieldValue = field.val().trim();
            let test = regex.test(fieldValue) && fieldValue !== "";
            if (!test) {
                field.addClass(errorClass);
            } else {
                field.removeClass(errorClass);
            }
        }

        if (_this) {
            checkIfSpecialFields(_this);
            if (!isSpecial) {
                if (_this.val().trim() == "") {
                    _this.addClass(errorClass);
                } else {
                    _this.removeClass(errorClass);
                }
            }
        } else {
            inputs.each(function () {
                checkIfSpecialFields($(this));
                if (!isSpecial) {
                    if ($(this).val().trim() == "") {
                        $(this).addClass(errorClass);
                    } else {
                        $(this).removeClass(errorClass);
                    }
                }
            });
        }
    }

    function checkErrorClass() {
        isValid = inputs
            .toArray()
            .every((input) => !$(input).hasClass(errorClass));

        if (isValid) {
            button.removeClass(disableClass);
        }
    }

    inputs.on("change", function () {
        checkInputs($(this));
        checkErrorClass();
    });

    form.on("submit", function (e) {
        e.preventDefault();
        checkInputs();
        checkErrorClass();

        if (isValid) {
            action();
        } else {
            button.addClass(disableClass);
        }
    });
}
validateForm({
    form: "#form",
    inputs: "[validate-form]",
    button: "[validate-submit-form]",
    specialFields: {
        selector: 'validate-form-regex',
    },
    errorClass: "error", //Optional
    disableClass: "disabled", //Optional
}, function () {
    alert("working peacefully");
})

const example = `
<form id="form">
    <input type="text" validate-form >
    <input type="email" validate-form-regex="^[^\s@]+@[^\s@]+\.[^\s@]+$" >
    <input type="rel" validate-form-regex="^\d{8,}$" >
    <button type="submit" validate-submit-form >Submit</button>
</form>
`;

const emailRegex = "^[^\s@]+@[^\s@]+\.[^\s@]+$";
const telephoneRegex = "^\d{8,}$";