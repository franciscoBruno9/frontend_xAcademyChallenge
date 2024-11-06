import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, RadialLinearScale, RadarController, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-grafico-skills',
  standalone: true,
  template: `<canvas id="myRadarChart"></canvas>`,
  styleUrls: ['./grafico-skills.component.scss']
})
export class GraficoSkillsComponent implements AfterViewInit {
  @Input() playerData: any;

  constructor() {
    Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler, Tooltip, Legend);
  }

  ngAfterViewInit(): void {
    if (this.playerData) {
      this.createGraficoSkills();
    } else {
      console.log(this.playerData);
    }
  }

  createGraficoSkills() {
    const canvas = document.getElementById('myRadarChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const chartData: ChartData<'radar'> = {
        labels: [
          'Pace',
          'Shooting',
          'Passing',
          'Dribbling',
          'Defending',
          'Physical'
          
        ],
        datasets: [{
          label: this.playerData.long_name,
          data: [
            this.playerData.pace,
            this.playerData.shooting,
            this.playerData.passing,
            this.playerData.dribbling,
            this.playerData.defending,
            this.playerData.physic
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        }]
      };

      const chartOptions: ChartOptions<'radar'> = {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#333',
              font: {
                family: 'Arial',
                size: 10,
                weight: 'bold',
              },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleColor: '#aaa',
            bodyColor: '#aaa',
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              backdropColor: 'rgba(255, 255, 255,0)',
              color: '#555',
              font: {
                size: 10,
                weight: 'bold'
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.3)',
            },
            angleLines: {
              color: 'rgba(200, 200, 200, 0.5)',
            },
            pointLabels: {
              color: '#333',
              font: {
                family: 'Arial',
                size: 10,
                weight: 600
              },
            },
          }
        }
      };

      const config: ChartConfiguration<'radar'> = {
        type: 'radar',
        data: chartData,
        options: chartOptions
      };

      new Chart(ctx, config);
    } else {
      console.error("No se pudo obtener el contexto para graficar.");
    }
  }
}
