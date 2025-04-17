<?php require_once "minify.php"; ?>
<!DOCTYPE html>
<html lang="en">
<?php include "components/header.php" ?>

<body>
	<?php include "components/navbar.php" ?>
	<section class="blog" id="blog">
		<div class="section__container blog__container">
			<h2 class="section__header">BLOGS</h2>
			<div class="blog__grid">
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=1" alt="blog" loading="lazy" />
					<h4>Fueling Your Body for Optimal Performance</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=2" alt="blog" loading="lazy" />
					<h4>A Guide to Setting and Achieving Fitness Goals</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=3" alt="blog" loading="lazy" />
					<h4>Tips and Techniques for Efficient Exercise</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=4" alt="blog" loading="lazy" />
					<h4>
						Unlock Your Strength: The Science of Building Muscle and Endurance
					</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=5" alt="blog" loading="lazy" />
					<h4>Fueling Your Body for Optimal Performance</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=6" alt="blog" loading="lazy" />
					<h4>Move Better, Feel Stronger: The Key to Functional Fitness</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=7" alt="blog" loading="lazy" />
					<h4>
						From Fatigue to Focus: How Exercise Boosts Energy and Mental
						Clarity
					</h4>
				</div>
				<div class="blog__card">
					<img src="https://picsum.photos/600/400.webp?random=8" alt="blog" loading="lazy" />
					<h4>
						The Power of Recovery: Why Rest Days Are Essential for Peak
						Performance
					</h4>
				</div>
			</div>
			<div class="blog__btn">
				<button class="btn btn__primary">VIEW ALL</button>
			</div>
		</div>
	</section>
	<script src="scrollreveal.min.js"></script>
	<script src="main.min.js"></script>
</body>

</html><?php ob_end_flush(); ?>