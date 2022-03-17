import { Flex, Icon, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { Box } from "@chakra-ui/react"
import { Suspense } from "react"
import { Head, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatient from "app/patients/queries/getPatient"
import deletePatient from "app/patients/mutations/deletePatient"
import { RealTimeLineChart } from "../../core/components/RealTimeLineChart"
const PatientProfile = ({ patient, title, name, mobile, email, location }) => {
  return (
    <Box rounded="lg" p="16px" my={{ sm: "24px", xl: "0px" }}>
      <Box p="12px 5px" mb="12px">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Box py="10px">
          <Link href={Routes.EditPatientPage({ patientId: patient.id })}>
            <a>Edit</a>
          </Link>

          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                // await deletePatientMutation({ id: patient.id })
                // router.push(Routes.PatientsPage())
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </Box>
      </Box>
      <Box px="5px">
        <Flex direction="column">
          <Flex align="center" mb="18px">
            <Text fontSize="md" fontWeight="bold" me="10px">
              Full Name:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {name}
            </Text>
          </Flex>
          <Spacer />
          <Flex align="center" mb="18px">
            <Text fontSize="md" fontWeight="bold" me="10px">
              Mobile:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {mobile}
            </Text>
          </Flex>
          <Spacer />
          <Flex align="center" mb="18px">
            <Text fontSize="md" fontWeight="bold" me="10px">
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {email}
            </Text>
          </Flex>
          <Spacer />
          <Flex align="center" mb="18px">
            <Text fontSize="md" fontWeight="bold" me="10px">
              Location:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {location}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default PatientProfile
