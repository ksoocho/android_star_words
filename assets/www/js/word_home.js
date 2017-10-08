//****************************************************************
//  User Stage
//****************************************************************
function setHomeDisplay(usercode)
{

	// 선택된 교재 List 보여주기
	var wordlevel = $.session.get('word_level');

   var chapterno = $.session.get('chapter_no');

    if ( chapterno == "" || chapterno == undefined )
    {
       chapterno = "0";
    }

	 if ( wordlevel != null && wordlevel != undefined)
	 {
	     // Main Display
		 getHomeResult(usercode, wordlevel);

		 $('#indexWordLevel').text( wordlevel+" "+$.session.get('word_level_title') +" #"+chapterno);

	 } else {
		 $('#indexWordLevel').text("Select Training Stage");
	 }

}

//****************************************************************
//  Result Display
//****************************************************************

function getHomeResult( usercode, wordlevel)
{

	if($.trim(usercode).length > 0 && $.trim(wordlevel).length > 0)
	{

	    var chapterno = $.session.get('chapter_no');

        if ( chapterno == "" || chapterno == undefined )
        {
           chapterno = "0";
        }

		var dataString = 'usercode='+usercode+'&wordlevel='+wordlevel+'&chapterno='+chapterno;
		
		var total_count  = 0;
		var study_count  = 0;
		var submit_count  = 0;
		var ok_count  = 0;
		var ng_count  = 0;
		
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxUserResult.php",
			data: dataString,
			cache: false,
			dataType:'json',
			success: function(data) {				

			   for(var i=0; i<data.length; i++)
			   {
				   total_count  = data[i].totalcount;
				   study_count  = data[i].studycount;
				   submit_count = data[i].submitcount;
				   ok_count     = data[i].okcount;
				   ng_count     = data[i].ngcount;
			   }

			   $('#homeTotalCount').text(total_count);
			   $('#homeStudyCount').text(study_count);
			   $('#homeSubmitCount').text(submit_count);
			   $('#homeOKCount').text(ok_count);
			   $('#homeNGCount').text(ng_count);

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#homeError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			}
		});
		
	} else {
		$("#homeError").html("<span style='color:#cc0000'>Error : </span>" + "Invalid Stage");
	}	
}

//****************************************************************
//  Word Battle Clear
//****************************************************************
function clearWordBattle( wordlevel )
{
	var dataString = 'wordlevel='+wordlevel;

    $.ajax({
        type: "POST",
        url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordBattleClear.php",
        data: dataString,
        cache: false,
        success: function(data) {

          if(data=="S")
          {
            $("#homeError").html("<span style='color:#cc0000'>Word Battle Clear - Success : </span>"+ wordlevel );
          } else {
              $("#homeError").html("<span style='color:#cc0000'>Word Battle Clear - Error : </span>"+ data );
          }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#homeError").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });
}