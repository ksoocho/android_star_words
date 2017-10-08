
//****************************************************************
//  Common 
//****************************************************************

var $tablemsg = "";
var $listmsg = "";

//****************************************************************
//  TOP10 LIST 조회하기
//****************************************************************
function loading_show(){
	$('#noticeLoading').html("<img src='./img/loading.gif'/>").fadeIn('fast');
}

function loading_hide(){
	$('#noticeLoading').fadeOut('fast');
} 

function setNoticeList(){

	var $brecordmsg = "";
	
    $.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxAdminNotice.php",
		cache: false,
		dataType:'json',
		success: function(data) {	

            $.each(data, function(index, entry) {
			   $questionTitle   = entry.questiontitle;
			   $questionDescr   = entry.questiondescr;
			  
			   $brecordmsg = $brecordmsg + "<li><h4>" + $questionTitle +"</h4><pre>"+$questionDescr+"</pre></li>"

			});	
			
	        $listmsg =  "<ul data-role='listview' data-theme='d' data-inset='true'>" + $brecordmsg + "</ul>"; 	

			$("#noticeContainer").html($listmsg);		

		}
	});		
	
}

function loadNoticeList(){
	
	loading_show();                    

	setNoticeList();
	 
	//------------------------------- 
	// End
	//------------------------------- 
	loading_hide();
	


}


