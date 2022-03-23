import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import React from "react"
import { RealTimeLineChart } from "app/core/components/RealTimeLineChart"

import {
  Box,
  Flex,
  SimpleGrid,
  Spacer,
  HStack,
  Stack,
  Text,
  Heading,
  Center,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react"
const TIME_RANGE_IN_MILLISECONDS = 30 * 1000
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000
const ADDING_DATA_RATIO = 0.8

const SENSORS = ["Knee Flex", "Pressure", "Accelerometer", "Ankle Flex", "Momentum", "Gyroscope"]

export const SensorData = () => {
  const nameList = ["Actual Gait Cycle", "Ideal Gait Cycle"]
  const defaultDataList = nameList.map((name) => ({
    name: name,
    data: [],
  }))
  const [dataList, setDataList] = React.useState(defaultDataList)

  React.useEffect(() => {
    const addDataRandomly = (data) => {
      if (Math.random() < 1 - ADDING_DATA_RATIO) {
        return data
      }
      return [
        ...data,
        {
          x: new Date(),
          y: data.length * Math.random(),
        },
      ]
    }
    const interval = setInterval(() => {
      setDataList(
        dataList.map((val) => {
          return {
            name: val.name,
            data: addDataRandomly(val.data),
          }
        })
      )
    }, ADDING_DATA_INTERVAL_IN_MILLISECONDS)

    return () => clearInterval(interval)
  })

  return (
    <Box>
      <Head>
        <title>Real-Time Sensor Data</title>
      </Head>

      <Flex align="center" p={4}>
        <Heading size="lg">Real-Time Sensor Data</Heading>
        <Spacer />
        <Button colorScheme="blue" m={4}>
          <Link href={"/patients/1"}>Back to Patient</Link>
        </Button>
      </Flex>
      <SimpleGrid columns={3} spacing={10} p="16px">
        {SENSORS.map((sensor, index) => (
          <Box bg="gray.100" rounded="lg" p="16px" key={index}>
            <Text fontSize="xl" fontWeight="bold" pb=".5rem">
              {sensor} Sensor
            </Text>
            <RealTimeLineChart dataList={dataList} range={Math.floor(Math.random() * 100) * 1000} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

const SensorPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SensorData />
      </Suspense>
    </div>
  )
}

SensorPage.authenticate = true
SensorPage.getLayout = (page) => <Layout>{page}</Layout>

export default SensorPage
