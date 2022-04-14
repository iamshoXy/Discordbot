declare global {
	namespace NodeJS {
		interface ProcessEnv {
			token: string;
			mongo_uri: string;
			prefix: string;
		}
	}
}

export {}