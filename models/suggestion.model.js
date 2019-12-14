class MovieSuggestion {
	constructor(data) {
		this.id = '';
		this.psid = data.psid;
		this.movieId = data.movieId;
	}
}

MovieSuggestionSchema = () => {
	const movie = {
		id: this.id,
		psid: this.psid,
		movieId: this.movieId
	};
	return movie;
};

module.exports = MovieSuggestion;
