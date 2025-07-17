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
                    label: 'Job View',
                    data: viewed,
                    backgroundColor: chartColors.viewed,
                    borderRadius: 10,
                },
                {
                    label: 'Job Applied',
                    data: applied,
                    backgroundColor: chartColors.applied,
                    borderRadius: 10,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 10, bottom: 10 } },
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
                    ticks: { stepSize: 20, color: chartColors.text },
                    grid: { color: chartColors.grid, drawBorder: false }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: { mode: 'index', intersect: false }
            }
        }
    };


    const jobChart = new Chart(ctx, chartConfig);


    function updateCustomLegendColors(isDark) {
        const colors = getChartColors(isDark);
        document.querySelector('[data-legend="view"]').style.backgroundColor = colors.viewed;
        document.querySelector('[data-legend="applied"]').style.backgroundColor = colors.applied;
    }

    function updateChartTheme(isDark) {
        const colors = getChartColors(isDark);
        chartConfig.data.datasets[0].backgroundColor = colors.viewed;   // first dataset: views
        chartConfig.data.datasets[1].backgroundColor = colors.applied;  // second dataset: applied
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
        const now = new Date();
        const currentMonthIndex = now.getMonth();

        if (width < 640) {
            // show last 3 months that exist
            const start = Math.max(currentMonthIndex - 2, 0);
            const count = currentMonthIndex - start + 1;
            updateChartData(start, count);
        } else if (width < 1024) {
            // show last 6 months that exist
            const start = Math.max(currentMonthIndex - 5, 0);
            const count = currentMonthIndex - start + 1;
            updateChartData(start, count);
        } else {
            // show from Jan to current month
            updateChartData(0, currentMonthIndex + 1);
        }
    }


    function updateChartData(start, count) {
        jobChart.data.labels = months.slice(start, start + count);
        jobChart.data.datasets[0].data = viewed.slice(start, start + count);
        jobChart.data.datasets[1].data = applied.slice(start, start + count);
        jobChart.update();
    }


    window.addEventListener('resize', updateVisibleBars);
    updateVisibleBars();
}


document.addEventListener("DOMContentLoaded", () => {
    const femaleTarget = 35;
    const maleTarget = 65;

    const hoverLabel = document.getElementById('hoverLabel');
    const hoverIcon = document.getElementById('hoverIcon');
    const hoverText = document.getElementById('hoverText');

    const ctx = document.getElementById('employeeCompositionChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [maleTarget, femaleTarget],
                backgroundColor: ['#059669', '#7c3aed'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false } // disable default tooltip
            },
            onHover: (event, elements, chart) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const value = chart.data.datasets[0].data[index];

                    hoverText.textContent = value + "%";
                    hoverIcon.src = index === 0 ? 'assets/male-icon.svg' : 'assets/female-icon.svg';
                    hoverIcon.alt = index === 0 ? "Male" : "Female";

                    const canvasRect = chart.canvas.getBoundingClientRect();
                    // position next to cursor
                    hoverLabel.style.left = (event.clientX - canvasRect.left + 10) + 'px';
                    hoverLabel.style.top = (event.clientY - canvasRect.top - 10) + 'px';

                    hoverLabel.classList.remove('hidden');
                } else {
                    hoverLabel.classList.add('hidden');
                }
            }
        }
    });
});

