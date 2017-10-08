//****************************************************************
//  Get Language TTS Information
//****************************************************************
function get_lang_tts( langcode )
{
	if($.trim(langcode).length > 0 )
	{
	    var dataString = 'langcode='+langcode;

		$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxLanguageSelect.php",
		data: dataString,
		cache: false,
		dataType:"JSON",
		success: function(data){
				$.each(data, function(index, entry) {
					tts_lang   = entry.tts_code;
					tts_speed  = entry.tts_speed;

		            $.session.set('tts_lang', tts_lang);
		            $.session.set('tts_speed', tts_speed);

                    localStorage.setItem('tts_lang', tts_lang);
                    localStorage.setItem('tts_speed', tts_speed);

				});
		    }
		});
	}
}

//****************************************************************
//  학습하기
//****************************************************************
function setHomeQuestion( usercode, wordlevel )
{
    var retry = $.session.get('retry');	

	if($.trim(usercode).length > 0 && $.trim(wordlevel).length > 0)
	{

        var chapterno = $.session.get('chapter_no');

	    if ( chapterno == "" || chapterno == undefined )
	    {
	       chapterno = "0";
	    }

		var dataString = 'usercode='+usercode+'&wordlevel='+wordlevel+'&chapterno='+chapterno+'&retry='+retry;

		var word_id      = '';
		var word_letter  = '';
		var pronounce    = '';
		var word_meaning = '';
		var word_example = '';
		var word_interpret = '';
		var level_title  = '';
		
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxUserStudy.php",
			data: dataString,
			cache: false,
			dataType:'json',
			success: function(data) {				

               $.each(data, function(index, entry) {
				   word_id        = entry.wordid;
				   word_letter    = entry.wordletter;
				   pronounce      = entry.pronounce;
				   word_meaning   = entry.wordmeaning;
				   word_example   = entry.wordexample;
				   word_interpret = entry.wordinterpret;
				   level_title    = entry.leveltitle;
			   });				   

			   var meaning_flag = $.session.get('meaning');
			   var example_flag = $.session.get('example');
			   var writing_flag = $.session.get('writing');

               $('#pgStudyStage').text(wordlevel+" "+level_title);

               if ( writing_flag == 'Y')
               {
                    $('#pgStudyMeaning').text(word_meaning);
                    $('#pgStudyInterpret').text(word_interpret);

               } else {
                   $('#pgStudyWord').text(word_letter);
                   $('#pgStudyPronounce').text(pronounce);
                   $('#pgStudyExample').text(word_example);

                   if ( meaning_flag == 'Y')
                   {
                      $('#pgStudyMeaning').text(word_meaning);
                   }

                   if ( example_flag == 'Y')
                   {
                       $('#pgStudyInterpret').text(word_interpret);
                   }
               }

			   $('#pgStudyWordId').val(word_id);
			   $('#pgStudyWordVal').val(word_letter);	
			   $('#pgStudyMeaningVal').val(word_meaning);
			   $('#pgStudyExampleVal').val(word_example);
			   $('#pgStudyInterpretVal').val(word_interpret);

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#saveError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			}
		});
		
	} else {
		alert("Invalid Stage");
	}	
}

//****************************************************************
//  Word Study Log
//****************************************************************
function logWordStudy()
{
	
	var wordletter = $("#pgStudyWordVal").val();	
	
	var usercode      = $("#pgStudyUser").val();
	var wordlevel     = $("#pgStudyLevel").val();
	var wordid        = $("#pgStudyWordId").val();
	var skipflag      = $("#pgStudySkip").val();
	var return_value = " ";

	if( $.trim(wordletter).length > 0 )
	{	
        var dataString = 'usercode='+usercode+'&wordlevel='+wordlevel+'&wordid='+wordid+'&skipflag='+skipflag;
		
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordStudyLog.php",
			data: dataString,
			cache: false,
			success: function(data) {

			  if(data=="S")
			  { 
			    return_value = "OK";
			  } else {
				return_value = "NG";
			  }
				  
			}
		});
	}
	
	return return_value;
}
