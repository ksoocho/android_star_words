
//****************************************************************
//  User Register Stage
//****************************************************************
function setOriginLangList()
{
    var selectOrigin = $("#originLangSelect");
    var optionOrigin = "<option value=choose-one data-placeholder=true>Choose one...</option>";

	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxLanguageList.php",
		cache: false,
		dataType:'json',
		success: function(data) {
			
		   selectOrigin.empty();

		    $.each(data, function(index, entry) {
				optionOrigin += "<option value='"+entry.langcode+"'>"+ entry.langdescr +"</option>";
		    });				   
		   
		   selectOrigin.append(optionOrigin);
		   
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#stageError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		}
	});

	var origin_lang = $.session.get("origin_lang");
    selectOrigin.val(origin_lang).attr('selected', true).siblings('option').removeAttr('selected');
    selectOrigin.selectmenu("refresh", true);
}

function setCounterLangList()
{
    var selectCounter = $("#counterLangSelect");
    var optionCounter = "<option value=choose-one data-placeholder=true>Choose one...</option>";

	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxLanguageList.php",
		cache: false,
		dataType:'json',
		success: function(data) {

		   selectCounter.empty();

		    $.each(data, function(index, entry) {
				optionCounter += "<option value='"+entry.langcode+"'>"+ entry.langdescr +"</option>";
		    });

		   selectCounter.append(optionCounter);

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#stageError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		}
	});

	var counter_lang = $.session.get("counter_lang");
    selectCounter.val(counter_lang).attr('selected', true).siblings('option').removeAttr('selected');
    selectCounter.selectmenu("refresh", true);
}

function setStageBookList(from_lang, to_lang)
{
	var dataString = 'fromlang='+from_lang+'&tolang='+to_lang;

	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxLangListRegisterLevel.php",
		data: dataString,
		cache: false,
		dataType:'json',
		success: function(data) {

		   var select = $("#stageBookSelect");
		   var options = "<option value=choose-one data-placeholder=true>Choose one...</option>";
		   select.empty();

		    $.each(data, function(index, entry) {
				options += "<option value='"+entry.wordlevel+"'>"+ entry.leveltitle +"</option>";
		    });

		   select.append(options);

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#stageError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		}
	});
}

function setStageAllList()
{
	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxLangListAllLevel.php",
		cache: false,
		dataType:'json',
		success: function(data) {

		   var select = $("#stageBookSelect");
		   var options = "<option value=choose-one data-placeholder=true>Choose one...</option>";
		   select.empty();

		    $.each(data, function(index, entry) {
				options += "<option value='"+entry.wordlevel+"'>"+ entry.leveltitle + " </option>";
		    });

		   select.append(options);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#stageError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		}
	});
}

function setChapter( chapterno )
{
    $.session.set('chapter_no', chapterno);
    localStorage.setItem('chapter_no', chapterno);
    $("#stageError").html("<span style='color:#cc0000'>Chapter 선택 성공</span>" );
}

//****************************************************************
//  User Register
//****************************************************************

function doUserLevelStage( usercode, wordlevel, chapterno  )
{
	var dataString = 'usercode='+usercode+'&wordlevel='+wordlevel;

	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxUserLevelRegister.php",
		data: dataString,
		cache: false,
		success: function(data) {

		  if(data=="S")
		  {
			$.session.set('word_level', wordlevel);
			localStorage.setItem('word_level', wordlevel);

			$.session.set('chapter_no', chapterno);
            localStorage.setItem('chapter_no', chapterno);

			$("#stageError").html("<span style='color:#cc0000'>Stage 선택 성공</span>" );
		  } else {
			$("#stageError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		  }
			  
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#stageError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		}
	});
	
}	

//****************************************************************
//  Get Word Level Information
//****************************************************************
function get_word_level( wordlevel )
{
	if($.trim(wordlevel).length > 0 )
	{
	    var dataString = 'wordlevel='+wordlevel;

		$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordLevelSelect.php",
		data: dataString,
		cache: false,
		dataType:"JSON",
		success: function(data){
				$.each(data, function(index, entry) {
					word_level_title  = entry.level_title;
					origin_lang       = entry.origin_lang;
					counter_lang      = entry.counter_lang;
					user_count        = entry.user_count;
					returnCode        = entry.return_code;
					returnMsg         = entry.return_msg;

					if (returnCode == "S"){
		              $.session.set('word_level_title', word_level_title);
		              $.session.set('origin_lang', origin_lang);
		              $.session.set('counter_lang', counter_lang);

                      localStorage.setItem('word_level_title', word_level_title);
                      localStorage.setItem('origin_lang', origin_lang);
                      localStorage.setItem('counter_lang', counter_lang);

                      $('#languageInfo').text(origin_lang+" - "+counter_lang);
                      $('#stageInfo').text(  wordlevel+" / "+word_level_title +" #0");

					}
				});
		    }
		});
	}
}

//****************************************************************
//   Stage List
//****************************************************************
function listRegisterBookList(from_lang, to_lang)
{
	var dataString = 'fromlang='+from_lang+'&tolang='+to_lang;

	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxLangListRegisterLevel.php",
		data: dataString,
		cache: false,
		dataType:'json',
		success: function(data) {

           var options  = "";

		   $.each(data, function(index, entry) {
			  options +=  " <li>  "+ entry.leveltitle +" - "+ entry.wordcount +" </li>";
		   });

           $('#listRegisterBook').html(options);
		}
	});
}