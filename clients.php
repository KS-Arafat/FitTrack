<?php require_once "minify.php"; ?>
<!DOCTYPE html>
<html lang="en">
<?php include "components/header.php" ?>

<body>
	<?php include "components/navbar.php" ?>
	<section class="section__container client__container" id="client">
		<h2 class="section__header">OUR TESTIMONIALS</h2>
		<div class="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="client__card">
						<img src="https://picsum.photos/300/300.webp?random=1" alt="client" loading="lazy" />
						<div><i class="ri-double-quotes-r"></i></div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Veritatis est nemo exercitationem sequi quibusdam mollitia
							ipsam, nobis quo.
						</p>
						<h4>Sarah Johnson</h4>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="client__card">
						<img src="https://picsum.photos/300/300.webp?random=2" alt="client" loading="lazy" />
						<div><i class="ri-double-quotes-r"></i></div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Veritatis est nemo exercitationem sequi quibusdam mollitia
							ipsam, nobis quo.
						</p>
						<h4>Michael Wong</h4>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="client__card">
						<img src="https://picsum.photos/300/300.webp?random=3" alt="client" loading="lazy" />
						<div><i class="ri-double-quotes-r"></i></div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Veritatis est nemo exercitationem sequi quibusdam mollitia
							ipsam, nobis quo.
						</p>
						<h4>Emily Davis</h4>
					</div>
				</div>
			</div>
		</div>

	</section>
	<script src="scrollreveal.min.js"></script>
	<script src="main.min.js"></script>
</body>

</html><?php ob_end_flush(); ?>