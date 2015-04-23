(function($){
  "use strict";

  var linkTemplate;
  var content;
  $(document).ready(function(){
    console.log("HELLO MY FRIENDS");
    linkTemplate = Handlebars.compile($('#templateLink').html());
    content = $('tbody');
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
        setTimeout(refresh, 2000);
      }
    });
  }
})(jQuery);
