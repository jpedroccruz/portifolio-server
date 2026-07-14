import { uuid } from "zod"

export function makeStack() {
	return {
		name: `Ts-${uuid}`,
		iconUrl: "https://commons.wikimedia.org/wiki/File:Typescript_logo_2020.svg",
	}
}
