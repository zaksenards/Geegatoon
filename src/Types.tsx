import { StyleProp, ViewStyle } from "react-native";

export type ContentType = {
	id: number;
	title: string;
	image: string;
};

export type EContentType = {
	id: number;
	title: string;
	image: string;
	genres: any;
	description: string;
};

export type DBFavorites = {
	id: number;
	title: string;
	image_path: string;
};

export type Favorites = {
	id: number;
	title: string;
	image: string;
};

export type ViewerProps = {
	route: any;
	navigation: any;
};

export type ListViewProp = {
	list: ContentType[];
	onItemClick: any;
	columns: number;
	style?: StyleProp<ViewStyle>;
	wrapperStyle?: StyleProp<ViewStyle>;
	render?: (props: any) => void | any;
};
