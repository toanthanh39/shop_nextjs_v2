import { LinkElement, Text } from "@/components/ui";
import { Card, CardContent, CardImage } from "@/components/ui/Card";
import { VideoJson } from "@/types/Video.type";

type Props = {
	video: VideoJson;
};
export default function YoutubeCard({ video }: Props) {
	return (
		<Card className="p-0">
			<CardImage
				src={video.video_thumbnails.maxres.url}
				height={165}
				width={300}
				alt={video.video_title}
				className="h-25 lg:h-[165px] object-cover"></CardImage>

			<CardContent>
				<LinkElement
					href={video.video_url + video.video_id}
					target="_blank"
					className="line-clamp-2 hover:text-yellow-500 transition-all">
					{video.video_title}
				</LinkElement>
				<Text.p size="sm">{video.video_view_count} Views</Text.p>
			</CardContent>
		</Card>
	);
}
