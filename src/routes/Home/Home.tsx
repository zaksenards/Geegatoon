import ListView from "@components/ListView";
import { StatusBar, View } from "react-native";
import { useEffect, useState } from "react";

import AppBar from "@components/AppBar";
import theme from "@src/theme";
import styles from "./styles";
import { ContentType } from "@src/Types";

import { fetchManhwaFromList } from "@api/MyAnimeList";

export default function Home({ navigation }: { navigation: any }) {
	const [list, setList] = useState<ContentType[]>([]);
	const [query, setQuery] = useState("");

	const onClickItem = (data: ContentType) => {
		navigation.navigate("Viewer", data);
	};

	useEffect(() => {
		//FIXME: Search's result doesn't reset when query is deleted too quickly
		fetchManhwaFromList(query).then((query: ContentType[] | any) => {
			setList((prevState) => [...prevState, ...query]);
		});
		return setList([]);
	}, [query]);

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle={"dark-content"}
				backgroundColor={theme.white.primary}
			/>
			<AppBar onQueryChange={(text) => setQuery(text)} />

			<View style={styles.listContainer}>
				<ListView list={list} onItemClick={onClickItem} columns={3} />
			</View>
		</View>
	);
}
