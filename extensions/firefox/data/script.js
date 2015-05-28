
(function(){

  var $j = jQuery.noConflict();

  getOutlet(function($story) {
    applyCTAs($story);
  });


  function getOutlet(callback) {
    var hostname = window.location.hostname
    var $story

    if ( hostname.indexOf('bbc') != -1 ) {
      $story = $j('.story-body');
    }

    if ( hostname.indexOf('guardian') != -1 ) {
      var $story = $j('.content__article-body');
    }

    if ( hostname.indexOf('dailymail') != -1 ) {
      var $story = $j('.article-text');
    }

    if ( hostname.indexOf('telegraph') != -1 ) {
      var $story = $j('.story');
    }

    if ( hostname.indexOf('huffingtonpost') != -1 ) {
      var $story = $j('#mainentrycontent');
    }

    if ( hostname.indexOf('forbes') != -1 ) {
      var $story = $j('.article_body.article');
    }

    callback($story)
  }


  function applyCTAs($story) {
    var $container = $j('<div id="fl-cta-container"></div>');

    // only do something if we have a $story
    if ($story != undefined) {

      getActions($story, function(matches) {
        for (var i = matches.length - 1; i >= 0; i--) {
          $container.append('<a class="cta-help-button cta-button" href="'+matches[i].url+'">'+matches[i].title+'</a>')
        };

        $container.append('<div class="cta-about"><a href="https://call-to-action.skinofstars.com/ctas/new">Suggest an action</a> &middot; <a href="https://call-to-action.skinofstars.com/">About Call To Action</a></div>');

        $story.append($container)
      });
    }


  }


  function getActions($story, callback) {

    // As a temporary solution, we'll just return all the available ctas and sort
    // out what we want here. This is just a demo after all.

    // Alternative solutions:
    // - submit text of story
    // - submit URL of story

    $j.getJSON('//call-to-action.skinofstars.com/ctas.json')
      .done(function(ctaActions) {
        var matches = [];

        // iterate actions
        for ( var i = 0; i < ctaActions.length; i++ ) {
          var match = false;

          var storyText = $story.text().toLowerCase();

          // is there an action always word?
          if ( ctaActions[i].always != undefined ) {
            // does the story have the always word?
            if ( storyText.indexOf(ctaActions[i].always.toLowerCase()) != -1 ) {

              // still need a secondary keyword
              if ( listItemInHaystack(ctaActions[i].keywords, storyText) ) {
                matches.push(ctaActions[i]);
              }
            }
          }
          // no always word? just do general keyword search then
          else {
            if ( listItemInHaystack(ctaActions[i].keywords, storyText) ) {
              matches.push(ctaActions[i]);
            }
          }
        }

        callback(matches)

      });

  }


  function listItemInHaystack(list, haystack) {
    var isMatch = false;
    // iterate actions' keywords
    for ( var j = 0; j < list.length; j++ ) {
      if ( haystack.indexOf(list[j].toLowerCase()) != -1 ) {
        isMatch = true
      }
    }
    return isMatch;
  }


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-12736204-7']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

})();





