$(document).ready(function() {
  $('#tweetZone').on('mouseover', '.tweet', function() {
    $(this).css('box-shadow', '4px 4px grey');
    $(this).find('.tag').css('color', 'grey');
  });
  $('#tweetZone').on('mouseout', '.tweet', function() {
    $(this).css('box-shadow', '0px 0px');
    $(this).find('.tag').css('color', 'rgb(235, 230, 230)');
  });
  $('#bleetButton').mouseover(function() {
    $(this).css('box-shadow', '2px 2px grey');
  });
  $('#bleetButton').mouseout(function() {
    $(this).css('box-shadow', '0px 0px');
  });
});