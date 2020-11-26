export const listKeys = (obj) => {
	if (typeof obj !== "object" || obj === null) return null;
	return Object.keys(obj).join(",");
};
