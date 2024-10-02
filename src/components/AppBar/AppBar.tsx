import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, View } from "react-native";

import styles from "./styles";
import theme from "@src/theme";

type AppBarProps = {
	onQueryChange: (query: string) => void;
};

export default function AppBar(props: AppBarProps) {
	return (
		<View style={styles.conteiner}>
			<View style={styles.labelHolder}>
				<TextInput
					placeholder="Search"
					onChangeText={(text) => props.onQueryChange(text)}
					placeholderTextColor={theme.white.hintTextColor}
					style={styles.input}
				/>
			</View>
		</View>
	);
}
