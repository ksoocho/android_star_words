
//****************************************************************
//  Common 
//****************************************************************

var $totalCount = 0; 
var $listmsg = "";

//****************************************************************
//  LIST 조회하기
//****************************************************************
function loading_show(){
	$('#searchLoading').html("<img src='./img/loading.gif'/>").fadeIn('fast');
}

function loading_hide(){
	$('#searchLoading').fadeOut('fast');
} 

function setSearchTotal(wordlevel, searchchar, checkword, usercode){

	var dataString = 'wordlevel='+wordlevel+'&searchchar='+searchchar+'&checkword='+checkword+'&usercode='+usercode;
	
    $.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordPageListTotal.php",
			data: dataString,
			cache: false,
			async: false,
			success: function(data) {
			   $totalCount = data;
            }			
		});	

}

function setSearchData(wordlevel, searchchar, checkword, usercode, page){
	
	$listmsg = "";
	
	var dataString = 'wordlevel='+wordlevel+'&searchchar='+searchchar+'&checkword='+checkword+'&usercode='+usercode+'&page='+page;
	
    $.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordPageList.php",
		data: dataString,
		cache: false,
		dataType:'json',
		async: false,
		success: function(data) {	

		    $.each(data, function(index, entry) {
			   $listmsg = $listmsg + "<li><b>" + "<a href=#pageWordDetail?word_id="+entry.wordid +">"+ entry.wordletter + "</a></b> " + entry.wordmeaning + "</li>";
		    });				   
 
	        $listmsg = "<div class='searchData'><ul>" + $listmsg + "</ul></div>"; 	
		}
	});		
	
}

function loadSearchData(wordlevel, searchchar, checkword, usercode, page){
	
	loading_show();                    

	//------------------------------- 
	// Content for Data
	//------------------------------- 	
	setSearchData(wordlevel, searchchar, checkword, usercode, page);

	//------------------------------- 
	// Pagination
	//------------------------------- 

	var $cur_page = page;
	var $per_page = 15;
	
	// Total Count
    setSearchTotal(wordlevel, searchchar, checkword, usercode);
	
	var $count = $totalCount;

	// Total Page 
	var $no_of_paginations = Math.ceil($count / $per_page);
	
	// Page Set
	$('#pgSearchTotalPage').val($no_of_paginations);

	var pageDisplay = $cur_page + " / " + $no_of_paginations;  

	$('#searchPageDisplay').text(pageDisplay);	

	//------------------------------- 
	// End
	//------------------------------- 
	loading_hide();
	$("#searchContainer").html($listmsg);		

}

function displayDetailPage()
{

    var wordlevel =  $.session.get('word_level');
    var wordid = localStorage.getItem("word_id");

	if($.trim(wordlevel).length > 0)
	{
		var dataString = 'wordlevel='+wordlevel+'&wordid='+wordid;

		var word_letter  = '';
		var pronounce    = '';
		var word_meaning = '';
		var word_example = '';
		var word_interpret = '';
		var level_title  = '';

		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordDetail.php",
			data: dataString,
			cache: false,
			dataType:'json',
			success: function(data) {

               $.each(data, function(index, entry) {
				   word_letter    = entry.wordletter;
				   pronounce      = entry.pronounce;
				   word_meaning   = entry.wordmeaning;
				   word_example   = entry.wordexample;
				   word_interpret = entry.wordinterpret;
				   level_title    = entry.leveltitle;
			   });

			   $('#pgDetailWord').text(word_letter);
			   $('#pgDetailPronounce').text(pronounce);
			   $('#pgDetailExample').text(word_example);
 	           $('#pgDetailStage').text(wordlevel+" "+level_title);
 		       $('#pgDetailMeaning').text(word_meaning);
			   $('#pgDetailInterpret').text(word_interpret);

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#DetailError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			}
		});

	} else {
		alert("Invalid Stage");
	}
}

