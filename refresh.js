function checkRefresh()
{
	// Get the time now and convert to UTC seconds
	var today = new Date();
	var now = today.getUTCSeconds();

	// Get the cookie
	var cookie = document.cookie;
	var cookieArray = cookie.split('; ');

	// Parse the cookies: get the stored time
	for(var loop=0; loop < cookieArray.length; loop++)
	{
		var nameValue = cookieArray[loop].split('=');
		// Get the cookie time stamp
		if( nameValue[0].toString() == 'SHTS' )
		{
			var cookieTime = parseInt( nameValue[1] );
		}
		// Get the cookie page
		else if( nameValue[0].toString() == 'SHTSP' )
		{
			var cookieName = nameValue[1];
		}
	}

	if( cookieName &&
	cookieTime &&
	cookieName == escape(location.href) &&
	Math.abs(now - cookieTime) < 5 )
	{
		// Refresh detected

		// Insert code here representing what to do on
		// a refresh
				
		console.log("refresh detected");

		// If you would like to toggle so this refresh code
		// is executed on every OTHER refresh, then 
		// uncomment the following line
		// refresh_prepare = 0; 
	}	else {
		// You may want to add code in an else here special 
		// for fresh page loads
		console.log("fresh page load");
	}
}

function prepareForRefresh()
{
	if( refresh_prepare > 0 )
	{
		// Turn refresh detection on so that if this
		// page gets quickly loaded, we know it's a refresh
		var today = new Date();
		var now = today.getUTCSeconds();
		document.cookie = 'SHTS=' + now + ';';
		document.cookie = 'SHTSP=' + escape(location.href) + ';';
	}
	else
	{
		// Refresh detection has been disabled
		document.cookie = 'SHTS=;';
		document.cookie = 'SHTSP=;';
	}
}

function disableRefreshDetection()
{
	// The next page will look like a refresh but it actually
	// won't be, so turn refresh detection off.
	refresh_prepare = 0;

	// Also return true so this can be placed in onSubmits
	// without fear of any problems.
	return true;
} 

// By default, turn refresh detection on
var refresh_prepare = 1;
