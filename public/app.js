(function($){
  "use strict";
  $(document).ready(function(){
    console.log("HELLO MY FRIENDS");
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
      success: function(){
        console.log("YES!");
        //TODO: relaod page?
      },
      error: function(){
        console.log("NOES!");
        //TODO: display error
      }
    });
  }
})(jQuery);
