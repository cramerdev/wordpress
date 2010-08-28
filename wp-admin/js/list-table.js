jQuery(document).ready(function(a){window.listTable={init:function(){this.loading=false;a("form").each(function(){this.reset()});if(""==a.query.GET("paged")){a.query.SET("paged",1)}this.set_total_pages();this.$tbody=a("#the-list, #the-comment-list");this.$overlay=a('<div id="loading-items>').html(listTableL10n.loading).hide().prependTo(a("body"))},set_total_pages:function(){this.total_pages=parseInt(a(".total-pages").eq(0).text())},get_total_pages:function(){return this.total_pages},change_page:function(b){if(b<1||b>this.total_pages){return false}this.update_rows({paged:b})},change_search:function(b){this.update_rows({s:b},true,function(){a("h2 .subtitle").remove();if(b){a("h2").eq(0).append(a('<span class="subtitle">').html(listTableL10n.search.replace("%s",this.htmlencode(b))))}})},htmlencode:function(b){return a("<div/>").text(b).html()},update_rows:function(c,b,f){if(this.loading){return false}var e=false;a.each(c,function(g,h){if(h!=a.query.GET(g)){a.query.SET(g,h);e=true}});if(!e){return false}this.show_overlay();if(b){a.query.SET("paged",1)}var d=a.query.get();this._callback=f;this.fetch_list(d,a.proxy(this,"handle_success"),a.proxy(this,"handle_error"));return true},fetch_list:function(c,d,b){c=a.extend(c,{action:"fetch-list",list_args:list_args,});a.ajax({url:ajaxurl,global:false,dataType:"json",data:c,success:d,error:b,})},handle_success:function(b){if("object"!=typeof b){this.handle_error()}else{this.hide_overlay();this.$tbody.html(b.rows);a(".displaying-num").html(b.total_items);a(".total-pages").html(b.total_pages);this.set_total_pages();a(".current-page").val(a.query.GET("paged"));if(this._callback){this._callback()}}},handle_error:function(){this.hide_overlay();a("h2").after('<div class="error ajax below-h2"><p>'+listTableL10n.error+"</p></div>")},show_overlay:function(){this.loading=true;a(".error.ajax").remove();this.$overlay.css({width:this.$tbody.width()+"px",height:this.$tbody.height()-20+"px"}).css(this.$tbody.offset()).show()},hide_overlay:function(){this.loading=false;this.$overlay.hide()}};listTable.init();a(".tablenav-pages a").click(function(){var b=a.query.GET("paged");switch(a(this).attr("class")){case"first-page":b=1;break;case"prev-page":b-=1;break;case"next-page":b+=1;break;case"last-page":b=listTable.get_total_pages();break}listTable.change_page(b);return false});a(".current-page").keypress(function(b){if(13!=b.keyCode){return}listTable.change_page(parseInt(a(this).val()));return false});a("th a").click(function(){var d=a.query.GET("orderby"),b=a.query.GET("order"),c=a(this).parent("th");if(c.hasClass("sortable")){d=a.query.load(a(this).attr("href")).get("orderby");b="asc";a("th.sorted-desc, th.sorted-asc").removeClass("sorted-asc").removeClass("sorted-desc").addClass("sortable");c.removeClass("sortable").addClass("sorted-asc")}else{if(c.hasClass("sorted-asc")){b="desc";c.removeClass("sorted-asc").addClass("sorted-desc")}else{if(c.hasClass("sorted-desc")){b="asc";c.removeClass("sorted-desc").addClass("sorted-asc")}}}listTable.update_rows({orderby:d,order:b},true);return false});a(".search-box :submit").click(function(){listTable.change_search(a(this).parent(".search-box").find(":text").val());return false});a(".search-box :text").keypress(function(b){if(13!=b.keyCode){return}listTable.change_search(a(this).val());return false});a("#post-query-submit").click(function(){var c,d,b={};a(this).parents(".actions").find('select[name!="action"]').each(function(){var e=a(this);b[e.attr("name")]=e.val()});listTable.update_rows(b,true);return false});a(".view-switch a").click(function(){var b=a(this);listTable.update_rows({mode:a.query.load(b.attr("href")).get("mode")},false,function(){a(".view-switch .current").removeClass("current");b.addClass("current")});return false})});