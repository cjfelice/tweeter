/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweetZone').prepend($tweet);
    }
  };

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
        <div class=“reaction”>
        <img src="/images/iconmonstr-favorite-4-16.png">
        <img src="/images/iconmonstr-retweet-1-16.png">
        <img src="/images/iconmonstr-flag-7-16.png">
      </div>
      </footer>
    </article>`;

    return htmlOut;
  };

  $('.new-tweet').on('submit', function(event) {
    event.preventDefault();
    const tweetChars = $('#tweet-text').val();
    if (tweetChars.length === 0 || tweetChars.length === null) {
      alert('Please enter a bleet.');
    } else if (tweetChars.length > 140) {
      alert('Bleeted too much. 140 or less pls.');
    } else {
    const data = $('#tweet-text').serialize();
    $.post('/tweets', data)
    .then(function(output) {
      loadTweets();
      console.log('output :>> ', output);
    })
    .fail(function(output) {
      console.log(output);
    });
  }
  });

  loadTweets();

});

