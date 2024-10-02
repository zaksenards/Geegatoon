import * as SecureStore from "expo-secure-store";
import { ContentType, Favorites } from "@src/Types";
import Database from "./database/database";
class UserInfo {
	private static m_singleton: UserInfo;
	private m_favorites: ContentType[] = [];
	private m_sql: Database | null = null;
	private m_searchHistory = [];

	constructor() {
		Database.getInstance().then((db) => {
			this.m_sql = db;
			db.selectFavorites().then((favorites) => {
				this.m_favorites = [];
				this.m_favorites.push(...favorites);
			});
		});
	}

	public static getInstance(): UserInfo {
		if (!this.m_singleton) this.m_singleton = new UserInfo();
		return this.m_singleton;
	}

	public static setFavorite(content: ContentType): void {
		let instance = this.getInstance();
		var contains = this.isFavorite(content);

		if (!contains) {
			instance.m_favorites.push(content);
			instance.m_sql?.insertFavorite(
				content.id.toString(),
				content.title,
				content.image
			);
		}
	}

	public static unsetFavorite(content: ContentType): void {
		let instance = this.getInstance();
		let favorites = instance.m_favorites;

		instance.m_favorites = favorites.filter((el) => {
			return el.id != content.id;
		});
	}

	public static getFavorites() {
		let instance = this.getInstance();
		return instance.m_favorites;
	}

	public static isFavorite(content: ContentType): boolean {
		let instance = this.getInstance();
		var _isFavorite = false;
		instance.m_favorites.forEach((element) => {
			if (element.id === content.id) _isFavorite = true;
		});
		return _isFavorite;
	}
}

export default UserInfo;
