function initWordSave()
{
    $("#pgSaveLetter").val("");
    $("#pgSavePronounce").val("");
    $("#pgSaveMeaning").val("");
    $("#pgSaveExample").val("");
    $("#pgSaveInterpret").val("");
	
}
//****************************************************************
//  Word Save
//****************************************************************
function doWordSave( wordlevel )
{
	var wordletter = $("#pgSaveLetter").val();	
	var formData = $("#newWordForm").serialize();	
	
	if($.trim(wordletter).length > 0)
	{	
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordSave.php",
			data: formData,
			cache: false,
			success: function(data) {

			  if(data=="S")
			  { 
			    initWordSave();
				$("#saveError").html("<span style='color:#cc0000'>Success : </span>"+ wordletter );
			  } else {
				  $("#saveError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			  }
				  
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#saveError").html("<span style='color:#cc0000'>Error : </span>"+ data );
			}
		});
	} else {
		$("#saveError").html("<span style='color:#cc0000'>Error : </span>"+ "Invalid Word" );
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
			   });				   
			
			   $('#pgSavePronounce').val(pronounce);
			   $('#pgSaveMeaning').val(word_meaning);
			   $('#pgSaveExample').val(word_example);

			}
		});
	} 
}
		