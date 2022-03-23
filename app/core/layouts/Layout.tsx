import { Head, BlitzLayout } from "blitz"
import { Box, Container, Center, Text } from "@chakra-ui/react"
import { Footer } from "app/core/components/Footer"
const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "SSN-SSAGA"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box minH="100vh">{children}</Box>

        <Footer />
      </Box>
    </>
  )
}

export default Layout
