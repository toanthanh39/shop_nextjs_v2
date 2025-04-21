import { BaseCollectionJson } from "./Base.type";
import { Filter } from "./Filter.type";

export type VideoThumbnailItem = {
	url: string;
	width: number;
	height: number;
};

export type VideoThumbnail = {
	default: VideoThumbnailItem;
	medium: VideoThumbnailItem;
	high: VideoThumbnailItem;
	standard: VideoThumbnailItem;
	maxres: VideoThumbnailItem;
};

export type VideoJson = {
	video_id: string;
	video_url: string;
	channel_title: string;
	channel_id: string;
	video_title: string;
	video_description: string;
	video_published_at: number;
	video_thumbnails: VideoThumbnail;
	video_tags: string[];
	video_view_count: number;
	video_like_count: number;
};
export type VideoListJson = BaseCollectionJson<VideoJson>;

export type VideoResponseJson = {
	success: boolean;
	limit: number;
	data: VideoJson[];
};

export type VideoFilter = Filter & {
	order?: "date";
};
