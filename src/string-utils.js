import { compose, defaultTo } from "./fn-utils.js"

export const replaceSpaces = (by) => (str) => str.replace(/\s+/g, by)
export const removeSpaces = replaceSpaces("")
export const mergeSpaces = replaceSpaces(" ")
export const trim = compose(mergeSpaces, (str) => str.trim())

export const camelize = compose(
	defaultTo(""),
	(str) =>
		str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
			index == 0 ? letter.toLowerCase() : letter.toUpperCase()
		),
	removeSpaces
)

export const parseKey = compose(trim, camelize)

export function getByPath(object, path) {
	let index = 0
	let length = path.length

	while (object != null && index < length) {
		object = object[parseKey(path[index++])]
	}

	return index && index == length ? object : undefined
}

export function setByPath(object, path, value) {
	let index = 0
	let length = path.length

	while (object != null && index < length) {
		let key = parseKey(path[index++])
		if (index === length) {
			object[key] = value
		} else if (!object.hasOwnProperty(key)) {
			object[key] = {}
		}
		object = object[key]
	}
}
