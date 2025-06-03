const DOM = {
  modals: {
    turma: document.getElementById('modalTurma'),
    conteudo: document.getElementById('modalConteudo'),
    editarConteudo: document.getElementById('modalEditarConteudo'),
    quiz: document.getElementById('modalQuiz')
  },
  buttons: {
    novaTurma: document.getElementById('btnNovaTurma'),
    novoConteudo: document.getElementById('btnNovoConteudo'),
    novoQuiz: document.getElementById('btnNovoQuiz')
  },
  inputs: {
    novaTurma: document.getElementById('novaTurmaNome'),
    novoConteudo: document.getElementById('novoConteudoTitulo'),
    editarConteudo: document.getElementById('editarConteudoTitulo'),
    novoQuiz: document.getElementById('novoQuizTitulo')
  },
  lists: {
    turmas: document.querySelector('.turmas-lista'),
    conteudos: document.querySelector('.conteudos-lista'),
    quizzes: document.querySelector('.quizzes-lista')
  },
  grafico: document.getElementById('graficoAtividades')?.getContext('2d')
};

const state = {
  conteudoParaEditar: null,
  grafico: null,
  turmas: [],
  conteudos: [],
  quizzes: []
};

const Utils = {
  abrirModal: (modal) => {
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    const input = modal.querySelector('input');
    if (input) input.focus();
  },
  
  fecharModal: (modal) => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    const input = modal.querySelector('input');
    if (input) input.value = '';
  },
  
  validarInput: (input, minLength = 2) => {
    const valor = input.value.trim();
    if (valor.length < minLength) {
      input.focus();
      return false;
    }
    return valor;
  },
  
  mostrarToast: (mensagem, tipo = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }, 100);
  }
};

const Turmas = {
  init: () => {
    DOM.buttons.novaTurma.addEventListener('click', () => Utils.abrirModal(DOM.modals.turma));
    
    document.getElementById('fecharModalTurma').addEventListener('click', () => 
      Utils.fecharModal(DOM.modals.turma));
    
    document.getElementById('criarTurmaBtn').addEventListener('click', Turmas.criarTurma);
  },
  
  criarTurma: () => {
    const nome = Utils.validarInput(DOM.inputs.novaTurma);
    if (!nome) {
      Utils.mostrarToast('Por favor, insira um nome válido para a turma.', 'error');
      return;
    }
    
    const turma = {
      id: Date.now(),
      nome,
      alunos: 0,
      atividades: []
    };
    
    state.turmas.push(turma);
    Turmas.renderizarTurma(turma);
    Utils.fecharModal(DOM.modals.turma);
    Utils.mostrarToast(`Turma "${nome}" criada com sucesso!`);
    Graficos.atualizar();
  },
  
  renderizarTurma: (turma) => {
    const li = document.createElement('tr');
    li.innerHTML = `
      <td>
        <i class="bi bi-people-fill text-primary me-2"></i>
        <strong>${turma.nome}</strong>
      </td>
      <td>${turma.alunos} alunos</td>
      <td>${turma.atividades.length} atividades</td>
      <td><span class="badge bg-success">Ativa</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" title="Ver detalhes">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary me-1" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger btn-remover" title="Remover">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    
    DOM.lists.turmas.querySelector('tbody').appendChild(li);
  },
  
  removerTurma: (id) => {
    state.turmas = state.turmas.filter(t => t.id !== id);
    Graficos.atualizar();
  }
};

const Conteudos = {
  init: () => {
    DOM.buttons.novoConteudo.addEventListener('click', () => Utils.abrirModal(DOM.modals.conteudo));
    
    document.getElementById('fecharModalConteudo').addEventListener('click', () => 
      Utils.fecharModal(DOM.modals.conteudo));
    
    document.getElementById('criarConteudoBtn').addEventListener('click', Conteudos.criarConteudo);
    document.getElementById('fecharModalEditarConteudo').addEventListener('click', () => 
      Utils.fecharModal(DOM.modals.editarConteudo));
    
    document.getElementById('salvarConteudoBtn').addEventListener('click', Conteudos.salvarEdicao);
  },
  
  criarConteudo: () => {
    const titulo = Utils.validarInput(DOM.inputs.novoConteudo);
    if (!titulo) {
      Utils.mostrarToast('Por favor, insira um título válido.', 'error');
      return;
    }
    
    const conteudo = {
      id: Date.now(),
      titulo,
      data: new Date().toLocaleDateString(),
      turmas: []
    };
    
    state.conteudos.push(conteudo);
    Conteudos.renderizarConteudo(conteudo);
    Utils.fecharModal(DOM.modals.conteudo);
    Utils.mostrarToast(`Conteúdo "${titulo}" adicionado com sucesso!`);
  },
  
  renderizarConteudo: (conteudo) => {
    const div = document.createElement('div');
    div.className = 'col-md-6';
    div.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">${conteudo.titulo}</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-link text-muted" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item btn-editar" href="#"><i class="bi bi-pencil me-2"></i> Editar</a></li>
                <li><a class="dropdown-item" href="#"><i class="bi bi-share me-2"></i> Compartilhar</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger btn-remover" href="#"><i class="bi bi-trash me-2"></i> Excluir</a></li>
              </ul>
            </div>
          </div>
          <p class="card-text text-muted small">Descrição do conteúdo</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="badge bg-light text-dark"><i class="bi bi-people me-1"></i> 0 turmas</span>
            <span class="text-muted small">Criado: ${conteudo.data}</span>
          </div>
        </div>
      </div>
    `;
    
    DOM.lists.conteudos.appendChild(div);
  },
  
  prepararEdicao: (id) => {
    const conteudo = state.conteudos.find(c => c.id === id);
    if (!conteudo) return;
    
    state.conteudoParaEditar = conteudo;
    DOM.inputs.editarConteudo.value = conteudo.titulo;
    Utils.abrirModal(DOM.modals.editarConteudo);
  },
  
  salvarEdicao: () => {
    const novoTitulo = Utils.validarInput(DOM.inputs.editarConteudo);
    if (!novoTitulo || !state.conteudoParaEditar) {
      Utils.mostrarToast('Por favor, insira um título válido.', 'error');
      return;
    }
    
    state.conteudoParaEditar.titulo = novoTitulo;
    Utils.fecharModal(DOM.modals.editarConteudo);
    Utils.mostrarToast('Conteúdo atualizado com sucesso!');
    state.conteudoParaEditar = null;
  },
  
  removerConteudo: (id) => {
    state.conteudos = state.conteudos.filter(c => c.id !== id);
    Utils.mostrarToast('Conteúdo removido com sucesso!');
  }
};

const Quizzes = {
  init: () => {
    DOM.buttons.novoQuiz.addEventListener('click', () => Utils.abrirModal(DOM.modals.quiz));
    
    document.getElementById('fecharModalQuiz').addEventListener('click', () => 
      Utils.fecharModal(DOM.modals.quiz));
    
    document.getElementById('criarQuizBtn').addEventListener('click', Quizzes.criarQuiz);
  },
  
  criarQuiz: () => {
    const titulo = Utils.validarInput(DOM.inputs.novoQuiz);
    if (!titulo) {
      Utils.mostrarToast('Por favor, insira um título válido para o quiz.', 'error');
      return;
    }
    
    const quiz = {
      id: Date.now(),
      titulo,
      data: new Date().toLocaleDateString(),
      status: 'ativo',
      respostas: 0
    };
    
    state.quizzes.push(quiz);
    Quizzes.renderizarQuiz(quiz);
    Utils.fecharModal(DOM.modals.quiz);
    Utils.mostrarToast(`Quiz "${titulo}" criado com sucesso!`);
  },
  
  renderizarQuiz: (quiz) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <i class="bi bi-question-square-fill text-primary me-2"></i>
        <strong>${quiz.titulo}</strong>
      </td>
      <td>Turma A</td>
      <td>${quiz.data}</td>
      <td><span class="badge bg-success">${quiz.status}</span></td>
      <td>${quiz.respostas}/30</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" title="Resultados">
          <i class="bi bi-graph-up"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary me-1" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger btn-remover" title="Remover">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    
    DOM.lists.quizzes.querySelector('tbody').appendChild(tr);
  },
  
  removerQuiz: (id) => {
    state.quizzes = state.quizzes.filter(q => q.id !== id);
    Utils.mostrarToast('Quiz removido com sucesso!');
  }
};

const Graficos = {
  init: () => {
    if (!DOM.grafico) return;
    
    Graficos.atualizar();
  },
  
  atualizar: () => {
    if (!DOM.grafico) return;
    
    const labels = state.turmas.map(t => t.nome);
    const dados = state.turmas.map(t => t.atividades.length || Math.floor(Math.random() * 10));
    
    if (state.grafico) state.grafico.destroy();
    
    state.grafico = new Chart(DOM.grafico, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Atividades por Turma',
          data: dados,
          backgroundColor: 'rgba(30, 136, 229, 0.8)',
          borderColor: 'rgba(30, 136, 229, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
};

const Eventos = {
  init: () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Object.values(DOM.modals).forEach(modal => {
          if (modal.classList.contains('show')) Utils.fecharModal(modal);
        });
      }
    });
    
    Object.values(DOM.modals).forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) Utils.fecharModal(modal);
      });
    });
    
    document.body.addEventListener('click', (e) => {
      const btnRemover = e.target.closest('.btn-remover');
      const btnEditar = e.target.closest('.btn-editar');
      
      if (btnRemover) {
        const item = btnRemover.closest('tr, .card');
        if (item && confirm('Deseja realmente remover este item?')) {
          item.remove();
          Utils.mostrarToast('Item removido com sucesso!');
        }
      }
      
      if (btnEditar) {
        const titulo = btnEditar.closest('.card')?.querySelector('.card-title')?.textContent;
        if (titulo) {
          DOM.inputs.editarConteudo.value = titulo;
          Utils.abrirModal(DOM.modals.editarConteudo);
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Turmas.init();
  Conteudos.init();
  Quizzes.init();
  Graficos.init();
  Eventos.init();
  
  setTimeout(() => {
    state.turmas = [
      { id: 1, nome: 'Turma A - Matemática', alunos: 30, atividades: Array(5).fill({}) },
      { id: 2, nome: 'Turma B - Ciências', alunos: 25, atividades: Array(3).fill({}) }
    ];
    
    state.conteudos = [
      { id: 1, titulo: 'Aula 1 - Matemática', data: '15/06/2023', turmas: [1] },
      { id: 2, titulo: 'Aula 2 - Ciências', data: '10/06/2023', turmas: [2] }
    ];
    
    state.quizzes = [
      { id: 1, titulo: 'Quiz 1 - Português', data: '15/06/2023', status: 'ativo', respostas: 28 },
      { id: 2, titulo: 'Exercício - Geografia', data: '12/06/2023', status: 'correção', respostas: 22 }
    ];
    
    state.turmas.forEach(Turmas.renderizarTurma);
    state.conteudos.forEach(Conteudos.renderizarConteudo);
    state.quizzes.forEach(Quizzes.renderizarQuiz);
    Graficos.atualizar();
  }, 500);
});