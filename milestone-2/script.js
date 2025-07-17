const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Theme switch
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeIcon.src = "assets/theme-dark.svg";
}

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    themeIcon.src = isDark
        ? "assets/theme-dark.svg"
        : "assets/theme-light.svg";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Sidebar toggle for mobile
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
});
// ==============================
// Chart.js - Job Statistics
// ==============================

const ctx = document.getElementById("jobChart")?.getContext("2d");

if (ctx) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const applied = [10, 30, 70, 60, 40, 60, 10, 70, 20, 50, 40, 60];
    const viewed = [90, 70, 30, 20, 30, 20, 80, 10, 80, 20, 60, 40];

    function getChartColors(isDark) {
        return {
            applied: isDark ? '#6C63FF' : '#5B21B6',
            viewed: isDark ? '#A78BFA' : '#DDD6FE',
            grid: isDark ? '#374151' : '#E5E7EB',
            text: isDark ? '#F3F4F6' : '#111827'
        };
    }

    let currentTheme = document.documentElement.classList.contains('dark');
    let chartColors = getChartColors(currentTheme);

    const chartConfig = {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Job Applied',
                    data: viewed,
                    backgroundColor: chartColors.applied,
                    borderRadius: 10,
                },
                {
                    label: 'Job View',
                    data: applied,
                    backgroundColor: chartColors.viewed,
                    borderRadius: 10,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: chartColors.text },
                    grid: { display: false }
                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: chartColors.text
                    },
                    grid: {
                        color: chartColors.grid,
                        drawBorder: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: chartColors.text,
                        boxWidth: 12,
                        padding: 16,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    };

    const jobChart = new Chart(ctx, chartConfig);

    const donutCtx = document.getElementById('donutChart')?.getContext('2d');

if (donutCtx) {
  const isDark = document.documentElement.classList.contains('dark');
  const donutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Female', 'Male'],
      datasets: [{
        data: [35, 65],
        backgroundColor: isDark
          ? ['#8b5cf6', '#10b981']
          : ['#7c3aed', '#059669'],
        borderWidth: 0,
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.raw}%`
          }
        }
      }
    }
  });
}


    function updateChartTheme(isDark) {
        const colors = getChartColors(isDark);
        chartConfig.data.datasets[0].backgroundColor = colors.applied; // Applied
        chartConfig.data.datasets[1].backgroundColor = colors.viewed;  // View
        chartConfig.options.scales.x.ticks.color = colors.text;
        chartConfig.options.scales.y.ticks.color = colors.text;
        chartConfig.options.scales.y.grid.color = colors.grid;
        chartConfig.options.plugins.legend.labels.color = colors.text;
        jobChart.update();
    }

    const filter = document.getElementById('monthFilter');
    filter?.addEventListener('change', () => {
        const value = filter.value;
        if (value === 'this') {
            updateChartData(8, 1);
        } else if (value === 'last') {
            updateChartData(7, 1);
        } else {
            updateChartData(0, 12);
        }
    });

    function updateVisibleBars() {
        const width = window.innerWidth;
        if (width < 640) {
            updateChartData(9, 3);
        } else if (width < 1024) {
            updateChartData(6, 6);
        } else {
            updateChartData(0, 12);
        }
    }

    function updateChartData(start, count) {
        jobChart.data.labels = months.slice(start, start + count);
        jobChart.data.datasets[0].data = applied.slice(start, start + count);  // corrected
        jobChart.data.datasets[1].data = viewed.slice(start, start + count);   // corrected
        jobChart.update();
    }

    window.addEventListener('resize', updateVisibleBars);
    updateVisibleBars();
}
