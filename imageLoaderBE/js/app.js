import firebase from 'firebase/app';
import 'firebase/storage';


/**upload(селектор инпута, {
 * 	multi: true                               // Возможность использовать несколько файлов
 * 	accept: ['.png', '.jpg', '.jpeg', '.gif'] // Типы файлов, которые можно загружать
* 	onUpload(files) {                         // Функция загрузки на Бек
			console.log('Files', files);
			// BackEnd
		}
 * }) */

document.addEventListener('DOMContentLoaded', () => {

	const element = (tag, classes = [], content) => {

		const node = document.createElement(tag);

		if (classes.length) node.classList.add(...classes);

		if (content) node.textContent = content;

		return node;

	}

	function noop() { };

	function upload(selector, options = {}) {
		let files = [];

		const onUpload = options.onUpload ?? noop
		const input = document.querySelector(selector)
		const preview = element('div', ['preview']);
		const open = element('button', ['btn'], 'Открыть');
		const upload = element('button', ['btn', 'btn--open'], 'Загрузить');
		upload.style.display = 'none';

		if (options.multi) input.setAttribute('multiple', true);
		if (options.accept && Array.isArray(options.accept)) input.setAttribute('accept', options.accept.join(','));

		input.insertAdjacentElement('afterend', preview);
		input.insertAdjacentElement('afterend', upload);
		input.insertAdjacentElement('afterend', open);

		const triggerInput = () => input.click();
		const changeHundler = event => {

			if (!event.target.files.length) return;

			files = Array.from(event.target.files);

			preview.innerHTML = '';
			upload.style.display = 'inline';


			files.forEach(file => {

				if (!file.type.match('image')) return;

				const reader = new FileReader();

				reader.onload = (e) => {
					const src = e.target.result;
					preview.insertAdjacentHTML('afterbegin', `
						<div class="preview-image">
							<div class="preview-remove" data-name="${file.name}">&times;</div>
							<img src="${src}" alt="${file.name}">
							<div class="preview-info">
								<span>${file.name}</span>
								<span>${file.size}</span>
							</div>
						</div>
					`)
				}

				reader.readAsDataURL(file);

			})

		}


		const removeHandler = event => {
			if (!event.target.dataset.name) return;

			const { name } = event.target.dataset;

			files = files.filter(file => file.name !== name);

			if (!files.length) upload.style.display = 'none';

			const block = document.querySelector(`[data-name="${name}"]`).closest('.preview-image');
			block.classList.add('removing');
			block.remove();
		}

		const clearPreview = (el) => {
			el.innerHTML = '<div class="preview-info-progress">40%</div>'
		}

		const uploadHandler = () => {
			preview.querySelectorAll('.preview-remove').forEach(e => e.remove());
			const previewInfo = preview.querySelectorAll('.preview-info');
			previewInfo.forEach(clearPreview);
			onUpload(files, previewInfo)
		}

		open.addEventListener('click', triggerInput);
		input.addEventListener('change', changeHundler);
		preview.addEventListener('click', removeHandler);
		upload.addEventListener('click', uploadHandler)


	}

	/***************************************************************************** */


	const firebaseConfig = {
		apiKey: "AIzaSyA7J_DlhTwjQqgjfsTMxeHqMUuJd0pl1_0",
		authDomain: "imageloaderbe.firebaseapp.com",
		projectId: "imageloaderbe",
		storageBucket: "imageloaderbe.appspot.com",
		messagingSenderId: "665101503690",
		appId: "1:665101503690:web:3164316ca6687cf2d2f833"
	};
	firebase.initializeApp(firebaseConfig);

	const storage = firebase.storage();
	console.log("~ storage", storage);

	upload('#load', {
		multi: true,
		accept: ['.png', '.jpg', '.jpeg', '.gif'],
		onUpload(files, blocks) {
			files.forEach((file, index) => {
				const ref = storage.ref(`images/${file.name}`);
				const task = ref.put(file)

				task.on('state_changed', snapshot => {
					const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
					const block = blocks[index].querySelector('.preview-info-progress');
					block.textContent = percentage + '%';

				}, error => {
					console.log("~ error", error);
				}, () => {
					task.snapshot.ref.getDownloadURL().then(url => {
						console.log("~ url", url);
					})
				})
			})
			// BackEnd
		}
	});

})
