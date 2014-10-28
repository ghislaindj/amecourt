$(document).ready(function  () {
    console.log("form");
    $("form.contact #submit").on("click",function  (e) {
        e.preventDefault();
        $("form.contact .success").hide();
        $("form.contact .error").hide();
        $.post("/book",$(this).serialize())
        .done(function( data ) {
          console.log(data);
          $("form.contact .success").fadeIn();
        })
        .fail( function(xhr, textStatus, errorThrown) {
            $("form.contact .error").fadeIn();
        })
    })
 });