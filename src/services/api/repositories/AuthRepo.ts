import client from "@/lib/core/client";
import BaseRepository from "./BaseRepository";

import { LoginJson, LoginPostJson } from "@/types/Auth.type";
import server from "@/lib/core/server";

class AuthRepo extends BaseRepository {
	private readonly URLs = {
		login: "/users/customer/login",
	};
	constructor() {
		super();
	}

	async login(data: LoginPostJson) {
		console.log("🚀 ~ AuthRepo ~ login ~ data:", data);
		return client.post<LoginJson>(this.URLs.login, {
			...data,
			platform: 1,
			hostname: process.env.NEXT_PUBLIC_API_HOST_ADMIN,
			version: "1.0.0",
		});
	}
}

export default AuthRepo;
