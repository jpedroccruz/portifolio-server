import { uuid } from "zod"
import type { CreateStackDTO } from "../../../../src/modules/stacks/dto/create-stack.dto"

export function makeStack(): CreateStackDTO {
	return {
		name: `Ts-${uuid}`,
		iconUrl: "https://commons.wikimedia.org/wiki/File:Typescript_logo_2020.svg",
	}
}
