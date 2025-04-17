const menuBtn = document.getElementById("menu-btn"),
	navLinks = document.getElementById("nav-links"),
	menuBtnIcon = menuBtn.querySelector("i");
menuBtn.addEventListener("click", (e) => {
	navLinks.classList.toggle("open");
	const n = navLinks.classList.contains("open");
	menuBtnIcon.setAttribute("class", n ? "ri-close-line" : "ri-menu-line");
}),
	navLinks.addEventListener("click", (e) => {
		navLinks.classList.remove("open"),
			menuBtnIcon.setAttribute("class", "ri-menu-line");
	});
const scrollRevealOption = {
	distance: "50px",
	origin: "bottom",
	duration: 1e3,
};
ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption }),
	ScrollReveal().reveal(".header__content h2", {
		...scrollRevealOption,
		delay: 500,
	}),
	ScrollReveal().reveal(".header__content p", {
		...scrollRevealOption,
		delay: 1e3,
	}),
	ScrollReveal().reveal(".header__content .header__btn", {
		...scrollRevealOption,
		delay: 1500,
	}),
	ScrollReveal().reveal(".about__card", { duration: 1e3, interval: 500 }),
	ScrollReveal().reveal(".trainer__card", {
		...scrollRevealOption,
		interval: 500,
	}),
	ScrollReveal().reveal(".blog__card", {
		...scrollRevealOption,
		interval: 500,
	});
