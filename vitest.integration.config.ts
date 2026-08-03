import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "node",
		include: ["test/integration/**/**.spec.ts"],
		setupFiles: ["test/integration/setup.integration.ts"],
		fileParallelism: false,
		coverage: {
			provider: "v8",
			enabled: true,
			reporter: ["html", "text"],
		},
	},
})
