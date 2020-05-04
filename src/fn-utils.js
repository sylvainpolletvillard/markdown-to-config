export function compose(f, ...fns) {
	return (...args) => fns.reduce((x, g) => g(x), f(...args))
}

export const defaultTo = (defaultVal) => (x) => x ?? defaultVal
