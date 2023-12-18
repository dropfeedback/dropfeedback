<script lang="ts">
	import "../../lib";

	//widget props
	let projectId = "b4dbbce7-92ae-47fa-840e-b696a9fb856b";
	let themeScheme = "light";
	let primaryColor = "#1677ff";
	let textColor = "#171717";
	let backgroundColor = "#fafafa";
	let defaultButtonPosition = "right";
	let defaultButtonEnabled = true;
	let metaCustomerId = "123";
	let metaRole = "manager";

	//custom button props
	let customButtonProjectId = "custom-92ae-47fa-840e-b696a9fb856b";
	let customButtonThemeScheme = "dark";
	let customButtonPrimaryColor = "#683194";
	let customButtonTextColor = "#ededed";
	let customButtonBackgroundColor = "#000000";
	let customButtonSide = "right";
	let customButtonSideOffset = 12;
	let customButtonDefaultOpen = false;
	let customButtonPermanentOpen = false;
	let customButtonMetaCustomerId = "987";
	let customButtonMetaLocation = "US";

	let showAnotherFeedbackButton = false;

	$: {
		document.documentElement.classList.toggle("dark", themeScheme === "dark");
	}

	$: {
		if (themeScheme === "light") {
			textColor = "#171717";
			backgroundColor = "#fafafa";
		} else {
			textColor = "#ededed";
			backgroundColor = "#000000";
		}
	}
</script>

<main>
	<h2>Widget Props</h2>

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
			<legend>Default Button:</legend>

			<div>
				<input
					type="radio"
					id="right"
					name="defaultButtonPosition"
					value="right"
					checked
					bind:group={defaultButtonPosition}
				/>
				<label for="right">Right</label>

				<input
					type="radio"
					id="left"
					name="defaultButtonPosition"
					value="left"
					bind:group={defaultButtonPosition}
				/>
				<label for="left">Left</label>
			</div>

			<div>
				<input
					type="radio"
					id="enabled"
					name="defaultButtonEnabled"
					checked
					value={true}
					bind:group={defaultButtonEnabled}
				/>
				<label for="enabled">Enabled</label>

				<input
					type="radio"
					id="disabled"
					name="defaultButtonEnabled"
					value={false}
					bind:group={defaultButtonEnabled}
				/>
				<label for="disabled">Disabled</label>
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

	<feedbacky-widget
		project-id={projectId}
		theme-scheme={themeScheme}
		theme-primary-color={primaryColor}
		theme-text-color={textColor}
		theme-background-color={backgroundColor}
		default-button-position={defaultButtonPosition}
		default-button-enabled={defaultButtonEnabled}
		meta-customer-id={metaCustomerId}
		meta-role={metaRole}
	/>

	<h2>Custom Button</h2>

	<div class="center">
		<button
			data-feedback-button
			data-project-id={customButtonProjectId}
			data-theme-scheme={customButtonThemeScheme}
			data-theme-primary-color={customButtonPrimaryColor}
			data-theme-text-color={customButtonTextColor}
			data-theme-background-color={customButtonBackgroundColor}
			data-side={customButtonSide}
			data-side-offset={customButtonSideOffset}
			data-open={customButtonDefaultOpen}
			data-permanent-open={customButtonPermanentOpen}
			data-meta-customer-id={customButtonMetaCustomerId}
			data-meta-location={customButtonMetaLocation}
		>
			custom feedback button
		</button>
	</div>

	<div class="flex-row">
		<fieldset>
			<legend>Theme:</legend>

			<div>
				<input
					type="radio"
					id="light2"
					name="button-theme"
					value="light"
					checked
					bind:group={customButtonThemeScheme}
				/>
				<label for="light2">Light</label>

				<input
					type="radio"
					id="dark2"
					name="button-theme"
					value="dark"
					bind:group={customButtonThemeScheme}
				/>
				<label for="dark2">Dark</label>
			</div>

			<div>
				<div>
					<input type="color" id="primaryColor" bind:value={customButtonPrimaryColor} />
					<label for="primaryColor">Primary Color</label>
				</div>

				<div>
					<input type="color" id="backgroundColor" bind:value={customButtonBackgroundColor} />
					<label for="backgroundColor">Background Color</label>

					<input type="color" id="textColor" bind:value={customButtonTextColor} />
					<label for="textColor">Text Color</label>
				</div>
			</div>
		</fieldset>

		<fieldset>
			<legend>Custom Button:</legend>

			<div>
				<span>Open State:</span>
				<input
					type="radio"
					id="defaultOpenTrue"
					name="defaultOpen"
					value={true}
					checked
					bind:group={customButtonDefaultOpen}
				/>
				<label for="defaultOpenTrue">True</label>

				<input
					type="radio"
					id="defaultOpenFalse"
					name="defaultOpen"
					value={false}
					bind:group={customButtonDefaultOpen}
				/>
				<label for="defaultOpenFalse">False</label>
			</div>

			<div>
				<span>Permanent Open:</span>
				<input
					type="radio"
					id="permanentOpenTrue"
					name="permanentOpen"
					checked
					value={true}
					bind:group={customButtonPermanentOpen}
				/>
				<label for="permanentOpenTrue">True</label>

				<input
					type="radio"
					id="permanentOpenFalse"
					name="permanentOpen"
					value={false}
					bind:group={customButtonPermanentOpen}
				/>
				<label for="permanentOpenFalse">False</label>
			</div>
		</fieldset>

		<fieldset>
			<legend>Meta Values:</legend>

			<div>
				<label for="customerId">Customer ID</label>
				<input type="text" id="customerId" bind:value={customButtonMetaCustomerId} />
			</div>

			<div>
				<label for="location">Location</label>
				<select id="location" bind:value={customButtonMetaLocation}>
					<option value="US">US</option>
					<option value="TR">TR</option>
					<option value="FR">FR</option>
				</select>
			</div>
		</fieldset>

		<fieldset>
			<legend>Popover Options:</legend>

			<div>
				<label for="sideOffset">Side Offset</label>
				<input type="number" id="sideOffset" bind:value={customButtonSideOffset} />
			</div>

			<div>
				<label for="side">Side</label>
				<select id="side" bind:value={customButtonSide}>
					<option value="right">Right</option>
					<option value="left">Left</option>
					<option value="top">Top</option>
					<option value="bottom">Bottom</option>
				</select>
			</div>
		</fieldset>

		<div>
			<label for="projectId">Project ID</label>
			<input style="width: 250px" type="text" id="projectId" bind:value={customButtonProjectId} />
		</div>
	</div>

	<button
		on:click={() => {
			showAnotherFeedbackButton = !showAnotherFeedbackButton;
		}}>Show Another Feedback Button</button
	>
	{#if showAnotherFeedbackButton}
		<div class="center">
			<button data-feedback-button> custom feedback button </button>
		</div>
	{/if}

	<!-- <button data-feedback-button data-side="bottom">custom feedback button 2</button> -->
</main>
