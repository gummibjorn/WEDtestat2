(function($){
  "use strict";

  var linkTemplate;
  $(document).ready(function(){
    console.log("HELLO MY FRIENDS");
    linkTemplate = Handlebars.compile($('#templateLink').html());

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
})(jQuery);
