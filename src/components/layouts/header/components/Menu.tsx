import { SettingConst } from "@/common/constants/setting";
import NavLink from "@/components/composite/NavLink";
import CustomImage from "@/components/ui/CustomImage";
import Flex from "@/components/ui/Flex";
import Grid from "@/components/ui/Grid";
import Heading from "@/components/ui/Heading";
import LinkElement from "@/components/ui/Link";
import SettingRepo from "@/services/api/repositories/SettingRepo";
import { HomeMenu } from "@/types/Header.type";
import { checkActiveDate, cn } from "@/utils/utils";

async function getDataServer() {
	const data = await new SettingRepo().getOne<HomeMenu[]>(
		SettingConst.menu.menu_home
	);

	return data;
}
export default async function Menu() {
	const { value: menus } = await getDataServer();
	const { time_server } = await new SettingRepo().getTimeServer();
	return (
		<nav
			className="container py-2 lg:py-4 relative max-md:container-padding overflow-x-auto md:overflow-x-visible hide-scroll-bar"
			aria-label="Main Navigation">
			<ul className="flex gap-4 md:gap-0 flex-nowrap whitespace-nowrap md:whitespace-normal relative">
				{menus.map((item, index) => {
					const show = checkActiveDate(
						time_server,
						item.from_time ?? 0,
						item.to_time ?? 0
					);
					const isEventLink = !!item.is_event;
					const isSubmenu = !!item?.submenu;

					if (!show) return null;
					return (
						<li key={index} className="flex-auto inline-block group">
							<NavLink
								variant={isEventLink ? "primary" : "default"}
								weight={isEventLink ? "bold" : "default"}
								href={item.link}
								prefetch={true}>
								{item.name}
							</NavLink>
							{isSubmenu && (
								<SubMenu key={index} submenu={item.submenu}></SubMenu>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

const SubMenu = ({ submenu }: { submenu: HomeMenu["submenu"] }) => {
	return (
		<Flex
			justify="between"
			align={"start"}
			gap={4}
			className="absolute top-full hidden left-0 w-full h-max z-10 p-9  group-hover:flex bg-white shadow-lg  ">
			<Grid cols={3} gap={2} className="flex-1 basis-1/2">
				{submenu?.category.map((sub, index) => {
					return (
						<div
							className={cn("col-span-1", {
								"col-span-2": index > 0,
							})}
							key={sub.id}>
							<Heading weight="bold" level={3} size="h5" className="mb-2">
								{sub.type}
							</Heading>
							<ul
								className={cn("", {
									"grid grid-cols-2 gap-2": index > 0,
								})}>
								{sub.details.map((subLink, index) => {
									return (
										<li key={index}>
											<LinkElement href={subLink.link}>
												{subLink.title}
											</LinkElement>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</Grid>
			<Grid cols={3} className="flex-1 basis-1/2" gap={16}>
				{submenu?.images.map((img, index) => {
					return (
						<div key={index} className="col-span-1 relative">
							<CustomImage
								key={index}
								src={img.url}
								alt={img.alt}
								width={162}
								height={162}
								loading="lazy"
								// className="max-w-[162px]"
								layout="responsive"
							/>
						</div>
					);
				})}
			</Grid>

			{/* <Flex
				className="basis-1/2"
				direction="row"
				gap={16}
				align="start"
				justify="end">
				{submenu?.images.map((img, index) => {
					return (
						<CustomImage
							key={index}
							src={img.url}
							alt={img.alt}
							width={162}
							height={162}
							loading="lazy"
							className="max-w-[162px]"
							layout="responsive"
						/>
					);
				})}
			</Flex> */}
		</Flex>
	);
};
