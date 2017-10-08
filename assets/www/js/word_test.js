function fisherYates ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}
//****************************************************************
//  학습하기
//****************************************************************
function setTestQuestion( usercode, wordlevel)
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
		var word_meaning = '';
		
		$.ajax({
			type: "POST",
			url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxUserTest.php",
			data: dataString,
			cache: false,
			dataType:'json',
			success: function(data) {				
				
				var options = "<option value=choose-one data-placeholder=true>Choose one...</option>";
				var inx = 0;

               $.each(data, function(index, entry) {
				   
				   inx = inx + 1;
				   word_id      = entry.wordid;
				   word_letter  = entry.wordletter;
				   word_meaning = entry.wordmeaning;	

				   if (inx==1)
				   {
					    $('#pgTestQuestion01').text(word_letter);
						$('#pgTestWordId01').val(word_id);
						$('#pgTestWordMean01').val(word_meaning);
				   } else if ( inx == 2 ) {
					    $('#pgTestQuestion02').text(word_letter);
						$('#pgTestWordId02').val(word_id);
						$('#pgTestWordMean02').val(word_meaning);
				   } else if ( inx == 3 ) {
					    $('#pgTestQuestion03').text(word_letter);
						$('#pgTestWordId03').val(word_id);
						$('#pgTestWordMean03').val(word_meaning);
				   } else if ( inx == 4 ) {
					    $('#pgTestQuestion04').text(word_letter);
						$('#pgTestWordId04').val(word_id);
						$('#pgTestWordMean04').val(word_meaning);
				   } else if ( inx == 5 ) {
					    $('#pgTestQuestion05').text(word_letter);
						$('#pgTestWordId05').val(word_id);			   
						$('#pgTestWordMean05').val(word_meaning);
				   }	

				});				   

			   // 선택형 답안 Random Sort 만들기			   
			   fisherYates(data);

               $.each(data, function(index, entry) {

				   word_id = entry.wordid;
				   word_meaning = entry.wordmeaning;	
				   
                   options += "<option value='"+word_id+"'>"+ word_meaning +"</option>";
			   
				});				   
			   
			   			   
				options += "<option value='0'> 몰라요 </option>";  
				
			   
			   // 선택형 만들기
			   var select1 = $("#selectTestAnswer01");
			   var select2 = $("#selectTestAnswer02");
			   var select3 = $("#selectTestAnswer03");
			   var select4 = $("#selectTestAnswer04");
			   var select5 = $("#selectTestAnswer05");

			   select1.empty();   
			   select2.empty();   
			   select3.empty();   
			   select4.empty();   
			   select5.empty();   

			   if ($('#pgTestWordId01').val != null) 
			   {
			      select1.append(options);				   
			   }

			   if ($('#pgTestWordId02').val != null) 
			   {
			      select2.append(options);				   
			   }

			   if ($('#pgTestWordId03').val != null) 
			   {
			      select3.append(options);				   
			   }

			   if ($('#pgTestWordId04').val != null) 
			   {
			      select4.append(options);				   
			   }

			   if ($('#pgTestWordId05').val != null) 
			   {
			      select5.append(options);				   
			   }
			   
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
//  Word Test Log
//****************************************************************
function submitWordTest(usercode, wordlevel, wordid, resultwordid)
{

    var return_value = " ";
	
	if($.trim(usercode).length > 0 && $.trim(wordlevel).length > 0 )
	{	
		var dataString = 'usercode='+usercode+'&wordlevel='+wordlevel+'&wordid='+wordid+'&resultwordid='+resultwordid;
		
		$.ajax({
				type: "POST",
				url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordTestLog.php",
				data: dataString,
				cache: false,
				async: false,
				success: function(data){
					if(data == "OK")
					{ 
						return_value = "OK";
					} else if ( data == "NG"){
						return_value = "NG";
					} else {
						$("#testError").html("<span style='color:#cc0000'>Error</span>"+ data );
						return_value = "NG";
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$("#testError").html("<span style='color:#cc0000'>Error : </span>"+ data );
				}
			});
    } else {
		$("#testError").html("<span style='color:#cc0000'>Error : </span>"+ "Invalid Answer" );
		return_value = "NG";
	}
	
	return return_value;	
	
}

