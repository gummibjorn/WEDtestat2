(function($){
  "use strict";

  var linkTemplate;
  var content;
  $(document).ready(function(){
    linkTemplate = Handlebars.compile($('#templateLink').html());
    content = $('#content');
    refresh();

    $('#linkform').submit(function(){
      var url = $('input[name="url"]').val();
      $('input[name="url"]').val('');
      var title = $('input[name="title"]').val();
      $('input[name="title"]').val('');
      postLink(title, url);
      return false;
    });

    $('.login input[type="submit"]').click(function(){
      var $username = $(this).prev();
      $.ajax('/login', {
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ user: $username.val() }),
        success: function(){
          toggleLoginUI();
          $('.logout .username').html($username.val());
          $username.val('');
        },
        error: function(){
          console.log("Login failed");
        }
      });

    });

    $('.logout input').click(function(){
      $.ajax('/login', {
        type: 'DELETE',
        contentType: 'application/json',
        success: function(){
          toggleLoginUI();
          $('.logout .username').html('');
        },
        error: function(){
          console.log("Logout failed");
        }
      });
    });

  });

  function toggleLoginUI(){
    $('.login').toggleClass('hidden');
    $('.logout').toggleClass('hidden');
    $('#linkform').toggleClass('hidden');
  }

  function postLink(title, url){
    $.ajax('/links', {
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        title: title,
        url: url,
      }),
      success: function(data){
        $('tbody').append(linkTemplate(JSON.parse(data)));
      },
      error: function(){
        console.log("NOES!");
        //TODO: display error
      }
    });
  }

  function refresh(){
    var user = $('.user .username').html();
    $.ajax('/links', {
      success: function(data){
        console.log("refreshed!");
        var html = "";
        $.each(data, function(key, link){
          link.id = key;
          link.deletable = (link.user === user);
          html += linkTemplate(link);
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
