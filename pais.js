const turmas = {
  "1A": {
    professores: ["Ana", "Carlos", "Marina", "Victoria"],
    atividades: {
      labels: ['Matemática', 'Português', 'História', 'Ciências'],
      dados: [15, 14, 16, 10]
    },
    alunos: {
      "Lucas Silva": {
        "Matemática": [8.0, 7.0, 10.0, 5.5],
        "Português": [7.5, 4.0, 8.5, 9.0],
        "História": [9.0, 9.5, 8.0],
        "Ciências": [7.0, 8.0, 5.5, 9.0]
      },
      "Maria Oliveira": {
        "Matemática": [5.0, 8.5, 6.5, 9.0],
        "Português": [9.0, 9.5, 7.0, 7.5],
        "História": [8.0, 7.5, 9.0, 7.0],
        "Ciências": [10.0, 9.0, 8.5, 7.0]
      },
      "Mariana Cardoso": {
        "Matemática": [7.0, 8.5, 6.5, 9.0],
        "Português": [6.0, 9.5, 8.0, 7.5],
        "História": [8.0, 7.5, 9.0, 7.0],
        "Ciências": [8.0, 9.0, 8.5, 7.0]
      },
      "Pedro Lucas": {
        "Matemática": [4.0, 8.5, 6.5, 9.0],
        "Português": [9.0, 9.5, 9.0, 7.5],
        "História": [8.0, 6.5, 9.0, 7.0],
        "Ciências": [10.0, 9.0, 8.5, 7.0]
      }
    }
  },
  "2B": {
    professores: ["Fernando", "Juliana"],
    atividades: {
      labels: ['Matemática', 'Português', 'História', 'Ciências'],
      dados: [15, 14, 16, 10]
    },
    alunos: {
      "João Pereira": {
        "Matemática": [8.0, 7.0, 8.0, 9.0],
        "Português": [8.5, 5.0, 7.5, 7.0],
        "História": [6.5, 6.5, 8.0, 9.0],
        "Ciências": [7.0, 7.5, 2.0, 9.0]
      },
      "Pedro Arthur": {
        "Matemática": [7.0, 7.5, 6.5, 9.0],
        "Português": [9.0, 9.5, 8.0, 7.5],
        "História": [8.0, 8.5, 9.0, 7.0],
        "Ciências": [10.0, 8.0, 8.5, 7.0]
      },
      "Anna leticia": {
        "Matemática": [7.0, 5.5, 6.5, 9.0],
        "Português": [9.0, 4.5, 8.0, 7.5],
        "História": [8.0, 7.5, 8.0, 7.0],
        "Ciências": [10.0, 9.0, 8.5, 7.0]
      },
      "Lucas Silveira": {
        "Matemática": [7.0, 7.5, 6.5, 9.0],
        "Português": [9.0, 9.5, 8.0, 7.5],
        "História": [8.0, 6.5, 9.0, 7.0],
        "Ciências": [10.0, 8.0, 8.5, 7.0]
      }
    }
  }
};

let graficoAtual = null;

function mostrarTurma(turma) {
  const infoTurma = document.getElementById("infoTurma");
  const turmaData = turmas[turma];

  let html = `<p><strong>Informações da Turma ${turma}:</strong> ${Object.keys(turmaData.alunos).length} alunos, Professores: ${turmaData.professores.join(", ")}.</p>`;
  html += `<h4>Alunos:</h4><ul>`;
  for (const aluno in turmaData.alunos) {
    html += `<li><button onclick="mostrarNotas('${turma}', '${aluno}')" class="btn btn-outline-primary btn-sm mb-1">${aluno}</button></li>`;
  }
  html += `</ul><div id="notasAluno"></div>`;

  infoTurma.innerHTML = html;

  atualizarGrafico(turmaData.atividades.labels, turmaData.atividades.dados);
}

function mostrarNotas(turma, aluno) {
  const alunoData = turmas[turma].alunos[aluno];
  let html = `<h5>Notas de ${aluno}:</h5><ul>`;
  for (const materia in alunoData) {
    const notas = alunoData[materia];
    const media = (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2);
    html += `<li><strong>${materia}:</strong> ${notas.join(", ")} → <em>Média:</em> ${media}</li>`;
  }
  html += `</ul>`;
  document.getElementById("notasAluno").innerHTML = html;
}

function atualizarGrafico(labels, dados) {
  const ctx = document.getElementById('graficoAtividades').getContext('2d');

  if (graficoAtual) {
    graficoAtual.destroy();
  }

  graficoAtual = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Atividades Concluídas',
        data: dados,
        backgroundColor: ['#36a2eb', '#4bc0c0', '#ffcd56', '#7ad17a']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
