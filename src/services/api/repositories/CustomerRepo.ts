"use server";
import { BaseCollectionJson, BaseRepoParams } from "@/types/Base.type";
import BaseRepository from "./BaseRepository";
import Helper from "@/utils/helper";
import client from "@/lib/core/client";
import {
	CustomerEdit,
	CustomerInforEditJson,
	CustomerJson,
	CustomerPasswordEditJson,
	CustomerQuickCreateJson,
	CustomerQuickEditJson,
	CustomerUsernameEditJson,
} from "@/types/Customer.type";
import server from "@/lib/core/server";
import { cookies, headers } from "next/headers";

class CustomerRepo
	extends BaseRepository<CustomerJson>
	implements BaseRepoParams
{
	private static instance: CustomerRepo;
	accessMode: BaseRepoParams["accessMode"];

	public static getInstance(): CustomerRepo {
		if (!CustomerRepo.instance) {
			CustomerRepo.instance = new CustomerRepo();
		}
		return CustomerRepo.instance;
	}
	private readonly URLs = {
		PRIVATE: "/customers",
		PUBLIC: "/customers/public",
	};
	constructor() {
		super();
		this.accessMode = "PRIVATE";
	}

	private getCorrectURL(suffix = "") {
		return this.URLs.PRIVATE + suffix;
		switch (this.accessMode) {
			case "PRIVATE":

			default:
				return this.URLs.PRIVATE + suffix;
		}
	}

	async getAll(filter: any) {
		return this.getClientOrServer().get<BaseCollectionJson<CustomerJson>>(
			this.getCorrectURL(),
			{
				params: Helper.convertParams(filter),
			}
		);
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<CustomerJson>(
			this.getCorrectURL() + "/" + id
		);
	}

	async update(id: number, data: CustomerEdit) {
		switch (data.c_mode) {
			case "quick":
				return this.quickUpdateInfor(data.data);
			case "username":
				return this.updateUsername(data.data);
			case "infor":
				return this.updateInfor(data.data);

			case "password":
				return this.updatePassword(data.data);

			default:
				break;
		}
	}

	/////////////////////////////////////////////////////////////////////////////
	// private methods
	private async quickUpdateInfor(data: CustomerQuickEditJson) {
		return client.put(this.URLs.PUBLIC + "/token", Helper.convertParams(data));
	}

	private async updateUsername(data: CustomerUsernameEditJson) {
		return client.post(
			this.URLs.PRIVATE + "/sender",
			Helper.convertParams(data)
		);
	}

	private async updatePassword(data: CustomerPasswordEditJson) {}
	private async updateInfor(data: CustomerInforEditJson) {
		return client.put(
			this.URLs.PRIVATE + data.id + "/customer",
			Helper.convertParams(data)
		);
	}

	/////////////////////////////////////////////////////////////////////////////
	async quickCreate(data: CustomerQuickCreateJson) {
		return await client.post<{ customer_id: number }>(
			this.URLs.PUBLIC + "/register",
			data
		);
	}
}

export default CustomerRepo;
