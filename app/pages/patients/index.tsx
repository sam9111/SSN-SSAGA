import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatients from "app/patients/queries/getPatients"
import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, Box } from "@chakra-ui/react"
import React from "react"
import TableRow from "app/core/components/TableRow"

import {
  SimpleGrid,
  Spacer,
  HStack,
  Stack,
  Heading,
  Center,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

export const PatientsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ patients, hasMore }] = usePaginatedQuery(getPatients, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Box p="16px" mx={{ sm: "24px", xl: "0px" }}>
      <Head>
        <title>Patients</title>
      </Head>

      <Flex align="center" p={4}>
        <Heading size="xl">Patient Records</Heading>
        <Spacer />
        <Button colorScheme="blue" m={4}>
          <Link href={Routes.NewPatientPage()}>Create Patient</Link>
        </Button>
      </Flex>

      <Box bg="gray.100" rounded="lg" p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Table variant="simple" size="lg">
          <Tbody>
            {patients.map((patient) => (
              <Flex key={patient.id} rounded="lg">
                <TableRow
                  name={patient.name}
                  status={patient.status}
                  progression={patient.severity_score}
                  type="patients"
                />
                <Spacer />
                <Button colorScheme="blue" m={4}>
                  {" "}
                  <Link href={Routes.ShowPatientPage({ patientId: patient.id })}>View</Link>
                </Button>
              </Flex>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </Box>
  )
}

const PatientsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PatientsList />
      </Suspense>
    </div>
  )
}

PatientsPage.authenticate = true
PatientsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PatientsPage
