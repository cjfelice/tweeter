//hides the error message and tweet entry bar on page-load//
// and handles animation for entry bar and button press//
// also handles floating 'back-to-top' logic//
$(document).ready(function() {
  $('.error').hide();
  $('.arrow').hide();
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
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 350) {
      $('.arrow').slideDown('slow');
    }
    if ($(this).scrollTop() < 350) {
      $('.arrow').slideUp('slow');
    }
    $('.arrow').on('click', function() {
      $([document.documentElement, document.body]).scrollTop('.container');
      $('.new-tweet').slideDown('slow');
    });
  });
});
