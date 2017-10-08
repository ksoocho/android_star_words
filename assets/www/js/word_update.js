function initWordUpdate()
{
    $("#pgUpdateLetter").val("");
    $("#pgUpdatePronounce").val("");
    $("#pgUpdateMeaning").val("");
    $("#pgUpdateExample").val("");
    $("#pgUpdateInterpret").val("");	
}

//****************************************************************
//  Word Update
//****************************************************************
function doWordUpdate( wordlevel )
{
	var wordletter = $("#pgUpdateLetter").val();	
	
	var formData = $("#updateWordForm").serialize();	
	
	if($.trim(wordletter).length > 0)
	{	
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordUpdate.php",
			data: formData,
			cache: false,
			success: function(data) {

			  if(data=="S")
			  { 
			    initWordUpdate();
				$("#updateWordError").html("<span style='color:#cc0000'>Success : </span>"+ wordletter );
			  } else {
				  $("#updateWordError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			  }
				  
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#updateWordError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			}
		});
	} else {
		$("#updateWordError").html("<span style='color:#cc0000'>Error : </span>"+ "Invalid Word" );
	}
}


//****************************************************************
//  Word Letter Check
//****************************************************************
function checkWordLetter( wordletter, wordlevel )
{
	var dataString = 'wordletter='+wordletter+'&wordlevel='+wordlevel;
	
	if($.trim(wordletter).length > 0)
	{	

		var pronounce    = '';
		var word_meaning = '';
		var word_example = '';
		var word_interpret = '';
		
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordSaveCheck.php",
			data: dataString,
			cache: false,
			dataType:'json',
			success: function(data) {				

               $.each(data, function(index, entry) {
				   pronounce    = entry.pronounce;
				   word_meaning = entry.wordmeaning;
				   word_example = entry.wordexample;
				   word_interpret = entry.wordinterpret;
			   });				   
			
			   $('#pgUpdatePronounce').val(pronounce);
			   $('#pgUpdateMeaning').val(word_meaning);
			   $('#pgUpdateExample').val(word_example);
			   $('#pgUpdateInterpret').val(word_interpret);

			}
		});
	} 
}
		