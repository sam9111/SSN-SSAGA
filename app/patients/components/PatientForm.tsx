import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { Box, Center } from "@chakra-ui/react"
export { FORM_ERROR } from "app/core/components/Form"

export function PatientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Center>
      <Box p="24px" w="40%" bg="gray.100" rounded="lg">
        <Form<S> {...props}>
          <LabeledTextField bg="white" name="name" label="Name" />
          <LabeledTextField bg="white" name="status" label="Status" />
          <LabeledTextField bg="white" name="severity_score" type="number" label="Severity Score" />
          <LabeledTextField bg="white" name="mobile" type="number" label="Mobile" />
          <LabeledTextField bg="white" name="email" label="Email" />
          <LabeledTextField bg="white" name="location" label="Location" />
        </Form>
      </Box>
    </Center>
  )
}
