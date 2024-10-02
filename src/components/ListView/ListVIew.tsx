import { wndHeight, wndWidth } from "@src/constants";
import { ContentType, ListViewProp } from "@src/Types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FlatList, Image } from "react-native";

export default function ListView(props: ListViewProp) {
	const contentRender = ({ item }: { item: ContentType }) => {
		return (
			<TouchableOpacity
				style={styles.contentContaiener}
				activeOpacity={0.7}
				onPress={() => props.onItemClick(item)}
			>
				<Image
					style={styles.contentImage}
					resizeMethod="resize"
					source={{ uri: item.image }}
				/>
				<Text numberOfLines={1} style={styles.contentTitle}>
					{item.title}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		// It works, but i dont like it
		<FlatList
			data={props.list}
			numColumns={props.columns}
			style={props?.style}
			columnWrapperStyle={
				props?.wrapperStyle ? props.wrapperStyle : styles.listWrapper
			}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => item.id.toString()}
			renderItem={props?.render ? props.render : contentRender}
		/>
	);
}

const styles = StyleSheet.create({
	contentContaiener: { alignItems: "center" },
	contentImage: {
		resizeMode: "contain",
		height: wndHeight * 0.23,
		width: wndWidth * 0.3,
	},

	listWrapper: {
		justifyContent: "space-evenly",
		marginVertical: 0.01 * wndHeight,
	},

	contentTitle: {
		color: "black",
		maxWidth: wndWidth * 0.3,
		textAlign: "center",
	},
});
