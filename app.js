const fs = require('fs');
const path = require('path');

const fontLevel = [
	{ '100': 'Thin' },
	{ '200': 'Thin' },
	{ '300': 'Light' },
	{ '400': 'Regular' },
	{ 'regular': 'Regular' },
	{ '500': 'Medium' },
	{ '700': 'Bold' },
	{ '900': 'Black' }
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

const fontface = `
/* noto-sans-kr-100 - korean */
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 100;
  src: url('../fonts/noto-sans-kr-v25-korean-100.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('../fonts/noto-sans-kr-v25-korean-100.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../fonts/noto-sans-kr-v25-korean-100.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/noto-sans-kr-v25-korean-100.woff') format('woff'), /* Modern Browsers */
       url('../fonts/noto-sans-kr-v25-korean-100.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../fonts/noto-sans-kr-v25-korean-100.svg#NotoSansKR') format('svg'); /* Legacy iOS */
}
`

console.log('typeList:: ', typeList)