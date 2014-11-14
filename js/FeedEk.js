/*FeedEk jQuery RSS/ATOM Feed Plugin v2.0
* http://jquery-plugins.net/FeedEk/FeedEk.html  
* https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com */

(function($){
    $.fn.FeedEk=function(opt){
        var def=$.extend({
            FeedUrl:"http://rss.cnn.com/rss/edition.rss",MaxCount:5,ShowDesc:true,
            ShowPubDate:true,CharacterLimit:0,TitleLinkTarget:"_blank",
            DateFormat:"",DateFormatLang:"en",Code:"mcy",
        },opt);
        var id=$(this).attr("id"),i,s="",dt;
        $("#"+id).empty().append('<img src="loader.gif" />');
        $.ajax({
            url:"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+ def.MaxCount+"&output=json&q="+encodeURIComponent(def.FeedUrl)+"&hl=en&callback=?",
            dataType:"json",
            success:function(data){
                $("#"+id).empty();
                $.each(data.responseData.feed.entries,function(e,item){
                    //console.log(item.title+'id='+e);
                    s+='<li><div class="itemTitle"><a href="#'+def.Code+e+'" data-rel="'+e+'" data-transition="slidedown">'+item.title+"</div>";
                    if(def.ShowPubDate){
                        dt=new Date(item.publishedDate);
                        if($.trim(def.DateFormat).length>0){
                            try{
                                moment.lang(def.DateFormatLang);
                                s+='<div class="itemDate">'+moment(dt).format(def.DateFormat)+"</div>";
                            }catch(e){
                                s+='<div class="itemDate">'+dt.toLocaleDateString()+"</div>";
                            }
                        }else{
                            s+='<div class="itemDate">'+dt.toLocaleDateString()+"</div>";
                        }
                    }
                    if(def.ShowDesc){
                        if(def.DescCharacterLimit>0&&item.content.length>def.DescCharacterLimit){
                            s+='<div class="itemContent">'+
                                item.content.substr(0,def.DescCharacterLimit)+"...</div>";
                        }else{
                            s+='<div class="itemContent">'+item.content+"</div></a>";
                        }
                    }
                    var page = '<div data-role="page" data-theme="b" id="'+def.Code+e+'" data-url="'+def.Code+e+'">';
                    var header = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-theme="b"><h1>Reseña Noticia</h1><a href="../" data-rel="back" data-ajax="false"><i class="fa fa-reply"></i></a></div>';
                    var content = '<div data-role="content" style="padding:4%;"><h2>'+item.title+'</h2><div class="itemContent">'+item.content+'<br></div></div>';
                    var footer = '<div data-role="footer"data-position="fixed" data-tap-toggle="false" data-theme="b"><a href="../" data-rel="back" data-ajax="false" class="ui-btn ui-shadow ui-corner-all ui-mini ui-btn-inline ui-icon-carat-l ui-btn-icon-left ui-alt-icon ui-nodisc-icon">Regresar</a></div>';
                    var news_detail = page + header + content + footer;
                    $('body').append(news_detail);
                });
                $("#"+id).append('<ul class="feedEkList">'+s+"</ul>");
            }
        });
    }
})(jQuery)