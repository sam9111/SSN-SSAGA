import React, { Component, useState } from "react"
import { Box, Center, Heading } from "@chakra-ui/react"
import Chart from "react-apexcharts"

function DonutChart(props: { title: string }) {
  const donutChartData = [
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 101),
    Math.floor(Math.random() * 11),
  ]

  const donutChartOptions: any = {
    labels: [`Normal Leg - ${props.title}`, `Orthotic Leg - ${props.title}`, "Error"],
    title: {
      text: `${props.title}`,
    },
    colors: [
      "#008FFB",
      "#FEB019",
      function ({ value }) {
        if (value >= 5) {
          return "#FF4560"
        } else {
          return "#00E396"
        }
      },
    ],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  }

  return (
    <Box py="1rem" bg="">
      <Chart
        options={donutChartOptions || null}
        series={donutChartData}
        type="donut"
        width="100%"
        height="100%"
      />
    </Box>
  )
}

export default DonutChart
