export const listKeys = (obj) => {
	if (typeof obj !== "object" || obj === null) return null;
	return Object.keys(obj).join(",");
};

export const isPlainObject = (obj) => {
	return obj != null && Object.getPrototypeOf(obj) === Object.prototype;
};