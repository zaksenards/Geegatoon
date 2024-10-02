import ListView from "@components/ListView";
import { useIsFocused } from "@react-navigation/native";
import { ContentType } from "@src/Types";
import UserInfo from "@src/UserInfo";
import { View } from "react-native";

export default function Favorites({ navigation }: { navigation: any }) {
	let list = UserInfo.getFavorites();

	/**
	 * This hook is used to re-render the view once the focus state changes
	 */
	let isFocused = useIsFocused();

	const onClickItem = (data: ContentType) => {
		navigation.navigate("Viewer", data);
	};

	return isFocused ? (
		<View>
			<ListView list={list} columns={3} onItemClick={onClickItem} />
		</View>
	) : (
		<></>
	);
}
