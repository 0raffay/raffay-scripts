function showLoader(loaderClass, whatToHide, whatToShow, duration) {
    $(whatToHide).hide();
    $(loaderClass).show();

    setTimeout(function () {
        $(loaderClass).hide();
        $(whatToShow).show();
    }, duration);
}
showLoader(".loader", ".allProducts", ".addProduct", 100);