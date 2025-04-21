export type FileJson = {
	company_id: number;
	creator_id: number;
	md5_hash: string;
	file_path: string;
	width: number;
	height: number;
	randomcode: string;
	extension: string;
	size_in_byte: number;
	date_created: number;
	date_modified: number;
	url: string;
	status?: number;
	ip_address?: number;
};
