document.addEventListener('DOMContentLoaded', () => {
    const burguerBt = document.querySelector('.burguerbutt');
    const burguerOp = document.querySelector('.burguer-options');
  
    burguerBt.addEventListener('click', (e) => {
      e.stopPropagation(); // Previene que el clic se propague al body
      burguerOp.classList.toggle('active');
    });
  
    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
      if (!burguerBt.contains(e.target) && !burguerOp.contains(e.target)) {
        burguerOp.classList.remove('active');
      }
    });
});