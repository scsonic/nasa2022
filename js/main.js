
$(function(){
    console.log("init web") ;
    bind_all() ;
});

var bind_all = function(){
    $("#btn_start").click(function(){
        var search_text = $("#search_text").val() ;
        console.log("start search!!" + search_text) ;
    }) ;
}