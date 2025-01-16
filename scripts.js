document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    let currentImageIndex = -1;
    const totalImages = 66;
    const images = [];

    // 画像ファイル名を動的に生成して挿入
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        const imageNumber = String(i).padStart(3, '0');  // 001, 002, ..., 066
        img.src = `thumbnails/image${imageNumber}.jpg`;  // サムネイル画像パス
        img.alt = `画像${imageNumber}`;  // アクセシビリティのためのalt属性
        img.dataset.fullImage = `images/image${imageNumber}.jpg`;  // フルサイズ画像パスをデータ属性に保存
        img.dataset.index = i - 1;  // 画像のインデックスを保存
        img.addEventListener('click', () => {
            currentImageIndex = i - 1;
            openModal(img.dataset.fullImage);
        });
        galleryGrid.appendChild(img);
        images.push(img);
    }

    // 画像をモーダルに表示する関数
    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImage.src = imageSrc;  // フルサイズ画像をモーダルに表示
        modalImage.classList.add('fadeIn');
        setTimeout(() => modalImage.classList.remove('fadeIn'), 500);
    }

    // モーダルを閉じる関数
    function closeModalFunc() {
        modal.style.display = 'none';
    }

    // 次の画像を表示する関数
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        openModal(images[currentImageIndex].dataset.fullImage);
    }

    // 前の画像を表示する関数
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        openModal(images[currentImageIndex].dataset.fullImage);
    }

    // モーダルを閉じるイベント
    closeModal.addEventListener('click', closeModalFunc);

    // モーダル外をクリックしても閉じる
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // キーボードイベントで画像を切り替える
    window.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'Escape') {
                closeModalFunc();
            }
        }
    });
});
