//menu
export type HomeMenu = {
	link: string;
	name: string;
	is_event?: boolean;
	submenu?: {
		category: Category[];
		images: ImageDetail[];
	} | null;
	from_time?: number;
	to_time?: number;
	style: {
		color: string;
	};
	hide_in_page?: boolean;
};

type ImageDetail = {
	url: string;
	alt: string;
};

type Category = {
	id: number;
	type: string;
	details: TextDetail[];
};

type TextDetail = {
	link: string;
	title: string;
};

export type CommunicationJson = {
	title: string;
	action: string;
	link: string;
	image: string;
};
////////////////////////////////////////
