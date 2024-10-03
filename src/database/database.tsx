import { readAsStringAsync } from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import { ContentType, DBFavorites } from "@src/Types";

class Database {
	private m_sql: SQLite.SQLiteDatabase | null = null;
	static singleton: Database;

	/**
	 * 	Load and initialize the application's database
	 */
	private async loadSqlDatabase(): Promise<string> {
		const [{ localUri }] = await Asset.loadAsync(
			require("../sql/database.sql")
		);

		return new Promise((accept, reject) => {
			if (localUri) {
				readAsStringAsync(localUri).then((contents) => {
					accept(contents);
				});
				return;
			}
			reject("Can't load file");
		});
	}

	/**
	 * Return a singleton instance of the class
	 * @returns Database promise
	 */
	static async getInstance(): Promise<Database> {
		if (!this.singleton) {
			this.singleton = new Database();
			this.singleton.m_sql = await SQLite.openDatabaseAsync("geegatoon");
			const { m_sql } = this.singleton;

			this.singleton
				.loadSqlDatabase()
				.then((query) => {
					m_sql.execAsync(query);
				})
				.catch((err) => {
					console.log("loadSqlDatabase(): " + err);
					console.log("Executing minimal database query...");
					//TODO: Create the essencial tables here
				});
		}
		return this.singleton;
	}

	/**
	 * Save content in the database
	 * @param id: Content ID
	 * @param title: Content title
	 * @param image_path: Content image's path
	 */
	public async insertFavorite(id: string, title: string, image_path: string) {
		await this.m_sql?.runAsync(
			"INSERT INTO favorites(id, title, image_path) VALUES(?,?,?)",
			id,
			title,
			image_path
		);
	}

	/**
	 * Delete content from database
	 * @param id: Content id
	 */
	public async deleteFavorite(id: string) {
		await this.m_sql?.runAsync(`DELETE FROM favorites WHERE id=${id}`);
	}

	/**
	 * Retrieve all favorites from database
	 * @returns Content promise
	 */
	public async selectFavorites(): Promise<ContentType[]> {
		return new Promise(async (accept, reject) => {
			let result: DBFavorites[] | undefined;
			result = await this.m_sql?.getAllAsync("SELECT * FROM favorites");
			let data: ContentType[] = [];
			result?.map((e) => {
				data.push({ id: e.id, title: e.title, image: e.image_path });
			});
			accept(data);
		});
	}
}

export default Database;
