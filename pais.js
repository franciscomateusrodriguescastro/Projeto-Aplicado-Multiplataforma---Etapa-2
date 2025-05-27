function mostrarTurma(turma) {
    const infoTurma = document.getElementById("infoTurma");
    infoTurma.innerHTML = `<p><strong>Informações da Turma ${turma}:</strong> 25 alunos, Professores: Ana, Carlos, Marina.</p>`;
  }
  
  const ctx = document.getElementById('graficoAtividades').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Matemática', 'Português', 'História', 'Ciências'],
      datasets: [{
        label: 'Atividades Concluídas',
        data: [15, 18, 10, 13],
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
  