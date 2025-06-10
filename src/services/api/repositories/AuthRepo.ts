import BaseRepository from "./BaseRepository";

import {
	LoginEmailPostJson,
	LoginInternalIdPostJson,
	LoginJson,
} from "@/types/Auth.type";

class AuthRepo extends BaseRepository {
	private readonly URLs = {
		login: "/users/customer/login",
	};
	constructor() {
		super();
	}

	async login(data: LoginEmailPostJson | LoginInternalIdPostJson) {
		return this.getClientOrServer().post<LoginJson>(this.URLs.login, data);
	}
}

export default AuthRepo;
