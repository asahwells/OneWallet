import { ApexOptions } from "apexcharts";
type ApexGeneric = ApexOptions & any;

export const barChartDataDailyTraffic = [
  {
    name: "Expected Repayment",
    data: [65, 100, 70, 35, 75, 65, 60, 100, 70, 35, 75, 75],
  },
  {
    name: "Actual Repayment",
    data: [40, 60, 35, 75, 45, 55, 40, 70, 35, 65, 45, 55],
  },
];

export const barChartOptionsDailyTraffic: ApexGeneric = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#546C8D",
        fontSize: "14px",
        fontWeight: "400",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: true,
    // strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: "#4318FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "rgba(67, 24, 255, 1)",
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  colors: ["#2A9D90", "#E76E50"],
  dataLabels: {
    enabled: false,
  },
  legend: { show: false },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: "18.27px",
    },
  },
};

export const barChartDataUserActivity = [
  {
    name: "PRODUCT A",
    data: [70, 55, 41, 67, 22, 43],
  },
  {
    name: "PRODUCT B",
    data: [90, 70, 60, 50, 80, 90],
  },
];

// User Activity

export const barChartOptionsUserActivity = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["S", "M", "T", "W", "T", "F"],
    show: false,
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: true,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF"],
  },
  legend: {
    show: false,
  },
  colors: ["#2A9D90", "#E76E50"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "30px",
    },
  },
};
// Consumption Users Reports

export const barChartDataConsumption = [
  {
    name: "PRODUCT A",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: "PRODUCT B",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: "PRODUCT C",
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
];

export const barChartOptionsConsumption: ApexGeneric = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },

  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  legend: {
    show: false,
  },
  colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};

export const pieChartOptions: ApexGeneric = {
  labels: ["Active Devices", "Inactive Devices"],
  colors: ["#FFC327", "#5B93FF"],
  chart: {
    width: "50px"
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
          showAlways: true,
            label: 'Total Volume',
            formatter: function (w: any) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toLocaleString();
            }
        },
      },
    },
  },
  fill: {
    colors: ["#5B93FF", "#FFC327"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const pieChartData = [40, 60];

// Total Spent Default

export const lineChartDataTotalSpent = [
  {
    name: "Volume",
    data: [50, 64, 48, 66, 49, 68, 53,122,64],
  },
];

export const lineChartOptionsTotalSpent: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#C5B27D",
    },
  },
  colors: ["#C5B27D", "#0F454F"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#C5B27D",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    // @ts-ignore
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2.6,

    // type: "line",
  },
  xaxis: {
    // type: "numeric",
    categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "11.38px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    column: {
      // color: ["#7551FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  // color: ["#7551FF", "#39B8FF"],
};
