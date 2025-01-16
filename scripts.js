document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    // 画像ファイル名を動的に生成して挿入
    for (let i = 1; i <= 66; i++) {
        const img = document.createElement('img');
        const imageNumber = String(i).padStart(3, '0');  // 001, 002, ..., 066
        img.src = `thumbnails/image${imageNumber}.jpg`;  // サムネイル画像パス
        img.alt = `画像${imageNumber}`;  // アクセシビリティのためのalt属性
        img.dataset.fullImage = `images/image${imageNumber}.jpg`;  // フルサイズ画像パスをデータ属性に保存
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = img.dataset.fullImage;  // フルサイズ画像をモーダルに表示
        });
        galleryGrid.appendChild(img);
    }

    // モーダルを閉じるイベント
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // モーダル外をクリックしても閉じる
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
