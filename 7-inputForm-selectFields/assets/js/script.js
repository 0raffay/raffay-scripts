$(document).ready(function() {
    button__stopper();
  });
  
  function button__stopper() {
    const nextButton = $('.nextButton');
    const selecttag = $('.selecttag');
    const numberOfSelectTags = selecttag.length;
    var changedTags = 0;
  
    function updateButtonStatus() {
      changedTags = 0; 
      selecttag.each(function() {
        const data__value = $(this).attr('data-value');
        const mainValue = $(this).val();
  
        if (data__value === mainValue) {
          $(this).addClass('not__changed');
        } else {
          $(this).removeClass('not__changed');
          changedTags = changedTags + 1;
        //   console.log('changed Tags', changedTags);
        }
      });
  
      if (changedTags === numberOfSelectTags) {
        nextButton.prop('disabled', false);
      } else {
        nextButton.prop('disabled', true);
      }
    }
    nextButton.click(function() {
      updateButtonStatus();

      if(changedTags === numberOfSelectTags ) {
        $(this).parent().hide()
        $(this).parent().next().show()
      }
      
    });
  
    selecttag.change(function() {
      updateButtonStatus();
    });
  }
