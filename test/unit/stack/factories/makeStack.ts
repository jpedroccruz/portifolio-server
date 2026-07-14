import type { CreateStackDTO } from "../../../../src/modules/stacks/dto/create-stack.dto"

export function makeStack(): CreateStackDTO {
	return {
		name: `Ts-${crypto.randomUUID()}`,
		iconUrl: "https://commons.wikimedia.org/wiki/File:Typescript_logo_2020.svg",
	}
}
