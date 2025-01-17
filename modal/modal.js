document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    
    const confirmationDialog = document.getElementById('confirmationDialog');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    let currentImageIndex = -1;
    const totalImages = 66;
    const images = [];

    // 画像ファイル名を動的に生成して挿入
    for (let i = 1; i <= totalImages; i++) {
        const img = createThumbnail(i);
        galleryGrid.appendChild(img);
        images.push(img);
    }

    // サムネイル画像を生成する関数
    function createThumbnail(index) {
        const img = document.createElement('img');
        const imageNumber = String(index).padStart(3, '0');  // 001, 002, ..., 066
        img.src = `images/thumbnails/image${imageNumber}.jpg`;  // サムネイル画像パス
        img.alt = `画像${imageNumber}`;  // アクセシビリティのためのalt属性
        img.dataset.fullImage = `images/image${imageNumber}.jpg`;  // フルサイズ画像パスをデータ属性に保存
        img.dataset.index = index - 1;  // 画像のインデックスを保存
        img.addEventListener('click', () => openModal(index - 1));
        return img;
    }

    // 画像をモーダルに表示する関数
    function openModal(index) {
        currentImageIndex = index;
        modal.style.display = 'flex';
        modalImage.classList.remove('fadeIn', 'slideInFromRight', 'slideInFromLeft');  // アニメーションクラスをリセット
        modalImage.src = images[currentImageIndex].dataset.fullImage;  // フルサイズ画像をモーダルに表示
        modalImage.classList.add('fadeIn');
    }

    // モーダルを閉じる関数
    function closeModalFunc() {
        modal.style.display = 'none';
    }

    // 次の画像を表示する関数
    function showNextImage() {
        const nextIndex = (currentImageIndex + 1) % totalImages;
        modalImage.classList.remove('fadeIn', 'slideInFromRight', 'slideInFromLeft');  // アニメーションクラスをリセット
        modalImage.src = images[nextIndex].dataset.fullImage;  // 先に画像を切り替える
        modalImage.classList.add('slideInFromRight');
        currentImageIndex = nextIndex;
    }

    // 前の画像を表示する関数
    function showPreviousImage() {
        const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        modalImage.classList.remove('fadeIn', 'slideInFromRight', 'slideInFromLeft');  // アニメーションクラスをリセット
        modalImage.src = images[prevIndex].dataset.fullImage;  // 先に画像を切り替える
        modalImage.classList.add('slideInFromLeft');
        currentImageIndex = prevIndex;
    }

    // モーダルを閉じるイベントを設定
    closeModal.addEventListener('click', closeModalFunc);

    // モーダル外をクリックしても閉じる
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // キーボードイベントで画像を切り替える
    window.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            switch (e.key) {
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'Escape':
                    closeModalFunc();
                    break;
                default:
                    break;
            }
        }
    });

    // 確認ダイアログの表示
    confirmationDialog.style.display = 'flex';

    // 「はい」ボタンをクリックしたとき
    yesButton.addEventListener('click', () => {
        confirmationDialog.style.display = 'none';
        startAnimations();
    });

    // 「いいえ」ボタンをクリックしたとき
    noButton.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    function startAnimations() {
        // ヒーローエリアのアニメーション
        gsap.from(".title-image", { duration: 2, opacity: 0, scale: 0.5, ease: "bounce.out" });
        gsap.from(".hero h1", { duration: 1, x: -200, opacity: 0, ease: "power2.out", delay: 0.5 });
        gsap.from("nav ul li", {
            duration: 1,
            y: -50,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 1
        });

        // ギャラリー画像のアニメーション
        gsap.to(".gallery-grid", { duration: 1.5, opacity: 1, ease: "power3.out" });
        gsap.to(".gallery-item", {
            duration: 1.5,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            stagger: 0.3,
            delay: 0.5
        });
    }
});
