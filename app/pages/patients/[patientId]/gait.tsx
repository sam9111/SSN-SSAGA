import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import React from "react"
import DonutChart from "app/core/components/DonutChart"

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
import MiniStatistics from "app/core/components/MiniStatistics"
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
export const GaitParams = () => {
  return (
    <Box>
      <Head>
        <title> Real-Time Gait Parameters</title>
      </Head>

      <Flex align="center" p={4}>
        <Heading size="lg"> Real-Time Gait Parameters</Heading>
        <Spacer />
        <Button colorScheme="blue" m={4}>
          <Link href={"/patients/1"}>Back to Patients</Link>
        </Button>
      </Flex>

      <SimpleGrid columns={3} spacing={10} p="16px">
        {GAIT_PARAMS.map((params, i) => (
          // <MiniStatistics
          //   key={i}
          //   title={params.title}
          //   value={params.value}
          //   percentage={params.percentage}
          // />
          <DonutChart key={i} title={params.title} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

const GaitPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <GaitParams />
      </Suspense>
    </div>
  )
}

GaitPage.authenticate = true
GaitPage.getLayout = (page) => <Layout>{page}</Layout>

export default GaitPage
