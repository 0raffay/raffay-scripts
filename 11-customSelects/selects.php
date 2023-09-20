<style>
    /* CUSTOM SELECT CSS START*/
    .cs__selectMain {
        position: relative;

        --dropDownHeight: 400px;
        --dropDownBg: #FFF;

        --optionHeight: 56px;
        --optionBg: #FFF;
        --optionPadding: 18px 0 18px 23px;
        --optionColor: var(--clr-neutral-700);
        --optionFs: var(--fs-16);

        --activeOptionBg: #EBF1FD;
        --activeOptionBorder: 1px solid var(--clr-primary);
    }

    [data-cus-select-item],
    .cs__selectInput {
        cursor: pointer;
        user-select: none;
    }

    .cs__selectDropDown {
        position: absolute;
        top: 100%;
        width: 100%;

        max-height: var(--dropDownHeight);

        background: var(--dropDownBg);
        box-shadow: 0px 8px 25px 0px rgba(0, 0, 0, 0.20);
    }

    [data-cus-select-item] {
        height: var(--optionHeight);
        padding: var(--optionPadding);
        display: block;
        width: 100%;

        background: var(--optionBg);

        color: var(--optionColor);
        font-size: var(--optionFs);
        font-weight: 500;
        line-height: normal;
    }

    [data-cus-select-item].selected,
    [data-cus-select-item]:hover {
        background: var(--activeOptionBg);
        border-bottom: var(--activeOptionBorder);
    }

    /* CUSTOM SELECT CSS END*/
</style>
<div class="cs__selectMain">
    <input class="cs__selectInput" initialValue="" data-cus-select value="" placeholder='Select Country' readonly>
    <div class="cs__selectDropDown" data-cus-select-dropdown>
        <span data-cus-select-item>General Or Sadaqah</span>
        <span data-cus-select-item>Qurbani</span>
        <span data-cus-select-item>Zakat</span>
    </div>
</div>

<script>
    function customSelect() {
        const selects = $("[data-cus-select]");
        const cusSelectDropDown = $("[data-cus-select-dropdown]");
        const cusSelectOptions = $("[data-cus-select-item]")


        cusSelectDropDown.slideUp();
        let isOpen = false;
        selects.click(function() {
            cusSelectDropDown.slideUp();
            if (isOpen) {
                $(this).next().slideUp();
                isOpen = false;
            } else {
                $(this).next().slideDown();
                isOpen = true;
            }
        });

        cusSelectOptions.click(function() {
            if ($(this).hasClass('selected')) {
                return;
            } else {
                $(this).addClass('selected')
            }

            $(this).parent().prev().addClass("selected");
            let itsText = $(this).text();
            $(this).parent().prev().val(itsText).removeClass("error");
            cusSelectDropDown.slideUp();
            // updateButtonStatus();
        });
    }
    customSelect()
</script>