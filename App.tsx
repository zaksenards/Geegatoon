import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import Home from "@routes/Home";
import Viewer from "@routes/Viewer";
import database from "@src/database";
import Favorites from "@routes/Favorites";
import UserInfo from "@src/UserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabView() {
	const homeTabBar = () => {
		return <Ionicons name="home" size={30} />;
	};

	const favoritesTabBar = () => {
		return <Ionicons name="heart" size={25} />;
	};

	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Home"
				options={{ tabBarIcon: homeTabBar }}
				component={Home}
			/>
			<Tab.Screen
				name="Favorites"
				options={{ tabBarIcon: favoritesTabBar }}
				component={Favorites}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	const defaultOptions: NativeStackNavigationOptions = {
		headerShown: false,
	};

	useEffect(() => {
		// Initialize the database
		database.getInstance().then(() => {
			UserInfo.getInstance();
		});
		console.log("Initializing database");
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={defaultOptions}
					name="HomeTab"
					component={TabView}
				/>

				<Stack.Screen
					options={defaultOptions}
					name="Viewer"
					component={Viewer}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
