class MovieSuggestion {
	constructor(data) {
		this.id = '';
		this.psId = data.psId;
		this.movieId = data.movieId;
	}
}

MovieSuggestionSchema = () => {
	const movie = {
		id: this.id,
		psId: this.psId,
		movieId: this.movieId
	};
	return movie;
};

module.exports = MovieSuggestion;
