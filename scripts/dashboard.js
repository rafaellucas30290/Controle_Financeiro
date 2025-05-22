// Gráfico de Rosca (Resumo Semanal)
const pieChart1 = new Chart(document.getElementById('pieChart1'), {
    type: 'doughnut',
    data: {
        labels: ['Alimentação', 'Transporte', 'Lazer', 'Contas'],
        datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: [
                '#4CAF50', // verde
                '#FF9800', // laranja
                '#2196F3', // azul
                '#E91E63'  // rosa
            ]
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 16,
                    boxHeight: 16
                }
            },
            title: {
                display: false
            }
        }
    }
});

// Gráfico de Rosca (Metas)
const metaPercent = 82; // valor aleatório para "Atingido"
const pieChart2 = new Chart(document.getElementById('pieChart2'), {
    type: 'doughnut',
    data: {
        labels: ['Atingido', 'Restante'],
        datasets: [{
            data: [metaPercent, 100 - metaPercent],
            backgroundColor: [
                '#00BCD4', // ciano
                '#FFC107'  // amarelo
            ]
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 16,
                    boxHeight: 16
                }
            },
            title: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        animation: {
            onComplete: function() {
                const chart = pieChart2;
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = 'bold 2.2rem Poppins, Arial';
                ctx.fillStyle = '#00BCD4';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(metaPercent + '%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
                ctx.restore();
            }
        }
    }
});

// Saldo Atual Aleatório
function gerarSaldoAleatorio(min, max) {
    const valor = Math.random() * (max - min) + min;
    return valor;
}

function formatarReal(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.addEventListener('DOMContentLoaded', function() {
    const saldo = gerarSaldoAleatorio(1000, 5000);
    document.getElementById('saldoAtual').textContent = formatarReal(saldo);
}); 