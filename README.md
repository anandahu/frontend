��#   f r o n t e n d 
 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Sentiment Analysis Dashboard</title>
  <style>
    :root {
      --bg-dark: #171731;
      --bg-card: #1e1e3f;
      --text-light: #f8f8f8;
      --positive: #4caf50;
      --neutral: #3f88c5;
      --negative: #e91e63;
      --warning: #ff9800;
      --border-radius: 8px;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background-color: var(--bg-dark);
      color: var(--text-light);
      padding: 20px;
    }
    
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto auto auto auto;
      gap: 20px;
    }
    
    .card {
      background-color: var(--bg-card);
      border-radius: var(--border-radius);
      padding: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .card-title {
      font-size: 16px;
      font-weight: 500;
    }
    
    .card-legend {
      display: flex;
      gap: 16px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
    }
    
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    
    .positive { background-color: var(--positive); }
    .neutral { background-color: var(--neutral); }
    .negative { background-color: var(--negative); }
    .warning { background-color: var(--warning); }
    
    .map-container {
      grid-column: span 3;
      height: 240px;
      position: relative;
      overflow: hidden;
    }
    
    .map-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .world-map {
      position: relative;
      height: 100%;
    }
    
    .metrics-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column: span 3;
      gap: 20px;
    }
    
    .chart-container {
      height: 220px;
      position: relative;
    }
    
    .mini-chart-container {
      height: 150px;
      position: relative;
    }
    
    .line-chart, .pie-chart, .bar-chart, .radar-chart, .bubble-chart {
      height: 100%;
      width: 100%;
    }
    
    .word-cloud {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .word {
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 12px;
    }
    
    .summary-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    
    .progress-label {
      min-width: 60px;
      font-size: 14px;
    }
    
    .progress-bar {
      flex: 1;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-value {
      height: 100%;
      border-radius: 4px;
    }
    
    .sentiment-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    
    .sentiment-table th,
    .sentiment-table td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .sentiment-table th {
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .sentiment-positive { color: var(--positive); }
    .sentiment-neutral { color: var(--neutral); }
    .sentiment-negative { color: var(--negative); }
    
    .dashboard-header {
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .dashboard-title {
      font-size: 24px;
      font-weight: 500;
    }
    
    .dashboard-actions {
      display: flex;
      gap: 12px;
    }
    
    .date-selector {
      background-color: var(--bg-card);
      border: none;
      color: var(--text-light);
      padding: 8px 12px;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    
    .stats-container {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
    
    .stat-box {
      flex: 1;
      text-align: center;
      padding: 12px;
      border-radius: var(--border-radius);
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .stat-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .kpi-card {
      grid-column: span 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .kpi-value {
      font-size: 36px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .kpi-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
    }
    
    .trend-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      margin-top: 8px;
    }
    
    .trend-up {
      color: var(--positive);
    }
    
    .trend-down {
      color: var(--negative);
    }
    
    .filter-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .filter-button {
      background-color: var(--bg-card);
      border: none;
      color: var(--text-light);
      padding: 8px 16px;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .filter-button.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .tooltip {
      position: absolute;
      padding: 8px 12px;
      background-color: rgba(0, 0, 0, 0.75);
      color: white;
      border-radius: 4px;
      pointer-events: none;
      z-index: 10;
      font-size: 12px;
      display: none;
    }
  </style>
</head>
<body>
  <div class="dashboard-header">
    <h1 class="dashboard-title">Advanced Sentiment Analysis Dashboard</h1>
    <div class="dashboard-actions">
      <select class="date-selector" id="date-range">
        <option value="day">Last 24 hours</option>
        <option value="week" selected>Last 7 days</option>
        <option value="month">Last 30 days</option>
        <option value="quarter">Last Quarter</option>
      </select>
    </div>
  </div>

  <div class="filter-bar">
    <button class="filter-button active" data-filter="all">All Departments</button>
    <button class="filter-button" data-filter="marketing">Marketing</button>
    <button class="filter-button" data-filter="sales">Sales</button>
    <button class="filter-button" data-filter="support">Customer Support</button>
    <button class="filter-button" data-filter="product">Product</button>
  </div>

  <div class="dashboard">
    <!-- KPI Overview -->
    <div class="card kpi-card">
      <div class="kpi-value sentiment-positive">78.4%</div>
      <div class="kpi-label">Overall Satisfaction</div>
      <div class="trend-indicator trend-up">
        <span>↑ 3.2%</span>
        <span>vs previous period</span>
      </div>
    </div>
    
    <div class="card kpi-card">
      <div class="kpi-value">23,487</div>
      <div class="kpi-label">Total Mentions</div>
      <div class="trend-indicator trend-up">
        <span>↑ 12.5%</span>
        <span>vs previous period</span>
      </div>
    </div>
    
    <div class="card kpi-card">
      <div class="kpi-value sentiment-negative">4.8%</div>
      <div class="kpi-label">Critical Issues</div>
      <div class="trend-indicator trend-down">
        <span>↓ 1.3%</span>
        <span>vs previous period</span>
      </div>
    </div>
    
    <!-- World Map Section -->
    <div class="card map-container">
      <div class="card-header">
        <h2 class="card-title">Global Sentiment Distribution</h2>
      </div>
      <div class="world-map">
        <img src="/api/placeholder/1160/240" alt="World sentiment map" class="map-img">
      </div>
    </div>
    
    <!-- Sentiment Distribution Pie Chart -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Sentiment Distribution</h2>
      </div>
      <div class="chart-container">
        <canvas class="pie-chart" id="sentiment-distribution"></canvas>
      </div>
      <div class="stats-container">
        <div class="stat-box">
          <div class="stat-value sentiment-positive">65%</div>
          <div class="stat-label">Positive</div>
        </div>
        <div class="stat-box">
          <div class="stat-value sentiment-neutral">20%</div>
          <div class="stat-label">Neutral</div>
        </div>
        <div class="stat-box">
          <div class="stat-value sentiment-negative">15%</div>
          <div class="stat-label">Negative</div>
        </div>
      </div>
    </div>
    
    <!-- Tweet Overtime Line Chart -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Tweet Overtime</h2>
        <div class="card-legend">
          <div class="legend-item">
            <div class="legend-color positive"></div>
            <span>Positive</span>
          </div>
          <div class="legend-item">
            <div class="legend-color neutral"></div>
            <span>Neutral</span>
          </div>
          <div class="legend-item">
            <div class="legend-color negative"></div>
            <span>Negative</span>
          </div>
        </div>
      </div>
      <div class="chart-container">
        <canvas class="line-chart" id="tweet-overtime"></canvas>
      </div>
    </div>
    
    <!-- Topic Ratio Chart -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Topic Distribution</h2>
      </div>
      <div class="chart-container">
        <canvas class="bar-chart" id="topic-distribution"></canvas>
      </div>
    </div>
    
    <!-- Positive Words Bar Chart -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Top Positive Keywords</h2>
      </div>
      <div class="chart-container">
        <canvas class="bar-chart" id="positive-words"></canvas>
      </div>
    </div>
    
    <!-- Negative Words Bar Chart -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Top Negative Keywords</h2>
      </div>
      <div class="chart-container">
        <canvas class="bar-chart" id="negative-words"></canvas>
      </div>
    </div>
    
    <!-- Word Cloud -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Word Cloud</h2>
      </div>
      <div class="word-cloud">
        <span class="word" style="background-color: rgba(76, 175, 80, 0.2); color: var(--positive); font-size: 18px;">Innovative</span>
        <span class="word" style="background-color: rgba(76, 175, 80, 0.2); color: var(--positive); font-size: 14px;">Future</span>
        <span class="word" style="background-color: rgba(233, 30, 99, 0.2); color: var(--negative); font-size: 16px;">Problem</span>
        <span class="word" style="background-color: rgba(76, 175, 80, 0.2); color: var(--positive); font-size: 20px;">Amazing</span>
        <span class="word" style="background-color: rgba(63, 136, 197, 0.2); color: var(--neutral); font-size: 12px;">Service</span>
        <span class="word" style="background-color: rgba(76, 175, 80, 0.2); color: var(--positive); font-size: 16px;">Brilliant</span>
        <span class="word" style="background-color: rgba(233, 30, 99, 0.2); color: var(--negative); font-size: 14px;">Terrible</span>
        <span class="word" style="background-color: rgba(63, 136, 197, 0.2); color: var(--neutral); font-size: 18px;">Think</span>
        <span class="word" style="background-color: rgba(76, 175, 80, 0.2); color: var(--positive); font-size: 22px;">Quality</span>
        <span class="word" style="background-color: rgba(233, 30, 99, 0.2); color: var(--negative); font-size: 15px;">Delay</span>
        <span class="word" style="background-color: rgba(76, 175, 80, 0.2); color: var(--positive); font-size: 17px;">Efficient</span>
        <span class="word" style="background-color: rgba(63, 136, 197, 0.2); color: var(--neutral); font-size: 16px;">Product</span>
      </div>
    </div>
    
    <!-- Channel Performance -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Channel Performance</h2>
      </div>
      <div class="chart-container">
        <canvas class="radar-chart" id="channel-performance"></canvas>
      </div>
    </div>
    
    <!-- Sentiment Over Time By Platform -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Sentiment by Platform</h2>
      </div>
      <div class="chart-container">
        <canvas class="bar-chart" id="platform-sentiment"></canvas>
      </div>
    </div>
    
    <!-- Correlation Matrix -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Sentiment Impact Analysis</h2>
      </div>
      <div class="chart-container">
        <canvas class="bubble-chart" id="impact-analysis"></canvas>
      </div>
    </div>
    
    <!-- Sentiment Tables -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title sentiment-positive">Positive Sentiment</h2>
      </div>
      <table class="sentiment-table">
        <thead>
          <tr>
            <th>Hashtag</th>
            <th>Keyword</th>
            <th>Mentions</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>450</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>350</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>250</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>220</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h2 class="card-title sentiment-neutral">Neutral Sentiment</h2>
      </div>
      <table class="sentiment-table">
        <thead>
          <tr>
            <th>Hashtag</th>
            <th>Keyword</th>
            <th>Mentions</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>400</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>350</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>250</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>220</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h2 class="card-title sentiment-negative">Negative Sentiment</h2>
      </div>
      <table class="sentiment-table">
        <thead>
          <tr>
            <th>Hashtag</th>
            <th>Keyword</th>
            <th>Mentions</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>450</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>350</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>250</td>
          </tr>
          <tr>
            <td>#trending</td>
            <td>Market solution technology</td>
            <td>Marketing</td>
            <td>220</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
  <script>
    // Create the tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    // Common Chart.js Options
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
      },
      scales: {
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    };
    
    // Line Chart for Tweet Overtime
    const createLineChart = () => {
      const ctx = document.getElementById('tweet-overtime').getContext('2d');
      
      const labels = ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
      
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Positive',
            data: [20, 25, 18, 30, 40, 35, 25, 37, 32, 28],
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Neutral',
            data: [15, 20, 25, 22, 18, 25, 30, 25, 20, 18],
            borderColor: '#3f88c5',
            backgroundColor: 'rgba(63, 136, 197, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Negative',
            data: [10, 12, 8, 15, 18, 14, 16, 12, 10, 15],
            borderColor: '#e91e63',
            backgroundColor: 'rgba(233, 30, 99, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      };
      
      const config = {
        type: 'line',
        data: data,
        options: {
          ...commonOptions,
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {
            point: {
              radius: 3
            }
          }
        }
      };
      
      return new Chart(ctx, config);
    };
    
    // Pie Chart for Sentiment Distribution
    const createPieChart = () => {
      const ctx = document.getElementById('sentiment-distribution').getContext('2d');
      
      const data = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
          data: [65, 20, 15],
          backgroundColor: [
            '#4caf50',
            '#3f88c5',
            '#e91e63'
          ],
          borderWidth: 0
        }]
      };
      
      const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }
          },
          cutout: '65%',
          borderRadius: 4
        }
      };
      
      return new Chart(ctx, config);
    };
    
    // Bar Chart for Top Positive Words
    const createPositiveWordsChart = () => {
      const ctx = document.getElementById('positive-words').getContext('2d');
      
      const data = {
        labels: ['Amazing', 'Quality', 'Excellent', 'Innovative', 'Helpful', 'Best'],
        datasets: [{
          label: 'Frequency',
          data: [250, 230, 200, 180, 150, 120],
          backgroundColor: 'rgba(76, 175, 80, 0.7)',
          borderColor: '#4caf50',
          borderWidth: 1,
          borderRadius: 4
        }]
      };
      
      const config = {
        type: 'bar',
        data: data,
        options: {
          ...commonOptions,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };
      
      return new Chart(ctx, config);
    };
    
    // Bar Chart for Top Negative Words
    const createNegativeWordsChart = () => {
      const ctx = document.getElementById('negative-words').getContext('2d');
      
      const data = {
        labels: ['Problem', 'Terrible', 'Delay', 'Slow', 'Broken', 'Issue'],
        datasets: [{
          label: 'Frequency',
          data: [180, 150, 140, 130, 120, 100],
          backgroundColor: 'rgba(233, 30, 99, 0.7)',
          borderColor: '#e91e63',
          borderWidth: 1,
          borderRadius: 4
        }]
      };
      
      const config = {
        type: 'bar',
        data: data,
        options: {
          ...commonOptions,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };
      
      return new Chart(ctx, config);
    };
    
    // Bar Chart for Topic Distribution
    const createTopicDistributionChart = () => {
      const ctx = document.getElementById('topic-distribution').getContext('2d');
      
      const data = {
        labels: ['Product Features', 'Customer Service', 'Pricing', 'User Experience', 'Performance', 'Reliability'],
        datasets: [
          {
            label: 'Positive',
            data: [65, 70, 45, 60, 55, 75],
            backgroundColor: 'rgba(76, 175, 80, 0.7)',
            stack: 'Stack 0',
            borderRadius: 4
          },
          {
            label: 'Neutral',
            data: [20, 15, 30, 25, 25, 15],
            backgroundColor: 'rgba(63, 136, 197, 0.7)',
            stack: 'Stack 0',
            borderRadius: 4
          },
          {
            label: 'Negative',
            data: [15, 15, 25, 15, 20, 10],
            backgroundColor: 'rgba(233, 30, 99, 0.7)',
            stack: 'Stack 0',
            borderRadius: 4
          }
        ]
      };
      
      const config = {
        type: 'bar',
        data: data,
        options: {
          ...commonOptions,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw + '%';
                }
              }
            }
          },
          scales: {
            y: {
              stacked: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            },
            x: {
              stacked: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.7)',
                maxRotation: 45,
                minRotation: 45
              }
            }
          }
        }
      };
      
      return new Chart(ctx, config);
    };
    
    // Radar Chart for Channel Performance
    const createChannelPerformanceChart = () => {
      const ctx = document.getElementById('channel-performance').getContext('2d');
      
      const data = {
        labels: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'Customer Support', 'Reviews'],
        datasets: [
          {
            label: 'Positive Sentiment',
            data: [80, 65, 75, 60, 55, 70],
            fill: true,
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: '#4caf50',
            pointBackgroundColor: '#4caf50',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4caf50'
          },
          {
            label: 'Negative Sentiment',
            data: [20, 35, 25, 40, 45, 30],
            fill: true
          } 
