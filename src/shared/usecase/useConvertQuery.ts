const useConvertQuery = () => {
	function objectToQueryParams(obj: { [key: string]: any }): string {
		return Object.keys(obj)
			.map(
				(key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
			)
			.join('&');
	}
	return { objectToQueryParams };
};

export default useConvertQuery;
