function authenticationHandler($inElt, options) {
	var self = this;
	this.$elt = $inElt;
	this.fbUrl = options.fbUrl;
	this.options = options;

	this.init = function(){
		self.$elt.on('click', '.js-register-button', self.registerUser);
		self.$elt.on('click', '.js-login-button', self.loginUser);
		self.$elt.on('click', '.js-forgotpassword-button', self.forgotPassword);
		self.$elt.on('click', '.js-resetpassword-button', self.resetPassword);
	}

	this.registerUser = function() {
		var ref = new Firebase(self.fbUrl);
		ref.createUser({
		  email: self.$elt.find('.js-register-email').val(),
		  password: self.$elt.find('.js-register-password').val()
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        break;
		      default:
		        console.log("Error creating user:", error);
		    }
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		  }
		});
	}

	this.loginUser = function() {
		var ref = new Firebase(self.fbUrl);
		if(ref.getAuth())
			ref.unauth();
		ref.authWithPassword({
		  email: self.$elt.find('.js-login-email').val(),
		  password: self.$elt.find('.js-login-password').val()
		}, function(error, authData) {
		  if (error) {
		    self.displayFailure(error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    window.location = window.location.href.replace('login.html', 'mudder2.html');
		  }
		});
	}

	this.getAuth = function() {
		var ref = new Firebase(self.fbUrl);
		var authData = ref.getAuth();
		if (authData) {
		  console.log("Authenticated user with uid:", authData.uid);
		  return authData;
		}
		else {
			window.location = window.location.href.replace('mudder2.html', 'login.html');
		}
		return null;
	}

	this.logout = function() {
		var ref = new Firebase(self.fbUrl);
		var authData = ref.unauth();		
		window.location = window.location.href.replace('mudder2.html', 'login.html');					
	}

	this.forgotPassword = function() {
		var ref = new Firebase(self.fbUrl);
		ref.resetPassword({
			email: self.$elt.find('.js-forgotpassword-email').val()
		}, function(error) {
		  if (error) {
		    switch (error.code) {
		      case "INVALID_USER":
		        self.displayFailure("The specified user account does not exist.");
		        break;
		      default:
		        self.displayFailure("Error resetting password:", error);
		    }
		  } else {
		    self.displaySuccess("Password reset email sent successfully!");
		    //self.$elt.find('#my-tab-content a[href="#profile"]').tab('show');
		  }
		});
	}

	this.resetPassword = function() {		
		var ref = new Firebase(self.fbUrl);
		ref.changePassword({
		  email: self.$elt.find('.js-reset-email').val(),
		  oldPassword: self.$elt.find('.js-reset-oldpassword').val(),
		  newPassword: self.$elt.find('.js-reset-newpassword').val(),
		}, function(error) {
		  if (error) {
		    switch (error.code) {
		      case "INVALID_PASSWORD":
		        self.displayFailure("The specified user account password is incorrect.");
		        break;
		      case "INVALID_USER":
		        self.displayFailure("The specified user account does not exist.");
		        break;
		      default:
		        self.displayFailure("Error changing password:", error);
		    }
		  } else {
		    self.displaySuccess("User password changed successfully!");
		  }
		});
	}

	this.displayFailure = function(error) {
		var $alertText = self.options.$alertElt.find('.js-error-text');
		$alertText.html(error);
		self.options.$alertElt.removeClass('hidden');
	}

	this.displaySuccess = function(msg) {
		var $successText = self.options.$succesElt.find('.js-success-text');
		$successText.html(msg);
		self.options.$succesElt.removeClass('hidden');
	}
}