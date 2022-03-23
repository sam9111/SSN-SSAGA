import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatients from "app/patients/queries/getPatients"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, Box } from "@chakra-ui/react"
import React from "react"
import logout from "app/auth/mutations/logout"
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

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          colorScheme="blue"
          m={4}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

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

      <Box>
        <Flex align="center" p={2}>
          <Heading size="xl">Patient Records</Heading>
          <Spacer />
          <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>

            <style jsx global>{`
              @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

              html,
              body {
                padding: 0;
                margin: 0;
                font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              }

              * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                box-sizing: border-box;
              }
              .container {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              main p {
                font-size: 1.2rem;
              }

              p {
                text-align: center;
              }

              footer {
                width: 100%;
                height: 60px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #45009d;
              }

              footer a {
                display: flex;
                justify-content: center;
                align-items: center;
              }

              footer a {
                color: #f4f4f4;
                text-decoration: none;
              }

              .logo {
                margin-bottom: 2rem;
              }

              .logo img {
                width: 300px;
              }

              .buttons {
                display: grid;
                grid-auto-flow: column;
                grid-gap: 0.5rem;
              }
              .button {
                font-size: 1rem;
                background-color: #6700eb;
                padding: 1rem 2rem;
                color: #f4f4f4;
                text-align: center;
              }

              .button.small {
                padding: 0.5rem 1rem;
              }

              .button:hover {
                background-color: #45009d;
              }

              .button-outline {
                border: 2px solid #6700eb;
                padding: 1rem 2rem;
                color: #6700eb;
                text-align: center;
              }

              .button-outline:hover {
                border-color: #45009d;
                color: #45009d;
              }

              pre {
                background: #fafafa;
                border-radius: 5px;
                padding: 0.75rem;
                text-align: center;
              }
              code {
                font-size: 0.9rem;
                font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                  Bitstream Vera Sans Mono, Courier New, monospace;
              }

              .grid {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;

                max-width: 800px;
                margin-top: 3rem;
              }

              @media (max-width: 600px) {
                .grid {
                  width: 100%;
                  flex-direction: column;
                }
              }
            `}</style>
          </div>
        </Flex>
      </Box>
      <Box>
        <Button colorScheme="blue" my={4}>
          <Link href={Routes.NewPatientPage()}>Create Patient</Link>
        </Button>
      </Box>

      <Box bg="gray.100" rounded="lg" p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Table variant="simple">
          <Tbody>
            {patients.map((patient) => (
              <Flex key={patient.id}>
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
