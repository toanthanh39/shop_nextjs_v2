import { BaseCollectionJson } from "./Base.type";
import { FileJson } from "./File.type";
import {
	StoryCollectionJson,
	TagStoryCollectionJson,
} from "./StoryCollection.type";

export type StoryJson = {
	id: number;
	company_id: number;
	creator_id: number;
	images: FileJson[];
	banner_desktop: FileJson[];
	banner_mobile: FileJson[];
	title: string;
	handle: string;
	keyword: string;
	present: string;
	content_type: string;
	description: string;
	quote: string;
	comment: string;
	comment_total: number;
	viewed: number;
	visitor: number;
	date_published: number;
	publish_from: number;
	publish_to: number;
	pin: number;
	status: number;
	type: number;
	web_id: number;
	date_created: number;
	date_modified: number;
	tags: TagStoryCollectionJson[];
	collections: CollectionsJson[];
	detail: string;
	parent_data: StoryCollectionJson[];
};

type CollectionsJson = {
	id: number;
	title: string;
	handle: string;
};

export type StoryFilter = {
	page: number;
	limit?: number;
	public_from?: number;
	public_to?: number;
	collection_id?: number | string;
	pin?: number;
	type?: number;
	not_id?: string;
	tags?: string;
};

export type StoryListJson = BaseCollectionJson<StoryJson>;
