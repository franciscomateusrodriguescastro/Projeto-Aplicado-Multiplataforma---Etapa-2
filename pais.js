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
      "Carla Mendes": {
  "Matemática": [8.0, 9.0, 9.5, 9.0],
  "Português": [7.5, 8.0, 8.5, 9.0],
  "História": [8.5, 9.0, 8.0, 9.5],
  "Ciências": [9.0, 8.5, 9.5, 8.0]
      },
      "Felipe Rocha": {
        "Matemática": [6.0, 7.5, 6.5, 7.0],
        "Português": [7.0, 6.5, 6.0, 7.5],
        "História": [6.5, 7.0, 7.5, 6.0],
        "Ciências": [7.0, 6.5, 6.0, 7.5]
      },
      "Ana Beatriz Souza": {
        "Matemática": [10.0, 9.5, 9.0, 10.0],
        "Português": [9.5, 10.0, 9.0, 9.5],
        "História": [9.5, 9.0, 10.0, 10.0],
        "Ciências": [10.0, 9.5, 9.5, 10.0]
      },
      "Rafael Lima": {
        "Matemática": [5.0, 6.5, 5.5, 6.0],
        "Português": [6.0, 5.5, 6.0, 6.5],
        "História": [5.5, 6.0, 5.0, 6.5],
        "Ciências": [6.0, 5.0, 6.5, 6.0]
      },
      "Isabela Ferreira": {
        "Matemática": [7.0, 8.0, 8.5, 7.5],
        "Português": [8.0, 7.5, 8.0, 8.5],
        "História": [7.5, 8.5, 8.0, 7.0],
        "Ciências": [8.5, 8.0, 7.5, 8.0]
      },
      "Thiago Ribeiro": {
        "Matemática": [6.0, 7.0, 7.5, 6.5],
        "Português": [7.0, 6.5, 7.5, 6.0],
        "História": [6.5, 6.0, 7.0, 7.5],
        "Ciências": [7.0, 6.5, 6.0, 7.5]
      }
    }
  },
  "2B": {
    professores: ["Fernando", "Juliana", "Caio", "Ana Luiza"],
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
            "João Pereira": {
        "Matemática": [8.0, 7.0, 8.0, 9.0],
        "Português": [8.5, 5.0, 7.5, 7.0],
        "História": [6.5, 6.5, 8.0, 9.0],
        "Ciências": [7.0, 7.5, 2.0, 9.0]
          },
          "Mariana Costa": {
            "Matemática": [7.5, 8.0, 6.0, 7.5],
            "Português": [8.0, 8.5, 9.0, 7.5],
            "História": [7.0, 6.5, 7.5, 8.0],
            "Ciências": [8.5, 9.0, 7.0, 8.0]
          },
          "Lucas Almeida": {
            "Matemática": [6.0, 5.5, 7.0, 6.5],
            "Português": [7.5, 6.0, 6.5, 7.0],
            "História": [5.0, 6.0, 6.5, 7.0],
            "Ciências": [6.5, 7.0, 6.5, 6.0]
          },
          "Vitória Nunes": {
            "Matemática": [9.0, 8.5, 9.5, 9.0],
            "Português": [9.5, 9.0, 8.5, 9.0],
            "História": [8.5, 9.0, 9.0, 9.5],
            "Ciências": [9.0, 8.5, 9.5, 8.5]
          },
          "Bruno Martins": {
            "Matemática": [4.5, 6.0, 5.5, 6.5],
            "Português": [6.0, 5.0, 6.5, 6.0],
            "História": [5.5, 6.0, 4.0, 5.0],
            "Ciências": [6.5, 5.0, 6.0, 5.5]
          },
          "Aline Xavier": {
          "Matemática": [7.5, 8.0, 7.0, 8.5],
          "Português": [8.0, 7.5, 7.0, 8.5],
          "História": [7.0, 6.5, 8.0, 7.5],
          "Ciências": [8.0, 8.5, 7.5, 8.0]
      },
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
        label: 'Atividades abaixo:',
        data: dados,
        backgroundColor: ['#36a2eb', '#4bc0c0', '#ffcd56', '#7ad17a']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
