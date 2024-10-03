import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, View } from "react-native";

import styles from "./styles";
import theme from "@src/theme";
import { useEffect, useMemo, useState } from "react";

let countdown: any = -1;
const miliseconds = 1000;

type AppBarProps = {
	onQueryChange: (query: string) => void;
};

export default function AppBar(props: AppBarProps) {
	const [query, setQuery] = useState<string>();

	return (
		<View style={styles.conteiner}>
			<View style={styles.labelHolder}>
				<TextInput
					placeholder="Search"
					onChangeText={(text) => {
						setQuery(text);

						clearInterval(countdown);
						countdown = setInterval(
							() => props.onQueryChange(text),
							miliseconds
						);
					}}
					placeholderTextColor={theme.white.hintTextColor}
					style={styles.input}
				/>
			</View>
		</View>
	);
}
