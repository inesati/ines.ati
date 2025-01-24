document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0; // Índice actual de la tarjeta visible
    const cards = document.querySelectorAll('.card');
    const cardContainer = document.querySelector('.card-container');
    const totalCards = cards.length;
    const visibleCards = 3; // Número de tarjetas visibles a la vez

    // Duplicamos las tarjetas y las agregamos al final para crear un efecto de bucle
    function duplicateCards() {
        // Duplicamos todas las tarjetas y las agregamos al final
        cards.forEach(card => {
            const clone = card.cloneNode(true); // Clona la tarjeta
            cardContainer.appendChild(clone); // Añade la tarjeta clonada
        });
    }

    duplicateCards(); // Llamamos a la función para duplicar las tarjetas

    // Muestra solo 3 tarjetas a la vez
    function updateGallery() {
        const offset = -currentIndex * (cards[0].offsetWidth + 15); // Ajusta el valor para mover las tarjetas
        cardContainer.style.transform = `translateX(${offset}px)`; // Desplaza las tarjetas

        // Si hemos llegado al final, reiniciamos el índice y movemos las tarjetas al principio
        if (currentIndex >= totalCards) {
            cardContainer.style.transition = 'none'; // Sin transición cuando reiniciamos
            currentIndex = 0;
            cardContainer.style.transform = `translateX(0)`; // Volver al principio
            setTimeout(() => {
                cardContainer.style.transition = 'transform 1s ease-in-out'; // Restaura la transición después de reiniciar
            }, 50);
        }
    }

    // Función para mover las tarjetas hacia la izquierda
    function moveLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    }

    // Función para mover las tarjetas hacia la derecha
    function moveRight() {
        if (currentIndex < totalCards) {
            currentIndex++;
            updateGallery();
        }
    }

    // Inicializa la galería para mostrar las primeras 3 tarjetas
    updateGallery();

    // Vincula las flechas a las funciones correspondientes
    document.querySelector('.arrow.left').addEventListener('click', moveLeft);
    document.querySelector('.arrow.right').addEventListener('click', moveRight);

    // ---- NUEVA FUNCIONALIDAD: Vista ampliada ----
    // Crea el contenedor de la vista ampliada dinámicamente
    const fullViewContainer = document.createElement('div');
    fullViewContainer.style.position = 'fixed';
    fullViewContainer.style.top = '0';
    fullViewContainer.style.left = '0';
    fullViewContainer.style.width = '100vw';
    fullViewContainer.style.height = '100vh';
    fullViewContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    fullViewContainer.style.display = 'none'; // Oculto inicialmente
    fullViewContainer.style.justifyContent = 'center';
    fullViewContainer.style.alignItems = 'center';
    fullViewContainer.style.zIndex = '1000';

    // Contenedor interno para la imagen y texto
    const fullViewContent = document.createElement('div');
    fullViewContent.style.position = 'relative';
    fullViewContent.style.textAlign = 'center';

    // Imagen ampliada
    const fullViewImage = document.createElement('img');
    fullViewImage.style.maxWidth = '50%';
    fullViewImage.style.maxHeight = '50%';
    fullViewImage.style.borderRadius = '10px';
    fullViewImage.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';

    // Título debajo de la imagen
    const fullViewText = document.createElement('p');
    fullViewText.style.color = '#fff';
    fullViewText.style.fontSize = '18px';
    fullViewText.style.marginTop = '15px';

    // Botón de cierre
    const closeButton = document.createElement('span');
    closeButton.textContent = '✖';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.color = '#fff';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';

    // Agregar elementos al contenedor principal
    fullViewContent.appendChild(fullViewImage);
    fullViewContent.appendChild(fullViewText);
    fullViewContent.appendChild(closeButton);
    fullViewContainer.appendChild(fullViewContent);
    document.body.appendChild(fullViewContainer);

    // Mostrar la vista ampliada
    function showFullView(imageSrc, text) {
        fullViewImage.src = imageSrc;
        fullViewText.textContent = text;
        fullViewContainer.style.display = 'flex';
    }

    // Cerrar la vista ampliada
    closeButton.addEventListener('click', function () {
        fullViewContainer.style.display = 'none';
    });

    // Vincula la funcionalidad de clic a cada tarjeta (incluyendo las clonadas)
    function addClickEventToCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach((card) => {
            card.addEventListener('click', () => {
                const image = card.querySelector('img');
                const text = card.querySelector('.card-info p') ? card.querySelector('.card-info p').textContent : '';
                showFullView(image.src, text);
            });
        });
    }

    // Llamar a la función de eventos para todas las tarjetas (incluidas las clonadas)
    addClickEventToCards();
});
