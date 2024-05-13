const useConvertQuery = () => {
	function objectToQueryParams(obj: { [key: string]: any }): string {
		return Object.keys(obj)
			.filter(
				(key) =>
					obj[key] !== null && obj[key] !== undefined && obj[key] !== 'default'
			)
			.map(
				(key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
			)
			.join('&');
	}
	return { objectToQueryParams };
};

export default useConvertQuery;
