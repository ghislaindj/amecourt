$(document).ready(function  () {
    $("a.book").on("click", function(e) {
        e.preventDefault();
        console.log($(this).data('room'));
        $("form.contact").show();
        $("form.contact .success").hide();
        $("form.contact .error").hide();
        $(".contact-container .success").hide();
        $.magnificPopup.open({
          items: {
            src: $(".contact-container"),
            type: 'inline'
          }
        }, 0);
    });
    $("form.contact #submit").on("click",function  (e) {
        e.preventDefault();
        $("form.contact .success").hide();
        $("form.contact .error").hide();
        console.log("data : ", $("form.contact").serialize());
        $.post("/book",$("form.contact").serialize())
        .done(function( data ) {
            $("form.contact").hide();
            $(".contact-container .success").fadeIn();
        })
        .fail( function(xhr, textStatus, errorThrown) {
            $("form.contact .error").fadeIn();
        })
    });
    $(".contact-container .btn.close").on("click", function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    })
 });