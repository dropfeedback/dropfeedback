<script>
	export let size = 48;
	$: sizePx = `${size}px`;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	style:width={sizePx}
	style:height={sizePx}
	fill="currentColor"
	viewBox="0 0 48 48"
>
	<circle cx="9.5" cy="24.5" r="3.5" />
	<circle cx="23.5" cy="24.5" r="3.5" />
	<circle cx="37.5" cy="24.5" r="3.5" />
</svg>
