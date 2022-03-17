import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatient from "app/patients/queries/getPatient"
import deletePatient from "app/patients/mutations/deletePatient"
import React from "react"
import { RealTimeLineChart } from "../../core/components/RealTimeLineChart"
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
import BarChart from "app/core/components/BarChart"
import PatientProfile from "../../core/components/PatientProfile"
import Alerts from "../../core/components/Alerts"
import MiniStatistics from "app/core/components/MiniStatistics"
const TIME_RANGE_IN_MILLISECONDS = 30 * 1000
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000
const ADDING_DATA_RATIO = 0.8

const GAIT_PARAMS = [
  { title: "Stride Velocity", value: 30, percentage: -10 },
  { title: "Step Length", value: 45, percentage: 20 },
  { title: "Stride Length", value: 10, percentage: -30 },
  { title: "Cadence", value: 100, percentage: 45 },
  { title: "Stride Velocity", value: 36, percentage: 64 },
  { title: "Step Angle", value: 98, percentage: -23 },
  { title: "Step Time", value: 23, percentage: 78 },
  { title: "Knee Angle", value: 92, percentage: -89 },
  { title: "Ankle Angle", value: 23, percentage: -23 },
  { title: "Ground Reaction Force", value: 34, percentage: -11 },
  { title: "Stance Time", value: 22, percentage: -34 },
  { title: "Traversed Distance", value: 23, percentage: -99 },
  { title: "Swing Time", value: 86, percentage: -31 },
]

export const Patient = () => {
  const router = useRouter()
  const patientId = useParam("patientId", "number")
  const [deletePatientMutation] = useMutation(deletePatient)
  const [patient] = useQuery(getPatient, { id: patientId })

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
        <title>Patient Dashboard</title>
      </Head>
      <Flex align="center" p={4}>
        <Heading size="xl">Patient Dashboard</Heading>
        <Spacer />
        <Button colorScheme="blue" m={4}>
          <Link href={Routes.PatientsPage()}>Back to Patients</Link>
        </Button>
      </Flex>
      <Grid
        p="16px"
        mx={{ sm: "24px", xl: "0px" }}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg="white"
          rounded="lg"
          p="16px"
          my={{ sm: "24px", xl: "0px" }}
        >
          <PatientProfile
            patient={patient}
            title="Profile"
            name={patient.name}
            mobile="9933445566"
            email="patient@gmail.com"
            location="Chennai"
          />
          <Box p="16px" my={{ sm: "24px", xl: "0px" }}>
            <Text fontSize="lg" fontWeight="bold">
              Orthotic Device Details
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={2} bg="white" rounded="lg" p="16px" my={{ sm: "24px", xl: "0px" }}>
          <Text fontSize="xl" fontWeight="bold" pb=".5rem">
            Real Time Data
          </Text>
          <RealTimeLineChart dataList={dataList} range={TIME_RANGE_IN_MILLISECONDS} />
        </GridItem>
        <GridItem colSpan={2} bg="white" rounded="lg" p="16px" my={{ sm: "24px", xl: "0px" }}>
          <Text fontSize="xl" fontWeight="bold" pb=".5rem">
            Past Activity
          </Text>

          <BarChart />
          <Select placeholder="Sort by" rounded="lg" my="16px">
            {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
              <option value={month} key={index}>
                {month}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem colSpan={4} bg="white" rounded="lg" p="16px" my={{ sm: "24px", xl: "0px" }}>
          <Text fontSize="xl" fontWeight="bold" pb=".5rem">
            Real-Time Gait Parameters
          </Text>

          <SimpleGrid columns={4} spacing={10} p="16px">
            {GAIT_PARAMS.map((params, i) => (
              <MiniStatistics
                key={i}
                title={params.title}
                value={params.value}
                percentage={params.percentage}
              />
            ))}
          </SimpleGrid>
        </GridItem>
        <GridItem colSpan={5} bg="white" rounded="lg">
          <Flex>
            <Box w="100%" m={4}>
              <Alerts title="Last 7 days" captions={[]} />
            </Box>
            <Stack spacing="20px" my="auto" mx={4}>
              <Button colorScheme="blue" size="lg">
                <Link href="/">Detailed Real Time Information</Link>
              </Button>
              <Button colorScheme="blue" size="lg">
                <Link href="/">Gait Parameters</Link>
              </Button>
              <Button colorScheme="blue" size="lg">
                <Link href="/patients/1/sensors">Sensor Data</Link>
              </Button>
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}

const ShowPatientPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Patient />
      </Suspense>
    </div>
  )
}

ShowPatientPage.authenticate = true
ShowPatientPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientPage
