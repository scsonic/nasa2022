
$(function(){
    console.log("init web") ;
    bind_all() ;
});

var search_result_arr = [] ;
var search_process_index = 0 ;


var search_loop = function() {

    if ( search_process_index < search_result_arr.length && search_process_index < 5 ) {
        let arr = search_result_arr ;
        styleImage2(arr[search_process_index], style_arr[0], function(){
            //console.log("done1") ;
            styleImage2(arr[search_process_index], style_arr[1], function(){
                //console.log("done2") ;
                styleImage2(arr[search_process_index], style_arr[2], function(){
                    //console.log("done3") ;
                    styleImage2(arr[search_process_index], style_arr[3], function(){
                        //console.log("done4") ;
                        search_process_index = search_process_index + 1 ;
                        console.log("search loop again") ;
                        search_loop() ;
                    })
                })
            })
        })
    }
    else {
        console.log("END") ;
        var hr = document.createElement('hr');
        var results = document.getElementById("results");
        var p = document.createElement('p');
        p.innerHTML = "Search END" ;
        results.prepend(p);
        results.prepend(hr);
    }
}

var bind_all = function(){
    $("#btn_start").click(function(){
        var search_text = $("#search_text").val() ;

        if ( search_text.length > 0 ) {
            console.log("start search!!" + search_text) ; 
            google_image_search(search_text, function(arr){
                search_result_arr = arr ;
                console.log(arr) ;
                search_process_index = 0 ;
                search_loop() ;

                
            });
        }
        
    }) ;
}

function google_image_search(text, callback) {
    var url = "https://customsearch.googleapis.com/customsearch/v1?&key=AIzaSyDCO8kG6jUcnQiBqEIezCIJ_td28yRJ5bI&cx=04ca12c156cf146e9&searchType=image";
    console.log("the url:", url) ;

    $.ajax({
        url: url,
        data: { "q": text}, 
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(returnData){
            var arr = [] ;
            var itemlen = returnData.items.length
            for ( var i = 0 ; i < itemlen ; i++){
                // arr.push(returnData.items[i].link) ;
                arr.push(returnData.items[i].image.thumbnailLink) ;
            }
            //console.log(returnData);
            console.log(arr) ;

            callback(arr) ;
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert("search error, please try again, or contact me: scsonic@gmail.com");
        }
    });
}

let style_arr = ["images/style2.jpg", "images/style3.png","images/style4.jpg","images/pbsf.jpg"] ;
let test_image = ["images/duck.jpg", "images/webb.jpg", "images/puppy.jpg", "images/baby.jpg", "images/banana.jpg", 
"images/car.jpg", "images/maple.jpg", "images/flower.jpg"] ;

var style_img = document.getElementById('style-img') ;
var content_img = document.getElementById('content-img') ;
var btnStart = document.getElementById('style-button');

var style_end_callback = function(){ } ;

function done(){
    console.log("process done!") ;
    if (style_end_callback != undefined ) {
        style_end_callback() ;  
    }
}

function appendImg() {
    var img = document.createElement('img');
    var sourceCanvas = document.getElementById("stylized");
    var sourceImageData = sourceCanvas.toDataURL("image/png");
    img.src = sourceImageData;

    var results = document.getElementById("results");
    results.prepend(img);
}

var styleImage = function(content_url, style_url, callback) {

    if ( callback != undefined ) {
        style_end_callback = callback ;
    }
    style_img.onload = undefined ;
    style_img.crossOrigin="anonymous"; 
    style_img.src = "" ;
    style_img.onload = function(){
        console.log("new style onloaded!") ;

        content_img.onload = undefined ;
        content_img.crossOrigin="anonymous"; 
        content_img.src = "" ;
        content_img.onload = function(){
            setTimeout(function(){
                btnStart.onclick() ;
            },100) ;
            
        }
        content_img.src = content_url ;

    } ;
    style_img.src = style_url ;
}

var styleImage2 = function(content_url, style_url, callback) {

    styleImage(content_url, style_url, function(){
        var sourceCanvas = document.getElementById("stylized");
        var sourceImageData = sourceCanvas.toDataURL("image/png");
        console.log("gen no1!") ;
        styleImage(sourceImageData, style_url, function(){
            console.log("gen no 2!") ;
            appendImg() ;
            callback() ;
        }) ;
    })
}

var cnt = 10 ;
var ii = 0 ;
var jj = 0 ;

function loopGen(){

    if ( ii < style_arr.length) {
        if ( jj < test_image.length ) {
            console.log("start:" + style_arr[ii] + "," + test_image[jj]) ;
            styleImage2(test_image[jj], style_arr[ii], function(){
                appendImg() ;
                setTimeout(function(){
                    loopGen() ;
                }, 500) ;
            })
            jj ++ ;
        }
        else {
            jj = 0 ;
            ii ++ ;
            loopGen() ;
                var hr = document.createElement('hr');
                document.body.appendChild(hr)
        }
    }
}

function test(){

    ii = 0 ;
    jj = 0 ;
    loopGen() ;
}

function test2(){

    styleImage2(test_image[0], style_arr[0], function(){
        console.log("DONE") ;
    }) ;
}
