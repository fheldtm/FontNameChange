const fs = require('fs');
const path = require('path');

// const fontLevel = [
// 	{ '100': 'Thin' },
// 	{ '200': 'Thin' },
// 	{ '300': 'Light' },
// 	{ '400': 'Regular' },
// 	{ 'regular': 'Regular' },
// 	{ '500': 'Medium' },
// 	{ '700': 'Bold' },
// 	{ '900': 'Black' }
// ]

const fontLevel = [
	{ '100': '100' },
	{ '200': '200' },
	{ '300': '300' },
	{ '400': '400' },
	{ 'regular': '400' },
	{ '500': '500' },
	{ '600': '600' },
	{ '700': '700' },
	{ '800': '800' },
	{ '900': '900' }
]

const fontType = ['eot', 'woff', 'woff2', 'svg', 'ttf', 'otf'];

const fontPath = path.join(__dirname, 'font');

const before_nm = process.argv[2];
const after_nm = process.argv[3];

let fontFamily = ''
let typeList = {};

for (let i = 0; i < fontLevel.length; i++) {
	const level = fontLevel[i];
	const key = Object.keys(level)[0];
	const value = level[key];
	for (let j = 0; j < fontType.length; j++) {
		const type = fontType[j];

		try {
			fs.renameSync(path.join(fontPath, `${before_nm}${key}.${type}`), path.join(fontPath, `${after_nm}${value}.${type}`))

			if (fontFamily === '') {
				fontFamily = after_nm;
			}

			if (typeList[value] === undefined) {
				typeList[value] = [type]
			} else {
				typeList[value].push(type)
			}
		}
		catch (err) {

		}
	}
}