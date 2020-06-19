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
      <div class="post">${object.content.text}</div>
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


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);

});