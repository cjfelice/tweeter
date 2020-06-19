$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let val = $(this).val();
    $(this).parent().children().find('.counter').html(140 - val.length);
    if (140 - val.length < 0) {
      $(this).parent().children().find('.counter').css('color', 'red');
    }
    if (140 - val.length >= 0) {
      $(this).parent().children().find('.counter').css('color', '#545149');
    }
  });
});