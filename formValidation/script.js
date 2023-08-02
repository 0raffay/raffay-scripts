$(document).ready(function () {
    // Hide the second form initially
    $(".volunteerSecondForm").hide();
    // Function to validate all required fields
    function validateForm() {
        let isValid = true;
        $("#mv-form .req-field").each(function () {
            if ($(this).val().trim() === "") {
                isValid = false;
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }
        });
        return isValid;
    }
    // Function to validate phone number
    function validatePhoneNumber() {
        const phoneNumberField = $("#contactNumber");
        if (phoneNumberField.val().match(/^\d{9,}$/)) {
            phoneNumberField.removeClass("error");
            return true;
        } else {
            phoneNumberField.addClass("error");
            return false;
        }
    }
    // Function to validate email address
    function validateEmailAddress() {
        const emailAddressField = $("#emailAddress");
        if (emailAddressField.val().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailAddressField.removeClass("error");
            return true;
        } else {
            emailAddressField.addClass("error");
            return false;
        }
    }
    // Submit button click event
    $(".submit-button").click(function () {
        if (validateForm() && validatePhoneNumber() && validateEmailAddress()) {
            $(".volunteerFirstForm").hide();
            $(".volunteerSecondForm").show();
        }
    });
    // Next button click event (for the first form)
    $(".firstNextButton").click(function () {
        if (validateForm() && validatePhoneNumber() && validateEmailAddress()) {
            $(".volunteerFirstForm").hide();
            $(".volunteerSecondForm").show();
        }
    });
    // Input field change events
    $("#mv-form input, #mv-form select").change(function () {
        validateForm();
        validatePhoneNumber();
        validateEmailAddress();
    });
});
