import { ProductFilter } from "./Product.type";

export type SectionJson = {
	type: string;
	id: number;
	handle: string;
	title: string;
	title_more: string;
	link: string;
	link_more: string;
	from_time: number;
	to_time: number;
	dataSource?: SectionCollectionInfor;
	data?: any;
};

export type SectionCollectionInfor = {
	params: ProductFilter;
};

export type BannerHomeData = {
	id: number;
	image: string;
	image_mobile: string;
	title: string;
	link: string;
	width: number;
	height: number;
	alt: string;
	from_time?: number;
	to_time?: number;
};

export type BrandHomeData = {
	id: number;
	image: string;
	image_mobile: string;
	width: number;
	height: number;
	link: string;
	title: string;
	alt: string;
};

export type SectionCategoryJson = {
	id: number;
	image_desktop: string;
	image_mobile: string;
	width: number;
	link: string;
	title: string;
	alt: string;
	title_color: string;
};

export type AboutSettingJson = {
	nav: {
		icon: string;
		title: string;
	};
	body: {
		title: string;
		content: string[];
		btnLabel: string;
		btnLink: string;
	};
};
