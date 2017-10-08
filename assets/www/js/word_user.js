//****************************************************************
//  User Register
//****************************************************************
function doUserRegister()
{
	var formData = $("#registerUserForm").serialize();	

	$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxUserRegister.php",
		data: formData,
		cache: false,
		success: function(data) {

		  if(data=="S")
		  {
			$("#registerError").html("<span style='color:#cc0000'>Success : Register User</span>" );
		  } else {
			$("#registerError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		  }
			  
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#registerError").html("<span style='color:#cc0000'>Error : </span>"+ data );
		}
	});

}

