// Array con los textos que se irán mostrando
const roles = ["Ines", " a Programmer"," a Software Engineer", " a Developer", " a Travel Photographer" , ];
let currentIndex = 0; // Indice para controlar qué rol mostrar
let currentText = ""; // Variable para el texto actual
let currentCharIndex = 0; // Índice de la letra actual en el rol
let typingSpeed = 150; // Velocidad de escritura
let deletingSpeed = 100; // Velocidad de borrado
let pauseTime = 1000; // Tiempo de espera antes de cambiar a la siguiente palabra

// Referencia al elemento donde se va a mostrar el texto
const roleElement = document.getElementById("role");

function typeRole() {
    const currentRole = roles[currentIndex]; // Obtener el rol actual

    // Escribir letra por letra
    currentText = currentRole.substring(0, currentCharIndex);
    roleElement.textContent = currentText;

    // Si no hemos terminado de escribir la palabra, seguir escribiendo
    if (currentCharIndex < currentRole.length) {
        currentCharIndex++;
        setTimeout(typeRole, typingSpeed);
    } else {
        // Si hemos terminado de escribir la palabra, esperar un poco y luego borrar
        setTimeout(deleteRole, pauseTime);
    }
}

function deleteRole() {
    const currentRole = roles[currentIndex];

    // Borrar letra por letra
    currentText = currentRole.substring(0, currentCharIndex);
    roleElement.textContent = currentText;

    // Si no hemos terminado de borrar la palabra, seguir borrando
    if (currentCharIndex > 0) {
        currentCharIndex--;
        setTimeout(deleteRole, deletingSpeed);
    } else {
        // Cuando terminamos de borrar, pasar al siguiente rol
        currentIndex = (currentIndex + 1) % roles.length;
        setTimeout(typeRole, pauseTime);
    }
}

// Iniciar el proceso de escritura
typeRole();


document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about");
    const aboutHeading = document.querySelector(".a1 h1"); // Selecciona el h1 de "About me"

    window.addEventListener("scroll", () => {
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight) {
            // Animación de toda la sección
            aboutSection.style.transition = "transform 1s ease-out, opacity 1s ease-out";
            aboutSection.style.transform = "translateY(0)";
            aboutSection.style.opacity = "1";

            // Animación específica para el h1
            aboutHeading.style.transition = "transform 1s ease-out 0.5s, opacity 1s ease-out 0.5s"; // Agrega un delay
            aboutHeading.style.transform = "translateX(0)";
            aboutHeading.style.opacity = "1";
        } else {
            // Restaurar estado inicial para la sección
            aboutSection.style.transform = "translateY(100px)";
            aboutSection.style.opacity = "0";

            // Restaurar estado inicial para el h1
            aboutHeading.style.transform = "translateX(-300px)";
            aboutHeading.style.opacity = "0";
        }
    });

    // Configuración inicial
    aboutSection.style.transform = "translateY(100px)";
    aboutSection.style.opacity = "0";

    aboutHeading.style.transform = "translateX(-300px)"; // Desplaza el h1 hacia la izquierda
    aboutHeading.style.opacity = "0"; // Hace el h1 invisible
});



