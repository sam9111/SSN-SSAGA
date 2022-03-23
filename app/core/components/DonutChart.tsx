import React, { Component, useState } from "react"
import { Box, Center, Heading } from "@chakra-ui/react"
import Chart from "react-apexcharts"

function DonutChart(props: { title: string }) {
  const donutChartData = [50, 45.7, 4.3]

  const donutChartOptions: any = {
    labels: [`Normal Leg - ${props.title}`, `Orthotic Leg - ${props.title}`, "Error"],
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
