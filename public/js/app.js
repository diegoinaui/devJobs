document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.lista-conocimientos');

  if (skills) {
    skills.addEventListener('click', agregarSkills);
    skillsSeleccionados();
  }
});

const skills = new Set();
const agregarSkills = e => {
  if (e.target.tagName === 'LI') {
    if (skills.has(e.target.textContent)) {
      skills.delete(e.target.textContent);
      e.target.classList.remove('activo');
    } else {
      skills.add(e.target.textContent);
      e.target.classList.add('activo');
    }

    document.querySelector('#skills').value = [...skills];
  }
};

const skillsSeleccionados = () => {
  const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));

  seleccionadas.map(x => skills.add(x.textContent));

  document.querySelector('#skills').value = [...skills];
};