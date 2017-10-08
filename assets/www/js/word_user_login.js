//****************************************************************
//  Check Login Main
//****************************************************************
function check_login( usercode, password ){	

    var userId = 0;
	var userMode = "";
	var returnCode = "";

	var dataString = 'usercode='+usercode+'&password='+password;

	if($.trim(usercode).length > 0 && $.trim(password).length > 0)
	{	

		$.ajax({
		type: "POST",
		url: "http://cksoonew.cafe24.com/cks_star_words/ajax/ajaxWordLogin.php",
		data: dataString,
		cache: false,
		dataType:"JSON",
		success: function(data){

				$.each(data, function(index, entry) {
					userId = entry.user_id;
					userMode = entry.user_mode;
					returnCode = entry.return_code;
				}); 

				if (returnCode == "S"){

					$.session.set('user_id'   , userId);
					$.session.set('user_mode' , userMode);					
					$.session.set('login_user', usercode);

					localStorage.setItem('user_id'   , userId);
					localStorage.setItem('user_mode' , userMode);
					localStorage.setItem('login_user', usercode);

					$('#errorLogin').text("Login Success");

				} else {
                    $('#errorLogin').text("Login Fail");
				}
				
		    }
		});
	
	} else {
		$.session.clear();
		$("#errorLogin").html("<span style='color:#cc0000'>Error:</span> Invalid User ID or Password");
	}

}
	
function validateLogin(usercode, password){
	
	if(usercode == '' || usercode == null){
		$("#errorLogin").html("<span style='color:#cc0000'>Error:</span> Invalid User ID");
		$("#b_usercode").focus();
		return false;
	}
	if(password == '' || password == null){
		$("#errorLogin").html("<span style='color:#cc0000'>Error:</span> Invalid password");
		$("#b_password").focus();
		return false;
	}
	return true;
}