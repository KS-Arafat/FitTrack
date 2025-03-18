<!DOCTYPE html>
<html lang="en">
<?php include "components/header.php" ?>

<body class="auth__body">
	<div class="auth__wrapper">
		<form class="auth__form" action="#">
			<h2 class="auth__title">Login</h2>
			<div class="auth__input-field">
				<input type="text" required="" />
				<label>Enter your email</label>
			</div>
			<div class="auth__input-field">
				<input type="password" required="" />
				<label>Enter your password</label>
			</div>
			<div class="auth__forget">
				<label for="remember">
					<input type="checkbox" id="remember" />
					<p>Remember me</p>
				</label>
				<a href="#">Forgot password?</a>
			</div>
			<button type="submit" class="auth__btn">Log In</button>
			<div class="auth__register">
				<p>Don't have an account? <a href="#">Register</a></p>
			</div>
		</form>
	</div>
</body>

</html>