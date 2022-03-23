import { Head, BlitzLayout } from "blitz"
import { Box, Container, Center, Text } from "@chakra-ui/react"
const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "SSN-SSAGA"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>{children}</Box>
      <Box>
        <Center bg="black" pt="8px" pb="1px">
          <Text fontSize="md" fontWeight="bold" color="white">
            SSN SSAGA
          </Text>
        </Center>
      </Box>
      <Box>
        <Center bg="black" pt="1px" pb="8px">
          <Text fontSize="md" fontWeight="bold" color="white">
            Orthotic Leg Assessment
          </Text>
        </Center>
      </Box>
    </>
  )
}

export default Layout
