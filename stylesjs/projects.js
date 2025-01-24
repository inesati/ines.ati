document.addEventListener("DOMContentLoaded", () => {
    const timelineContainer = document.querySelector(".timeline-items");
    const timelineItems = document.querySelectorAll(".timeline-item");
  
    // Observador para detectar cuando la sección está visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Activa la animación de la línea
            timelineContainer.classList.add("animate-line");
  
            // Reinicia las animaciones de los proyectos
            timelineItems.forEach((item, index) => {
              item.classList.remove("visible"); // Reinicia la animación
              setTimeout(() => {
                item.classList.add("visible");
              }, index * 200); // Retraso escalonado
            });
          } else {
            // Elimina la animación cuando la sección deja de ser visible
            timelineContainer.classList.remove("animate-line");
            timelineItems.forEach((item) => item.classList.remove("visible"));
          }
        });
      },
      {
        threshold: 0.5, // El 50% de la sección debe ser visible para activarse
      }
    );
  
    observer.observe(timelineContainer);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll(".timeline-item");
  
    timelineItems.forEach((item) => {
      const content = item.querySelector(".timeline-content");
      const description = item.querySelector(".timeline-description");
  
      content.addEventListener("click", () => {
        // Cierra cualquier descripción abierta
        timelineItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
  
        // Alterna la visibilidad de la descripción actual
        item.classList.toggle("active");
      });
    });
  });
  