const parseText = (text : string, length = 300) : string[] => {
	const parseLength = length - 7;
	if (!text.length) {
		return [];
	}

	if (text.length <= length) {
		return [ text ];
	}


	let tmp = text.trim();
	let arr = [];
	while (tmp) {
		if (tmp.length <= parseLength) {
			arr.push(tmp);
			tmp = '';
			break;
		}
		
		let breakpoint = Math.max(tmp.substring(0, parseLength).lastIndexOf(' '), tmp.substring(0, parseLength).lastIndexOf("\n"));
		if (breakpoint < parseLength / 2) {
			breakpoint = parseLength;
		}
		arr.push(tmp.substring(0, breakpoint));
		tmp = tmp.substring(breakpoint + 1).trim();
	}

	if (arr.length > 99) {
		return [];
	} 

	return arr.map((el, index) => `${index + 1}/${arr.length}: ${el}`);
}

export default parseText;