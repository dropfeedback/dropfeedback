<script lang="ts">
	import "../../lib";

	//widget props
	let projectId = "jvqzn16owlue2s";
	let themeScheme = "light";
	let primaryColor = "#1677ff";
	let textColor = "#171717";
	let backgroundColor = "#fff";
	let metaCustomerId = "123";
	let metaRole = "manager";

	$: {
		document.documentElement.classList.toggle("dark", themeScheme === "dark");
	}

	$: {
		if (themeScheme === "light") {
			textColor = "#171717";
			backgroundColor = "#fff";
		} else {
			textColor = "#ededed";
			backgroundColor = "#000";
		}
	}
</script>

<main>

	<drop-feedback
		project-id={projectId}
		theme-scheme={themeScheme}
		theme-primary-color={primaryColor}
		theme-text-color={textColor}
		theme-background-color={backgroundColor}
		meta-customer-id={metaCustomerId}
		meta-role={metaRole}
		report-identifier="123"
	/>

	<div class="flex-row">
		<fieldset>
			<legend>Theme:</legend>

			<div>
				<input
					type="radio"
					id="light"
					name="theme"
					value="light"
					checked
					bind:group={themeScheme}
				/>
				<label for="light">Light</label>

				<input type="radio" id="dark" name="theme" value="dark" bind:group={themeScheme} />
				<label for="dark">Dark</label>
			</div>

			<div>
				<div>
					<input type="color" id="primaryColor" bind:value={primaryColor} />
					<label for="primaryColor">Primary Color</label>
				</div>

				<div>
					<input type="color" id="backgroundColor" bind:value={backgroundColor} />
					<label for="backgroundColor">Background Color</label>

					<input type="color" id="textColor" bind:value={textColor} />
					<label for="textColor">Text Color</label>
				</div>
			</div>
		</fieldset>

		<fieldset>
			<legend>Meta Values:</legend>

			<div>
				<label for="customerId">Customer ID</label>
				<input type="text" id="customerId" bind:value={metaCustomerId} />
			</div>

			<div>
				<label for="role">Role</label>
				<select id="role" bind:value={metaRole}>
					<option value="manager">Manager</option>
					<option value="admin">Admin</option>
					<option value="user">User</option>
				</select>
			</div>
		</fieldset>

		<div>
			<label for="projectId">Project ID</label>
			<input style="width: 250px" type="text" id="projectId" bind:value={projectId} />
		</div>
	</div>

	<div class="widget-container">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<button data-feedback-button data-permanent-open={false} data-theme-scheme="light"
			>Feedback</button
		>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<div data-feedback-input data-theme-scheme="light" />

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur animi cum minus
			quam cupiditate, labore nisi perspiciatis! Architecto exercitationem accusamus ipsum minima
			hic, dolor dolores aut? Quisquam, voluptates beatae.
		</p>
	</div>
</main>
