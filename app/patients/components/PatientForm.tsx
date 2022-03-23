import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function PatientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="status" label="Status" placeholder="Status" />
      <LabeledTextField
        name="severity_score"
        type="number"
        label="Severity Score"
        placeholder="Severity Score"
      />
      <LabeledTextField name="mobile" type="number" label="Mobile" placeholder="Mobile" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField name="location" label="Location" placeholder="Location" />
    </Form>
  )
}
