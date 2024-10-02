import { wndHeight, wndWidth } from "@src/constants";
import { StatusBar, StyleSheet } from "react-native";

import theme from "@src/theme";

const styles = StyleSheet.create({
	conteiner: {
		marginHorizontal: 0.05 * wndWidth,
		alignItems: "center",
		flexDirection: "row",
		height: StatusBar.currentHeight,
	},

	labelHolder: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},

	input: {
		backgroundColor: theme.white.secondary,
		borderBlockColor: theme.white.tertiary,
		color: theme.white.textColor,
		width: wndWidth * 0.5,
		textAlign: "center",
		borderWidth: 0.5,
		borderRadius: 30,
		height: 0.04 * wndHeight,
	},
});

export default styles;
