(function($){
  "use strict";

  var linkTemplate;
  var content;
  $(document).ready(function(){
    console.log("HELLO MY FRIENDS");
    linkTemplate = Handlebars.compile($('#templateLink').html());
    content = $('#content');
    refresh();

    $('input[name="submit"]').click(function(){
      console.log("Posting link");
      var url = $('input[name="url"]').val();
      var title = $('input[name="title"]').val();
      postLink(title, url);
    });
  });

  function postLink(title, url){
    var user = $('input[name="user"]').val() || "anonymous";
    $.ajax('/links', {
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        title: title,
        url: url,
        user: user
      }),
      success: function(data){
        console.log("YES!");
        $('tbody').append(linkTemplate(JSON.parse(data)));
      },
      error: function(){
        console.log("NOES!");
        //TODO: display error
      }
    });
  }

  function refresh(){
    $.ajax('/links', {
      success: function(data){
        console.log("refreshed!");
        var html = "";
        $.each(data, function(key, val){
          val.id = key;
          html += linkTemplate(val);
        });
        //console.log(html);
        content.html(html);
        registerVotes();
        setTimeout(refresh, 2000);
      }
    });
  }

  function registerVotes(){
    /*
    $('.upvote').each(function(){
      $(this).click(function(){
        var id = $(this).parent('div').parent('div').attr('id');
        console.log("Upvote " + id);
      });
    });
    */

    content.children("div").each(function(){
      var that = $(this);
      var id = that.attr('id');
      that.find(".upvote").click(function(){
        vote(id, "up");
      });
      that.find(".downvote").click(function(){
        vote(id, "down");
      });
    });

  }

  function vote(id, dir){
    $.post('/links/'+id+'/'+dir, {
      success: function(){
        var $score = $('#'+id).find('.score');
        var score = parseInt($score.html());
        score += (dir === 'up' ? 1 : -1);
        $score.html(score);
      }
    });
  }

  Handlebars.registerHelper("formatDate", function(datetime) {
    //TODO: this only works in new chrome/ff, add a backwards compatible solution
    return new Date(datetime).toLocaleString("de-CH", {timeZone: "Europe/Zurich"});
  }); 
})(jQuery);
