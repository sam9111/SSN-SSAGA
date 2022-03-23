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

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000
const ADDING_DATA_RATIO = 0.8

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
        <Heading size="lg">Patient Dashboard</Heading>
        <Spacer />
        <Button colorScheme="blue" m={4}>
          <Link href={Routes.PatientsPage()}>Back to Patients</Link>
        </Button>
      </Flex>
      <Flex p="16px" mx={{ sm: "24px", xl: "0px" }} gap={4}>
        <Box bg="gray.100" rounded="lg">
          <PatientProfile
            patient={patient}
            title="Profile"
            name={patient.name}
            mobile={patient.mobile}
            email={patient.email}
            location={patient.location}
          />
          <Box p="16px" my={{ sm: "24px", xl: "0px" }}>
            <Text fontSize="lg" fontWeight="bold">
              Orthotic Device Details
            </Text>
          </Box>
        </Box>

        <SimpleGrid columns={2} spacing={10} w="100%">
          <Box bg="gray.100" rounded="lg" p="16px">
            <Text fontSize="xl" fontWeight="bold" pb=".5rem">
              Real Time Data
            </Text>
            <RealTimeLineChart dataList={dataList} range={TIME_RANGE_IN_MILLISECONDS} />
          </Box>

          <Box bg="gray.100" rounded="lg" p="16px">
            <Text fontSize="xl" fontWeight="bold" pb=".5rem">
              Past Activity
            </Text>

            <BarChart />
            <Select placeholder="Sort by" rounded="lg" my="16px">
              {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                (month, index) => (
                  <option value={month} key={index}>
                    {month}
                  </option>
                )
              )}
            </Select>
          </Box>

          <Box bg="gray.100" rounded="lg" p="16px">
            <Alerts title="Last 7 days" captions={[]} />
          </Box>
          <Box bg="gray.100" rounded="lg" p="16px">
            <Stack spacing="20px" m="auto">
              <Button colorScheme="blue" size="lg">
                <Link href="/">Detailed Real Time Information</Link>
              </Button>
              <Button colorScheme="blue" size="lg">
                <Link href="/patients/1/gait">Gait Parameters</Link>
              </Button>
              <Button colorScheme="blue" size="lg">
                <Link href="/patients/1/sensors">Sensor Data</Link>
              </Button>
            </Stack>
          </Box>
        </SimpleGrid>
      </Flex>
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
