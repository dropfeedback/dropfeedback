import type { ActionReturn } from "svelte/action";

interface Attributes {
	"on:outclick": (event: CustomEvent) => void;
}

export function clickOutside(node: HTMLElement): ActionReturn<undefined, Attributes> {
	const handleClick = (event: Event) => {
        const path = event.composedPath();
        
		if (!path.includes(node)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
