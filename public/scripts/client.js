/*
 * Client-side JS logic
 */

$(document).ready(function() {

  //calculates proper age of old tweets and returns a message//
  const findTweetTime = function(time) {
    const timeStamp = Date.now() - time;
    const minutes = timeStamp / 60 / 1000;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = months / 12;
    let messageTime = 'just now';
    if (minutes >= 5) {
      messageTime = `${Math.round(minutes)} minutes ago`;
    }
    if (hours >= 1) {
      messageTime = `an hour ago`;
    }
    if (hours >= 2) {
      messageTime = `${Math.round(days)} hours ago`;
    }
    if (days >= 1) {
      messageTime = `a day ago`;
    }
    if (days >= 2) {
      messageTime = `${Math.round(days)} days ago`;
    }
    if (months >= 1) {
      messageTime = `a month ago`;
    }
    if (months >= 2) {
      messageTime = `${Math.round(months)} months ago`;
    }
    if (years >= 1) {
      messageTime = `a year ago`;
    }
    if (years >= 2) {
      messageTime = `${Math.round(years)} years ago`;
    }
    return messageTime;
  };

  //removes cross-language security issues//
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //loads existing tweets from server//
  const loadTweets = function() {
    $.getJSON('/tweets')
      .then(function(data) {
        console.log('output :>> ', data);
        $('#tweetZone').empty();
        console.log(data);
        renderTweets(data);
      })
      .fail(function(output) {
        console.log(output);
      });
  };

  //renders array of tweet objects onto page//
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweetZone').prepend($tweet);
    }
  };

  //creates html for each seperate tweet//
  const createTweetElement = function(object) {
    let htmlOut = `  <article class='tweet'>
      <header>
        <div id='icon'>
          <img src=${object.user.avatars}> 
          <div class='name'>${object.user.name}</div>
      </div>
      <div class='tag'>${object.user.handle}</div>
      </header>
      <div class="post">${escape(object.content.text)}</div>
      <footer>
        <div>${findTweetTime(object.created_at)}</div>
        <div class='reaction'>
        <img src='/images/iconmonstr-favorite-4-16.png'>
        <img src='/images/iconmonstr-retweet-1-16.png'>
        <img src='/images/iconmonstr-flag-7-16.png'>
      </div>
      </footer>
    </article>`;
    return htmlOut;
  };

  //page load and new post logic//

  $('.new-tweet').on('submit', function(event) {
    event.preventDefault();

    //checks post-legality and throws proper errors//
    const tweetChars = $('#tweet-text').val();
    if (tweetChars.length === 0 || tweetChars.length === null) {
      $('.error').slideUp('fast', function() {
        $('.error').css('color', 'tomato');
        $('.error').css('border-color', 'tomato');
        $('.error').text('Nobody heard you. Try typing something.');
      });
      $('.error').slideDown('fast');
    } else if (tweetChars.length > 140) {
      $('.error').slideUp('fast', function() {
        $('.error').css('color', 'tomato');
        $('.error').css('border-color', 'tomato');
        $('.error').text('Bleeted too many. 140 or less pls.');
      });
      $('.error').slideDown('fast');
    } else {
      $('.error').slideUp('fast');
      const data = $('#tweet-text').serialize();
      $.post('/tweets', data)
        .then(function() {
          loadTweets();
          $('#tweet-text').val('');
          $('.counter').val(140);
        })
        .fail(function(output) {
          console.log(output);
        });
    }
  });

  loadTweets();

});

