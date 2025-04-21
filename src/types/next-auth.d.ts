import NextAuth, { Account, DefaultSession, User } from "next-auth";
declare module "next-auth" {
	interface Session {
		jwt: string;
		user: {
			company_id: number;
			id: number;
			full_name: string;
			screenname: string;
			avatar_file_id: number;
			avatar: {
				company_id: number;
				creator_id: number;
				id: number;
				directory_id: number;
				object_type: number;
				object_id: number;
				md5_hash: string;
				file_path: string;
				width: number;
				height: number;
				randomcode: string;
				title: string;
				description: string;
				extension: string;
				size_in_byte: number;
				origin: string;
				status: number;
				is_directory: number;
				ip_address: number;
				date_created: number;
				date_modified: number;
				url: string;
			};
			date_created: number;
			date_modified: number;
			date_last_login: number;
		};
		role: string;
		status: SUCCESS;
		company: {
			id: number;
			owner: number;
			name: string;
			screenname: string;
			domain: string;
			email: string;
			phone: string;
			region: number;
			status: number;
			kyc_status: number;
			quota: [];
			base_quota: {
				_base_: number;
				warehouse: number;
				store: number;
				office: number;
				worktrackingrangeperoffice: number;
				shippinghub: number;
				apikey: number;
				echannel: number;
				productcategory: number;
				shippingmerchant: number;
				product: number;
				productvariant: number;
				filedisk: number;
			};
			customer: {
				id: number;
				email: string;
				phone: string;
				status: number;
			};
			employee?: {
				id: number;
				kyc_status: number;
				name: string;
				owner: number;
				phone: string;
				quota: any[]; // Nếu bạn biết rõ kiểu dữ liệu trong mảng quota, hãy thay thế "any" bằng kiểu phù hợp.
				region: number;
				screenname: string;
				status: number;
				department_id: number;
			};
		};
	}

	interface JWT {
		jwt: string;
		user: {
			company_id: number;
			id: number;
			full_name: string;
			screenname: string;
			avatar_file_id: number;
			avatar: {
				company_id: number;
				creator_id: number;
				id: number;
				directory_id: number;
				object_type: number;
				object_id: number;
				md5_hash: string;
				file_path: string;
				width: number;
				height: number;
				randomcode: string;
				title: string;
				description: string;
				extension: string;
				size_in_byte: number;
				origin: string;
				status: number;
				is_directory: number;
				ip_address: number;
				date_created: number;
				date_modified: number;
				url: string;
			};
			date_created: number;
			date_modified: number;
			date_last_login: number;
		};
		role: string;
		status: SUCCESS;
		company: {
			id: number;
			owner: number;
			name: string;
			screenname: string;
			domain: string;
			email: string;
			phone: string;
			region: number;
			status: number;
			kyc_status: number;
			quota: [];
			base_quota: {
				_base_: number;
				warehouse: number;
				store: number;
				office: number;
				worktrackingrangeperoffice: number;
				shippinghub: number;
				apikey: number;
				echannel: number;
				productcategory: number;
				shippingmerchant: number;
				product: number;
				productvariant: number;
				filedisk: number;
			};
			customer: {
				id: number;
				email: string;
				phone: string;
				status: number;
			};
			employee?: {
				id: number;
				kyc_status: number;
				name: string;
				owner: number;
				phone: string;
				quota: any[]; // Nếu bạn biết rõ kiểu dữ liệu trong mảng quota, hãy thay thế "any" bằng kiểu phù hợp.
				region: number;
				screenname: string;
				status: number;
				department_id: number;
			};
		};
	}
}
