import { FileJson } from "./File.type";

export type TagStoryCollectionJson = {
	type: string;
	name: string;
	code: string;
	value: string;
	display_order: number;
};

export type StoryCollectionJson = {
	company_id: number;
	id: number;
	images: FileJson[];
	banner_desktop: FileJson;
	banner_mobile: FileJson;
	title: string;
	handle: string;
	description: string;
	creator_id: number;
	parent_id: number;
	display_order: number;
	date_published: number;
	publish_from: number;
	publish_to: number;
	pin: number;
	type: number;
	tags: TagStoryCollectionJson[];
	status: number;
	is_deleted: number;
	date_deleted: number;
	date_created: number;
	date_modified: number;
	total_story: number;
};
