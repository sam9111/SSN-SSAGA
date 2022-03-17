import React, { Component, useState } from "react"
import { Box, Center, Heading } from "@chakra-ui/react"
import Chart from "react-apexcharts"

const barChartData = [
  {
    name: "Past Activity",
    data: [33, 25, 11, 30, 49, 35, 27, 13, 42],
  },
]

const barChartOptions: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      backgroundColor: "red",
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        backgroundColor: "red",
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
  },
  xaxis: {
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    show: false,
    labels: {
      show: false,
      style: {
        colors: "#fff",
        fontSize: "12px",
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
    color: "#fff",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
  },
  fill: {
    colors: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      columnWidth: "12px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
}

function BarChart(props: {}) {
  return (
    <Box py="1rem" bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)">
      <Chart
        options={barChartOptions || null}
        series={barChartData}
        type="bar"
        width="100%"
        height="100%"
      />
    </Box>
  )
}

export default BarChart
