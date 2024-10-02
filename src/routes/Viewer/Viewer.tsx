import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContentType, EContentType, ViewerProps } from "@src/Types";
import { wndHeight, wndWidth } from "@src/constants";
import { fetchManhwaData } from "@api/MyAnimeList";
import { useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "@src/theme";
import ListView from "@components/ListView";
import UserInfo from "@src/UserInfo";

function GenreView(props: any) {
	const { item } = props;
	return (
		<View
			style={{
				marginHorizontal: 5,
				alignItems: "center",
				borderWidth: 0.5,
				padding: 5,
				borderColor: theme.white.tertiary,
				backgroundColor: theme.white.secondary,
				borderRadius: 60,
			}}
		>
			<Text>{item.title}</Text>
		</View>
	);
}

export default function Viewer({ route, navigation }: ViewerProps) {
	const [isFavorite, setIsFavorite] = useState(false);
	const [data, setData] = useState<EContentType>();
	let params: ContentType = route?.params;

	useEffect(() => {
		fetchManhwaData(params.id.toString()).then((_data) => {
			setData(_data[0]);
		});
	}, []);

	useEffect(() => {
		let result = UserInfo.isFavorite(params);
		setIsFavorite(result);
	}, []);

	const bookmark = () => {
		setIsFavorite((prev) => !prev);
		if (isFavorite) {
			UserInfo.unsetFavorite(params);
			return;
		}
		UserInfo.setFavorite(params);
	};

	const onItemClick = () => {};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{/* Content image */}
				<Image style={styles.image} source={{ uri: params.image }} />

				<View style={{ flexDirection: "column" }}>
					{/* Favorite button */}
					<TouchableOpacity
						style={{ alignSelf: "flex-end" }}
						onPress={() => bookmark()}
					>
						<Ionicons
							name={isFavorite ? "star" : "star-outline"}
							size={25}
							color={"orange"}
						/>
					</TouchableOpacity>
					<Text style={styles.title}>{params.title}</Text>
					<ListView
						columns={2}
						list={data?.genres}
						wrapperStyle={{ paddingVertical: 5 }}
						render={GenreView}
						style={{
							maxWidth: 0.4 * wndWidth,
							alignSelf: "center",
						}}
						onItemClick={onItemClick}
					/>
				</View>
			</View>

			{/* Main content description */}
			<Text style={styles.description}>{data?.description}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	image: {
		resizeMode: "stretch",
		width: 0.4 * wndWidth,
		height: 0.3 * wndHeight,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 0.1 * wndWidth,
		paddingHorizontal: 0.05 * wndWidth,
		marginTop: 0.05 * wndHeight,
	},

	title: {
		marginTop: 0.01 * wndHeight,
		width: 0.5 * wndWidth,
		fontSize: 20,
		textAlign: "center",
	},

	description: {
		marginHorizontal: 0.05 * wndWidth,
		marginVertical: 0.05 * wndHeight,
	},
});
