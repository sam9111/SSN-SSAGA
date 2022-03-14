import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPatient from "app/patients/queries/getPatient"
import deletePatient from "app/patients/mutations/deletePatient"
import React from "react"
import { RealTimeLineChart } from "../../core/components/RealTimeLineChart"

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000
const ADDING_DATA_RATIO = 0.8

export const Patient = () => {
  const router = useRouter()
  const patientId = useParam("patientId", "number")
  const [deletePatientMutation] = useMutation(deletePatient)
  const [patient] = useQuery(getPatient, { id: patientId })

  const nameList = ["a", "b", "c"]
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
    <>
      <Head>
        <title>Patient {patient.id}</title>
      </Head>

      <div>
        <h1>Patient {patient.id}</h1>
        <pre>{JSON.stringify(patient, null, 2)}</pre>
        <div>
          <RealTimeLineChart dataList={dataList} range={TIME_RANGE_IN_MILLISECONDS} />
        </div>
        <Link href={Routes.EditPatientPage({ patientId: patient.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePatientMutation({ id: patient.id })
              router.push(Routes.PatientsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPatientPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PatientsPage()}>
          <a>Patients</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Patient />
      </Suspense>
    </div>
  )
}

ShowPatientPage.authenticate = true
ShowPatientPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPatientPage
