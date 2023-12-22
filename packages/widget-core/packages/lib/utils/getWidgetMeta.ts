export const getWidgetMeta = () => {
    const widget = document.querySelector("drop-feedback");
		if (widget) {
			return widget.getAttributeNames().reduce(
				(acc, name) => {
					if (name.startsWith("meta-")) {
						const newKey = name
							.replace("meta-", "")
							.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
						acc[newKey] = widget.getAttribute(name);
					}

					return acc;
				},
				{} as Record<string, any>
			);
		}
        return {};
}