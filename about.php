<?php require_once "minify.php"; ?>
<!DOCTYPE html>
<html lang="en">
<?php include "components/header.php" ?>

<body>
	<?php include "components/navbar.php" ?>
	<section class="section__container about__container" id="about">
		<div class="about__header">
			<h2 class="section__header">ABOUT US</h2>
			<p class="section__description">
				Our mission is to inspire and support individuals in achieving their
				health and wellness goals, regardless of their fitness level or
				background.
			</p>
		</div>
		<div class="about__grid">
			<div class="about__card">
				<h4>About Us 01</h4>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
					distinctio dicta fugiat ea velit commodi sed dignissimos porro? Ad
					maxime minima quam ex ipsum amet repellendus aliquid hic! Sint,
					quisquam?
				</p>
			</div>
			<div class="about__card">
				<h4>About Us 02</h4>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
					ipsam, aliquam dicta maiores minima hic facere magni voluptas dolore
					eaque dolores molestiae cumque, atque ducimus sed vero delectus
					debitis. Quaerat!
				</p>
			</div>
			<div class="about__card">
				<h4>About Us 03</h4>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
					numquam harum quas explicabo maxime, sunt officia odio ratione
					dolorem laboriosam dolores sed rerum nam autem odit aspernatur,
					excepturi repellat vero?
				</p>
			</div>
			<div class="about__card">
				<h4>About Us 04</h4>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
					voluptas rem vitae commodi quos optio ad, minus, veniam cumque totam
					repellat assumenda facere accusantium sapiente cupiditate doloribus,
					dolores iusto provident!
				</p>
			</div>
		</div>
	</section>
	<script src="scrollreveal.min.js"></script>
	<script src="main.min.js"></script>
</body>

</html>
<?php ob_end_flush(); ?>