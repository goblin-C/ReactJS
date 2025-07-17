const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// ---------------------------
// Global variables
// ---------------------------
let jobChart; // the bar chart instance
let chartColors; // current colors

// ---------------------------
// Functions for theme-aware colors
// ---------------------------
function getChartColors(isDark) {
  return {
    applied: isDark ? "#6C63FF" : "#5832E6",
    viewed: isDark ? "#2D2D2D" : "#F2EFFF",
    grid: isDark ? "#000000" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
  };
}

function updateCustomLegendColors(isDark) {
  const colors = getChartColors(isDark);
  document.querySelector('[data-legend="applied"]').style.backgroundColor =
    colors.applied;
  document.querySelector('[data-legend="view"]').style.backgroundColor =
    colors.viewed;
}

function updateChartTheme(isDark) {
  const colors = getChartColors(isDark);
  chartColors = colors;
  if (jobChart) {
    jobChart.data.datasets[0].backgroundColor = colors.applied;
    jobChart.data.datasets[1].backgroundColor = colors.viewed;
    jobChart.options.scales.x.ticks.color = colors.text;
    jobChart.options.scales.y.ticks.color = colors.text;
    jobChart.options.scales.y.grid.color = colors.grid;
    jobChart.update();
  }
}

// ---------------------------
// Theme switch
// ---------------------------
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  themeIcon.src = "assets/theme-dark.svg";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  themeIcon.src = isDark ? "assets/theme-dark.svg" : "assets/theme-light.svg";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update chart & legend when theme changes
  updateChartTheme(isDark);
  updateCustomLegendColors(isDark);
});

// ---------------------------
// Sidebar toggle for mobile
// ---------------------------
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});
overlay.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// ==============================
// Chart.js - Job Statistics Bar Chart
// ==============================
const ctx = document.getElementById("jobChart")?.getContext("2d");

if (ctx) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const applied = [0, 30, 70, 60, 40, 60, 40, 30, 20, 50, 40, 100];
  const viewed = [90, 70, 30, 20, 30, 20, 50, 10, 80, 20, 60, 0];

  let currentTheme = document.documentElement.classList.contains("dark");
  chartColors = getChartColors(currentTheme);

  const chartConfig = {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "Job Applied",
          data: applied,
          backgroundColor: chartColors.applied,
          borderRadius: 10,
        },
        {
          label: "Job View",
          data: viewed,
          backgroundColor: chartColors.viewed,
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      grouped: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 10, bottom: 10 } },
      scales: {
        x: {
          stacked: true,
          ticks: { stepSize: 20, color: chartColors.text },
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          min: 0,
          max: 100,
          ticks: { stepSize: 20, color: chartColors.text },
          grid: {
            display: true,
            color: chartColors.grid,
            drawBorder: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { mode: "index", intersect: false },
      },
    },
  };

  jobChart = new Chart(ctx, chartConfig); // assign globally

  const filter = document.getElementById("monthFilter");
  filter?.addEventListener("change", () => {
    const value = filter.value;
    if (value === "this") {
      updateChartData(8, 1);
    } else if (value === "last") {
      updateChartData(7, 1);
    } else {
      updateChartData(0, 12);
    }
  });

  function updateChartData(start, count) {
    jobChart.data.labels = months.slice(start, start + count);
    jobChart.data.datasets[0].data = viewed.slice(start, start + count);
    jobChart.data.datasets[1].data = applied.slice(start, start + count);
    jobChart.update();
  }

  function updateVisibleBars() {
    const width = window.innerWidth;
    // const now = new Date();
    // const currentMonthIndex = now.getMonth();
    const currentMonthIndex = 12;
    if (width < 640) {
      const start = Math.max(currentMonthIndex - 2, 0);
      const count = currentMonthIndex - start + 1;
      updateChartData(start, count);
    } else if (width < 1024) {
      const start = Math.max(currentMonthIndex - 5, 0);
      const count = currentMonthIndex - start + 1;
      updateChartData(start, count);
    } else {
      updateChartData(0, currentMonthIndex + 1);
    }
  }

  window.addEventListener("resize", updateVisibleBars);
  updateVisibleBars();
}

// ==============================
// Chart.js - Employee Composition Donut Chart
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const femaleTarget = 35;
  const maleTarget = 65;

  const hoverLabel = document.getElementById("hoverLabel");
  const hoverIcon = document.getElementById("hoverIcon");
  const hoverText = document.getElementById("hoverText");
  const isDark = localStorage.getItem("theme") === "dark";
  const donutCtx = document
    .getElementById("employeeCompositionChart")
    .getContext("2d");

  new Chart(donutCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [maleTarget, femaleTarget],
          backgroundColor: ["#16C098", "#5832E6"],
          borderRadius: 2,
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      onHover: (event, elements, chart) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const value = chart.data.datasets[0].data[index];
          hoverText.textContent = value + "%";
          hoverIcon.src =
            index === 0 ? "assets/male-icon.svg" : "assets/female-icon.svg";
          hoverIcon.alt = index === 0 ? "Male" : "Female";

          const canvasRect = chart.canvas.getBoundingClientRect();
          hoverLabel.style.left = event.clientX - canvasRect.left + 10 + "px";
          hoverLabel.style.top = event.clientY - canvasRect.top - 10 + "px";
          hoverLabel.classList.remove("hidden");
        } else {
          hoverLabel.classList.add("hidden");
        }
      },
    },
  });
});
