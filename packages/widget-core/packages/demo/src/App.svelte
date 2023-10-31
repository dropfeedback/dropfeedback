<script lang="ts">
	import "../../lib";

	let darkMode = false;
	let position = "right";
</script>

<main>
	<h1>Hello World!</h1>
	<h2>DarkMode: {darkMode ? "On" : "Off"}</h2>
	<button on:click={() => (darkMode = !darkMode)}> Toggle Dark Mode </button>
	<button on:click={() => (position === "right" ? (position = "left") : (position = "right"))}>
		Toggle Position
	</button>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte
		apps.
	</p>
	<feedbacky-widget
		project-id="24320d3d-c5f2-44e1-83a1-13e1cb61fe1d"
		theme-scheme={darkMode ? "dark" : "light"}
		{position}
	/>
</main>

<style>
</style>
