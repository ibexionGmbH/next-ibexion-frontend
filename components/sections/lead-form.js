import { ErrorMessage,Field, Form, Formik } from 'formik'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { fetchAPI } from 'utils/api'
import * as yup from 'yup'

import Button from '../elements/button'

const LeadForm = ({ data }) => {
  const [loading, setLoading] = useState(false)

  const LeadSchema = yup.object().shape({
    name: yup.string().optional(),
    email: yup.string().email().required(),
    tel: yup.number().optional(),
    subject: yup.string().optional(),
    message: yup.string().required(),
  })

  return (
    <div className="py-10 text-center bg-gray-100">
      <h2 className="mb-10 text-3xl font-bold">{data.title}</h2>
      <div className="overflow-hidden py-16 px-4 bg-white sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Formik
            initialValues={{
              name: '',
              email: '',
              tel: '',
              subject: '',
              message: '',
            }}
            validationSchema={LeadSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              setLoading(true)

              try {
                setErrors({ api: null })
                await fetchAPI('/lead-form-submissions', {
                  method: 'POST',
                  body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    tel: values.tel,
                    subject: values.subject,
                    message: values.message,
                    checkbox: values.checkbox,
                    location: data.location,
                  }),
                })
              } catch (err) {
                setErrors({ api: err.message })
                toast.error(err.message)
              }

              setLoading(false)
              setSubmitting(false)
              toast.success('Message sent')
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <div className="max-w-prose">
                <Form className="flex flex-col gap-4">
                  <label
                    htmlFor="name"
                    className="block mt-2 text-sm font-medium text-left text-gray-700"
                  >
                    Name
                  </label>

                  <Field
                    className="block py-3 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
                    type="text"
                    name="name"
                    placeholder={data.namePlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => <p className="error-style">{msg}</p>}
                    name="name"
                  />
                  <label
                    htmlFor="email"
                    className="block mt-2 text-sm font-medium text-left text-gray-700"
                  >
                    E-Mail (*)
                  </label>
                  <Field
                    className="block py-3 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
                    type="email"
                    name="email"
                    placeholder={data.emailPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => <p className="error-style">{msg}</p>}
                    name="email"
                  />
                  <label
                    htmlFor="tel"
                    className="block mt-2 text-sm font-medium text-left text-gray-700"
                  >
                    Phone
                  </label>
                  <Field
                    className="block py-3 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
                    type="tel"
                    name="tel"
                    placeholder={data.telPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => <p className="error-style">{msg}</p>}
                    name="tel"
                  />
                  <label
                    htmlFor="subject"
                    className="block mt-2 text-sm font-medium text-left text-gray-700"
                  >
                    Subject
                  </label>
                  <Field
                    className="block py-3 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
                    type="text"
                    name="subject"
                    placeholder={data.subjectPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => <p className="error-style">{msg}</p>}
                    name="subject"
                  />

                  {/* <div>
                    <label
                      htmlFor="checkbox"
                      className="block mt-2 text-sm font-medium text-left text-gray-700"
                    >
                      Auswahl
                    </label>
                    <Field
                      name="checkbox"
                      as="select"
                      className="block py-3 px-4 pr-10 pl-3 mt-1 w-full text-base rounded-md border-gray-300 sm:text-sm focus:outline-none focus:ring-lava-orange-500 focus:border-lava-orange-500"
                    >
                      {data.CheckboxRow.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      render={(msg) => <p className="error-style">{msg}</p>}
                      name="checkbox"
                    />
                  </div> */}

                  <label
                    htmlFor="message"
                    className="block mt-2 text-sm font-medium text-left text-gray-700"
                  >
                    Message (*)
                  </label>
                  <Field
                    className="block py-3 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
                    type="text"
                    name="message"
                    as="textarea"
                    placeholder={data.textPlaceholder}
                  />
                  <ErrorMessage
                    render={(msg) => <p className="error-style">{msg}</p>}
                    name="message"
                  />
                  <Button
                    type="submit"
                    button={data.submitButton}
                    disabled={isSubmitting}
                    loading={loading}
                    appearance={'dark'}
                  />
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default LeadForm
