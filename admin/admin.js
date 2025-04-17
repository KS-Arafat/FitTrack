document.addEventListener("DOMContentLoaded", function () {
	const searchInput = document.querySelector(".search-bar input");
	const userTableBody = document.getElementById("userTableBody");
	if (userData.length === 0) {
		userTableBody.innerHTML = '<tr><td colspan="7">No users found</td></tr>';
		return;
	}
	userTableBody.innerHTML = userData
		.map(
			(user) => `<tr data-id="${user.id}"><td>${escapeHtml(user.email)}</td>
                <td>${escapeHtml(user.age)}</td>
                <td>${escapeHtml(user.gender)}</td>
                <td>${escapeHtml(user.height_cm)}</td>
                <td>${escapeHtml(user.weight_kg)}</td>
                <td>${escapeHtml(user.updated_at)}</td>
                <td>
                    <button class="btn-view" onclick="window.location.href='/fittrack/admin/view.php?uuid=${
											user.uuid
										}';"><i class="ri-eye-fill"></i></button>
                    <button class="btn-delete" onclick="window.location.href='/fittrack/admin/delete.php?uuid=${
											user.uuid
										}';"><i class="ri-delete-bin-fill"></i></button>
                </td>
            </tr>
        `
		)
		.join("");
	const originalTableHTML = userTableBody.innerHTML;
	searchInput.addEventListener("input", function () {
		const searchTerm = this.value.toLowerCase().trim();
		if (searchTerm === "") {
			userTableBody.innerHTML = originalTableHTML;
			return;
		}
		const filteredUsers = userData.filter((user) => {
			return (
				user.email.toLowerCase().includes(searchTerm) ||
				String(user.age).includes(searchTerm) ||
				user.gender.toLowerCase().includes(searchTerm) ||
				String(user.height_cm).includes(searchTerm) ||
				String(user.weight_kg).includes(searchTerm) ||
				user.updated_at.toLowerCase().includes(searchTerm)
			);
		});
		renderFilteredUsers(filteredUsers);
	});
	function renderFilteredUsers(users) {
		if (users.length === 0) {
			userTableBody.innerHTML =
				'<tr><td colspan="7">No matching users found</td></tr>';
			return;
		}
		let html = "";
		users.forEach((user) => {
			html += `
                <tr data-id="${user.id}">
                    <td>${escapeHtml(user.email)}</td>
                    <td>${escapeHtml(user.age)}</td>
                    <td>${escapeHtml(user.gender)}</td>
                    <td>${escapeHtml(user.height_cm)}</td>
                    <td>${escapeHtml(user.weight_kg)}</td>
                    <td>${escapeHtml(user.updated_at)}</td>
                     <td>
                    <button class="btn-view" onclick="window.location.href='/fittrack/admin/view.php?uuid=${
											user.uuid
										}';"><i class="ri-eye-fill"></i></button>
                    <button class="btn-delete" onclick="window.location.href='/fittrack/admin/delete.php?uuid=${
											user.uuid
										}';"><i class="ri-delete-bin-fill"></i></button>
                </td>
                </tr>
            `;
		});
		userTableBody.innerHTML = html;
	}
	function escapeHtml(unsafe) {
		if (unsafe === null || unsafe === undefined) return "";
		return String(unsafe)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}
	function calculateStatistics() {
		if (userData.length === 0) {
			return {
				userCount: 0,
				avgHeight: 0,
				avgWeight: 0,
			};
		}
		const totalHeight = userData.reduce(
			(sum, user) => sum + parseFloat(user.height_cm),
			0
		);
		const totalWeight = userData.reduce(
			(sum, user) => sum + parseFloat(user.weight_kg),
			0
		);
		return {
			userCount: userData.length,
			avgHeight: totalHeight / userData.length,
			avgWeight: totalWeight / userData.length,
		};
	}
	const stats = calculateStatistics();
	document.getElementById("au").textContent = stats.userCount;
	document.getElementById("tu").textContent = stats.userCount;
	document.getElementById("ah").textContent = stats.avgHeight.toFixed(1);
	document.getElementById("aw").textContent = stats.avgWeight.toFixed(1);
});
