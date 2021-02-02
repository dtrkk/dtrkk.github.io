const seed = document.querySelector('.seed');
const btn = document.querySelector('.btn');
const textArea = document.querySelector('.textArea');
//*********************************************************************************************** */
const imgArticle = document.querySelector('#imgarticle');
document.querySelector('#main-article-img').addEventListener('click', function () {
	imgArticle.click();
})

imgArticle.addEventListener('change', function (f) {
	let files = f.target.files;
	let file = files[0];
	uploadMainArticleImg(file);
});

function uploadMainArticleImg(file) {

	if (file != undefined) {
		let reader = new FileReader();
		reader.onload = (function (file) {

			return function (e) {
				let img = new Image();
				img.src = e.target.result;
				img.onload = function () {
					draw(this);
					document.querySelector('#main-article-img').value = 'Ok';
					seed.focus();
				};
			};


		})(file);
		reader.readAsDataURL(file);
	}

}


//*********************************************************************************************** */


function draw(img) {
	btn.addEventListener('click', decrypt);
	document.querySelector('.button').addEventListener('click', decrypt);


	//**Get Pixel */

	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0, img.width, img.height);

	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;



	let res = [];																										//Массив пикселей

	for (var i = 0; i < data.length; i += 4) {
		let arr = [];
		arr.push(data[i]);
		arr.push(data[i + 1]);
		arr.push(data[i + 2]);
		res.push(arr);
	}

	//********************************************************************************decrypt */ 

	function decrypt(e) {
		e.preventDefault();

		textArea.value = '...'

		//*****************************************************************************Get SEED */

		function start() {

			let thisKey = seed.value;
			let keySeed = 1;
			for (let i = 0; i < thisKey.length - 1; i++) {
				if (thisKey[i].charCodeAt() == thisKey[i + 1].charCodeAt()) keySeed *= thisKey[i].charCodeAt() * 5
				else keySeed *= thisKey[i].charCodeAt() * (thisKey[i].charCodeAt() - thisKey[i + 1].charCodeAt())
			}
			return keySeed;

		}


		if (seed.value != 0) {

			let imageSize = canvas.width * canvas.height;
			let thisPix;																			//Свободный, рандомный пиксель из массива

			//***************************************************************************Random */

			function pseudoRandom(seed) {
				let value = seed;

				return function () {
					value = value * 16807 % 2147483647;
					return value;
				}
			}

			let generator = pseudoRandom(start());
			let pixs = [];                                      // Выбока номеров пикселей


			for (let i = 0; i < imageSize; i++) {

				//***********************************************************************Найти рандомные пиксели */
				thisPix = Math.abs(generator());

				if (thisPix < imageSize) thisPix = thisPix;
				else if (thisPix >= imageSize && thisPix <= imageSize * 10) thisPix = Math.round(thisPix * 0.1);
				else if (thisPix <= imageSize * 100) thisPix = Math.round(thisPix * 0.01);
				else if (thisPix <= imageSize * 1000) thisPix = Math.round(thisPix * 0.001);
				else if (thisPix <= imageSize * 10000) thisPix = Math.round(thisPix * 0.0001);
				else if (thisPix <= imageSize * 100000) thisPix = Math.round(thisPix * 0.00001);
				else alert('Поменяйте исходные данные');

				//******************************************************************** Проверка на использованый пиксель */

				let check = true;
				for (let k = 0; k < pixs.length; k++) {
					if (thisPix == pixs[k]) {
						check = false;
						i--;
						continue;
					}
				}

				if (check) {
					pixs.push(thisPix);
				}

				let bool = true;

				for (let i = 0; i < res[thisPix].length; i++) {
					let num = res[thisPix][i];

					if (i == 0) {
						if (num % 2 == 1) num = Math.ceil(num / 2) - 1
						else {
							bool = false
							break;
						}
						if (num % 2 == 0) num = num / 2
						else {
							bool = false
							break;
						}
						if (num % 2 == 0) continue;
						else {
							bool = false
							break;
						}
					}


					if (i == 1) {
						if (num % 2 == 1) num = Math.ceil(num / 2) - 1
						else {
							bool = false
							break;
						}
						if (num % 2 == 0) continue;
						else {
							bool = false
							break;
						}
					}

					if (i == 2) {
						if (num % 2 == 0) num = num / 2
						else {
							bool = false
							break;
						}
						if (num % 2 == 1) num = Math.ceil(num / 2) - 1
						else {
							bool = false
							break;
						}
						if (num % 2 == 0) continue;
						else {
							bool = false
							break;
						}
					}

				}

				if (bool) break;

			} // for

			let newPixs = [];					// Массив нового цвета в двоичную

			for (let i = 0; i < pixs.length; i++) {
				let arrNum = [];
				for (let k = 0; k < res[pixs[i]].length; k++) {
					let mass = [];
					let num = res[pixs[i]][k];

					while (num != 1 && num != 0) {
						if (num % 2 == 1) {
							num = Math.ceil(num / 2) - 1
							mass.unshift(1);
						}
						else {
							num = num / 2;
							mass.unshift(0);
						}
					}
					if (num == 1) mass.unshift(1);

					while (mass.length < 8) {
						mass.unshift(0);
					}
					arrNum.push(mass);
				}
				newPixs.push(arrNum);

			}
			//************************************************************************** Перевод в двоичную пикселя */ 


			/**************************************************************************************Get text */
			let allText = [];

			for (let i = 0; i < newPixs.length; i++) {
				let liter = [];
				for (let k = 0; k < newPixs[i].length; k++) {
					if (k == 0 || k == 2) {
						liter.push(newPixs[i][k][5])
						liter.push(newPixs[i][k][6])
						liter.push(newPixs[i][k][7])
					}
					else {
						liter.push(newPixs[i][k][6])
						liter.push(newPixs[i][k][7])

					}
				}
				allText.push(liter);
			}

			/****************************************************************************************Set text */

			textArea.value = '';
			for (let i = 0; i < allText.length - 1; i++) {
				let num = 0;
				let exp = 7;
				for (let k = 0; k < allText[i].length; k++) {
					num += allText[i][k] * Math.pow(2, exp);
					exp--;
				}

				if (num > 149) num += 890;

				textArea.value += String.fromCharCode(num);
			}

		} // if
	} // function decrypt() {}
} // function draw(img) {}

