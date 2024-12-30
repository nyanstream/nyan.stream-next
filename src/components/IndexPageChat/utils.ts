export const cleanUrl = () => {
	if (!window) return;
	window.history.pushState(
		'',
		window.document.title,
		window.location.pathname + window.location.search
	);
};
