import { ContentType, EContentType } from "@src/Types";

const API_URL = "https://api.jikan.moe/v4";

function fetchData(queryUrl: string): Promise<ContentType[]> {
	return new Promise((resolve, reject) => {
		var content: ContentType[] = [];
		fetch(queryUrl)
			.then((raw) => raw.json())
			.then(({ data }) => {
				for (let i in data) {
					let n_data = {
						id: data[i].mal_id,
						title: data[i].titles[0].title,
						image: data[i].images.jpg.image_url,
					};
					content.push(n_data);
				}
				resolve(content);
			})
			.catch((err) => {
				console.log("Error in fetchData(): " + err);
			});
	});
}

function fetchDataComplete(queryUrl: string): Promise<EContentType[]> {
	return new Promise((resolve, reject) => {
		var content: EContentType[] = [];
		fetch(queryUrl)
			.then((raw) => raw.json())
			.then(({ data }) => {
				const index = 0;
				var genres: { id: any; title: any }[] = [];
				data["genres"]?.map((el: any) => {
					genres.push({ id: el.mal_id, title: el.name });
				});

				let n_data = {
					id: 0,
					title: data["titles"][0].title,
					image: data["images"].jpg.image_url,
					genres: genres,
					description: data["synopsis"],
				};
				content.push(n_data);
				resolve(content);
			})
			.catch((err) => {
				console.log("Error in fetchDataComplete(): " + err);
			});
	});
}

export function fetchManhwaList(): Promise<ContentType[]> {
	let queryUrl = `${API_URL}/manga?type=Manhwa`;
	return fetchData(queryUrl);
}

export function fetchManhwaFromList(query: string): Promise<ContentType[]> {
	let queryUrl = `${API_URL}/manga?type=Manhwa&q=${query}`;
	return fetchData(queryUrl);
}

export function fetchManhwaData(id: string) {
	let queryUrl = `${API_URL}/manga/${id}`;
	return fetchDataComplete(queryUrl);
}
