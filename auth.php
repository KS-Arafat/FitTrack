<?php require_once "minify.php"; ?>
<!DOCTYPE html>
<html lang="en">
<?php include "components/header.php" ?>

<body class="auth__body">
	<div class="auth__wrapper">
		<form class="auth__form" action="backend/login.php" method="post">
			<h2 class="auth__title">Login</h2>
			<div id="user" class="auth__input-field hidden">
				<input type="text" name="uname" />
				<label>Enter Username</label>
			</div>
			<div class="auth__input-field">
				<input type="text" required="" name="email" />
				<label>Enter your email</label>
			</div>
			<div class="auth__input-field">
				<input type="password" required="" name="pwd" />
				<label>Enter your password</label>
			</div>
			<div id="rpwd" class="auth__input-field hidden">
				<input type="password" name="rpwd" />
				<label>Retype your password</label>
			</div>
			<div id="auth_sub" class="auth__forget">
				<label for="remember">
					<input type="checkbox" id="remember" />
					<p>Remember me</p>
				</label>
				<a href="#">Forgot password?</a>
			</div>
			<button id="submit_btn" type="submit" class="auth__btn">Login</button>
			<div class="auth__register">
				<p> <span id="sub">Don't have an account?</span> <a id="reg" href="#">Register</a></p>
			</div>
		</form>
	</div>
	<script>
		let haveAccount = true;
		const form = document.querySelector("form");
		const form_title = document.querySelector("h2");
		const form_user_field = document.querySelector("#user");
		const input_user = document.querySelector("#user input");
		const form_rpwd_field = document.querySelector("#rpwd");
		const input_rpwd = document.querySelector("#rpwd input");
		const form_subfunc = document.querySelector("#auth_sub");
		const submit_btn = document.querySelector("#submit_btn");
		const span_sub = document.querySelector("#sub");
		document.getElementById("reg").addEventListener("click", function (e) {
			if (haveAccount) {
				haveAccount = false;
				form.action = "backend/register.php";
				form_title.innerText = "Register";
				form_user_field.classList.remove("hidden");
				form_rpwd_field.classList.remove("hidden");
				input_user.setAttribute("required", "");
				input_rpwd.setAttribute("required", "");
				form_subfunc.classList.add("hidden");
				span_sub.innerText = "Already have an account?";
				submit_btn.innerText = "Submit";
			} else {
				haveAccount = true;
				form.action = "backend/login.php";
				form_title.innerText = "Login";
				form_user_field.classList.add("hidden");
				form_rpwd_field.classList.add("hidden");
				input_user.removeAttribute("required");
				input_rpwd.removeAttribute("required");
				form_subfunc.classList.remove("hidden");
				span_sub.innerText = "Don't have an account?";
				submit_btn.innerText = "Login";
			}
		});

	</script>
</body>

</html>
<?php ob_end_flush(); ?>