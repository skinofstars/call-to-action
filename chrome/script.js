

getOutlet(function($story) {
  applyCTAs($story);
});


function getOutlet(callback) {
  var hostname = window.location.hostname
  var $story

  if ( hostname.indexOf('bbc') != -1 ) {
    $story = $('.story-body');
  }

  if ( hostname.indexOf('guardian') != -1 ) {
    var $story = $('.content__article-body');
  }

  if ( hostname.indexOf('dailymail') != -1 ) {
    var $story = $('.article-text');
  }

  if ( hostname.indexOf('telegraph') != -1 ) {
    var $story = $('.story');
  }

  if ( hostname.indexOf('huffingtonpost') != -1 ) {
    var $story = $('#mainentrycontent');
  }

  callback($story)
}


function applyCTAs($story) {
  var $container = $('<div id="fl-cta-container"></div>');

  var matches = getActions($story);

  for (var i = matches.length - 1; i >= 0; i--) {
    $container.append('<a class="cta-help-button cta-button" href="'+matches[i].url+'">'+matches[i].title+'</a>')
  };

  $container.append('<div class="cta-about"><a href="http://skinofstars.com/call-to-action">A Call To Action</a></div>');

  $story.append($container)
}


function getActions($story) {
  // ctaActions is defined in a seperate file

  var matches = [];

  // iterate actions
  for ( var i = 0; i < ctaActions.length; i++ ) {
    var match = false;

    var storyText = $story.text();

    // is there an action required word?
    if ( ctaActions[i].required != undefined ) {

      // does the story have the required word?
      if ( storyText.indexOf(ctaActions[i].required) != -1 ) {

        // still need a secondary keyword
        if ( listItemInHaystack(ctaActions[i].keywords, storyText) ) {
          matches.push(ctaActions[i]);
        }
      }
    }
    // no required word? just do general keyword search then
    else {
      if ( listItemInHaystack(ctaActions[i].keywords, storyText) ) {
        matches.push(ctaActions[i]);
      }
    }
  }

  return matches;
}


function listItemInHaystack(list, haystack) {
  var isMatch = false;
  // iterate actions' keywords
  for ( var j = 0; j < list.length; j++ ) {
    if ( haystack.indexOf(list[j]) != -1 ) {
      isMatch = true
    }
  }
  return isMatch;
}
