function abrirModal(modal) {
  modal.classList.add('show');
  const input = modal.querySelector('input');
  if (input) input.focus();
}
function fecharModal(modal) {
  modal.classList.remove('show');
  const input = modal.querySelector('input');
  if (input) input.value = '';
}

const modalTurma = document.getElementById('modalTurma');
const btnNovaTurma = document.getElementById('btnNovaTurma');
const fecharModalTurma = document.getElementById('fecharModalTurma');
const criarTurmaBtn = document.getElementById('criarTurmaBtn');
const inputNovaTurma = document.getElementById('novaTurmaNome');
const listaTurmas = document.querySelector('.turmas-lista');

btnNovaTurma.addEventListener('click', () => abrirModal(modalTurma));
fecharModalTurma.addEventListener('click', () => fecharModal(modalTurma));
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal(modalTurma);
});
modalTurma.addEventListener('click', e => {
  if (e.target === modalTurma) fecharModal(modalTurma);
});
criarTurmaBtn.addEventListener('click', () => {
  const nome = inputNovaTurma.value.trim();
  if (nome.length < 2) {
    alert('Por favor, insira um nome válido para a turma.');
    inputNovaTurma.focus();
    return;
  }
  const li = document.createElement('li');
  li.textContent = nome + ' - 0 alunos';

  const spanIcones = document.createElement('span');
  const iconDetalhes = document.createElement('i');
  iconDetalhes.className = 'bi bi-box-arrow-in-right';
  iconDetalhes.title = 'Ver detalhes';

  const iconRemover = document.createElement('i');
  iconRemover.className = 'bi bi-trash btn-danger btn-remover';
  iconRemover.title = 'Remover turma';

  spanIcones.appendChild(iconDetalhes);
  spanIcones.appendChild(iconRemover);
  li.appendChild(spanIcones);

  listaTurmas.appendChild(li);
  fecharModal(modalTurma);
  inputNovaTurma.value = '';
});

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('btn-remover')) {
    const li = e.target.closest('li');
    if (li && confirm('Deseja realmente remover este item?')) {
      li.remove();
      atualizarGrafico();
    }
  }
});

const modalConteudo = document.getElementById('modalConteudo');
const btnNovoConteudo = document.getElementById('btnNovoConteudo');
const fecharModalConteudo = document.getElementById('fecharModalConteudo');
const criarConteudoBtn = document.getElementById('criarConteudoBtn');
const inputNovoConteudo = document.getElementById('novoConteudoTitulo');
const listaConteudos = document.querySelector('.conteudos-lista');

btnNovoConteudo.addEventListener('click', () => abrirModal(modalConteudo));
fecharModalConteudo.addEventListener('click', () => fecharModal(modalConteudo));
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal(modalConteudo);
});
modalConteudo.addEventListener('click', e => {
  if (e.target === modalConteudo) fecharModal(modalConteudo);
});
criarConteudoBtn.addEventListener('click', () => {
  const titulo = inputNovoConteudo.value.trim();
  if (titulo.length < 2) {
    alert('Por favor, insira um título válido.');
    inputNovoConteudo.focus();
    return;
  }
  const li = document.createElement('li');
  li.textContent = titulo;

  const span = document.createElement('span');
  const btnEditar = document.createElement('i');
  btnEditar.className = 'bi bi-pencil btn-editar';
  btnEditar.title = 'Editar conteúdo';

  const btnRemover = document.createElement('i');
  btnRemover.className = 'bi bi-trash btn-danger btn-remover';
  btnRemover.title = 'Remover conteúdo';

  span.appendChild(btnEditar);
  span.appendChild(btnRemover);
  li.appendChild(span);

  listaConteudos.appendChild(li);
  fecharModal(modalConteudo);
  inputNovoConteudo.value = '';
});

const modalEditarConteudo = document.getElementById('modalEditarConteudo');
const fecharModalEditarConteudo = document.getElementById('fecharModalEditarConteudo');
const salvarConteudoBtn = document.getElementById('salvarConteudoBtn');
const inputEditarConteudo = document.getElementById('editarConteudoTitulo');

let conteudoParaEditar = null;

fecharModalEditarConteudo.addEventListener('click', () => fecharModal(modalEditarConteudo));
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal(modalEditarConteudo);
});
modalEditarConteudo.addEventListener('click', e => {
  if (e.target === modalEditarConteudo) fecharModal(modalEditarConteudo);
});

document.body.addEventListener('click', e => {
  if (e.target.classList.contains('btn-editar')) {
    conteudoParaEditar = e.target.closest('li');
    inputEditarConteudo.value = conteudoParaEditar.firstChild.textContent.trim();
    abrirModal(modalEditarConteudo);
  }
});

salvarConteudoBtn.addEventListener('click', () => {
  const novoTitulo = inputEditarConteudo.value.trim();
  if (novoTitulo.length < 2) {
    alert('Por favor, insira um título válido.');
    inputEditarConteudo.focus();
    return;
  }
  conteudoParaEditar.firstChild.textContent = novoTitulo;
  fecharModal(modalEditarConteudo);
});

const modalQuiz = document.getElementById('modalQuiz');
const btnNovoQuiz = document.getElementById('btnNovoQuiz');
const fecharModalQuiz = document.getElementById('fecharModalQuiz');
const criarQuizBtn = document.getElementById('criarQuizBtn');
const inputNovoQuiz = document.getElementById('novoQuizTitulo');
const listaQuizzes = document.querySelector('.quizzes-lista');

btnNovoQuiz.addEventListener('click', () => abrirModal(modalQuiz));
fecharModalQuiz.addEventListener('click', () => fecharModal(modalQuiz));
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal(modalQuiz);
});
modalQuiz.addEventListener('click', e => {
  if (e.target === modalQuiz) fecharModal(modalQuiz);
});

criarQuizBtn.addEventListener('click', () => {
  const titulo = inputNovoQuiz.value.trim();
  if (titulo.length < 2) {
    alert('Por favor, insira um título válido para o quiz.');
    inputNovoQuiz.focus();
    return;
  }
  const li = document.createElement('li');
  li.textContent = titulo;

  const span = document.createElement('span');
  const iconeGrafico = document.createElement('i');
  iconeGrafico.className = 'bi bi-graph-up';
  iconeGrafico.title = 'Resultados';

  const iconeRemover = document.createElement('i');
  iconeRemover.className = 'bi bi-trash btn-danger btn-remover';
  iconeRemover.title = 'Remover quiz';

  span.appendChild(iconeGrafico);
  span.appendChild(iconeRemover);
  li.appendChild(span);

  listaQuizzes.appendChild(li);
  fecharModal(modalQuiz);
  inputNovoQuiz.value = '';
});

const ctx = document.getElementById('graficoAtividades').getContext('2d');

let grafico;

function atualizarGrafico() {
  const turmas = [...listaTurmas.children];
  const labels = turmas.map(li => li.firstChild.textContent.split(' - ')[0]);
  const dados = turmas.map(() => Math.floor(Math.random() * 50) + 10);

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Número de Atividades',
        data: dados,
        backgroundColor: 'rgba(33, 37, 41, 0.8)',
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, stepSize: 5 }
      }
    }
  });
}

atualizarGrafico();