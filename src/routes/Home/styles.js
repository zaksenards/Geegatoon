import { wndHeight, wndWidth } from "@src/constants";
import { StatusBar, StyleSheet } from "react-native";
import theme from "@src/theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.white.primary,
	},

	listContainer: {
		flex: 1,
		backgroundColor: theme.white.secondary,
		borderColor: theme.white.hintTextColor,
		borderWidth: 0.5,
		marginTop: StatusBar.currentHeight,
		paddingTop: wndHeight * 0.01,
	},
});

export default styles;
