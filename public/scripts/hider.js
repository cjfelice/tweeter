//hides the error message and tweet entry bar on page-load//
// and handles animation for entry bar and button press//
$(document).ready(function() {
  $('.error').hide();
  $('.new-tweet').hide();
  $('#new-tweet-button').mouseover(function() {
    $('#bouncer').css('animation-duration', '0.2s');
  });
  $('#new-tweet-button').mouseout(function() {
    $('#bouncer').css('animation-duration', '1s');
  });
  $('#new-tweet-button').click(function() {
    $('.new-tweet').slideDown('slow');
    $('#bouncer').css('animation-name', 'none');
    $('#bouncer').slideUp();
  });
});