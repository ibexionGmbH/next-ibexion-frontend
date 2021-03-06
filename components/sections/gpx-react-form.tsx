import { DevTool } from '@hookform/devtools'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const schema = Yup.object({
  fahrergewicht: Yup.number().positive().integer().min(0).max(200).required(),
  bikegewicht: Yup.number().positive().integer().min(0).max(200).required(),
  fahrerleistung: Yup.number().positive().integer().min(0).max(200).required(),
  bikeleistung: Yup.number().positive().integer().min(0).max(200).required(),

  gPXDaten: Yup.mixed()
    .required('You need to provide a file')
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0].size <= 2000000
    }),
  /* .test('type', 'We only support gpx files', (value) => {
      return value && value[0].type === 'text/xml'
    }) */
}).required()

function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}

function ErrorMessageCustom({ children }) {
  return <p className="font-semibold text-red-600">{children}</p>
}

const GpxForm = () => {
  const [FileContents, setFileContents] = useState({})

  function readFileContent(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')

    reader.onload = () => {
      setFileContents({
        fileName: file.name,
        fileContent: reader.result,
        type: file.type,
      })
    }
    reader.onerror = () => {
      toast.error(`Error reading file ${reader.error}`)
    }
  }
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<SendGpxData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      gPXDaten: '',
      fahrergewicht: 80,
      bikegewicht: 30,
      fahrerleistung: 20,
      bikeleistung: 10,
    },
  })
  const onSubmit = async (data, FileContents) => {
    try {
      console.log('data ', data)
      const xml = FileContents.fileContent
      const response = await axios({
        method: 'post',
        url: '/api/send-gpx',
        responseType: 'json',
        data: {
          data,
          gpxData: xml,
        },
      })

      toast.success(JSON.stringify(response))
      return response
      /*  console.log('filecontent', fileContent)
      toast.success('Successfully sent Form') */
    } catch (error) {
      toast.error(error)
    }

    /*  console.log(data)
    toast.success(JSON.stringify(data, null, 2)) */
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <pre className="bg-white">{JSON.stringify(FileContents, null, 2)}</pre>
        <label
          htmlFor="fahrergewicht"
          className="block text-sm font-medium text-gray-700"
        >
          Fahrergewicht
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="fahrergewicht"
            placeholder="0"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
            {...register('fahrergewicht', {})}
          />
          {errors.fahrergewicht && (
            <ErrorMessage
              errors={errors}
              name="fahrergewicht"
              as="span"
              render={({ message }) => (
                <ErrorMessageCustom>{message}</ErrorMessageCustom>
              )}
            />
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="bikegewicht"
          className="block text-sm font-medium text-gray-700"
        >
          bikegewicht
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="bikegewicht"
            placeholder="0"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
            {...register('bikegewicht', {})}
          />
          {errors.bikegewicht && (
            <ErrorMessage
              errors={errors}
              name="bikegewicht"
              as="span"
              render={({ message }) => (
                <ErrorMessageCustom>{message}</ErrorMessageCustom>
              )}
            />
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="fahrerleistung"
          className="block text-sm font-medium text-gray-700"
        >
          Fahrerleistung
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="fahrerleistung"
            placeholder="0"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
            {...register('fahrerleistung', {})}
          />
          {errors.fahrerleistung && (
            <ErrorMessage
              errors={errors}
              name="fahrerleistung"
              as="span"
              render={({ message }) => (
                <ErrorMessageCustom>{message}</ErrorMessageCustom>
              )}
            />
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="bikeleistung"
          className="block text-sm font-medium text-gray-700"
        >
          Bikeleistung
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="bikegewicht"
            placeholder="0"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-lava-orange-500 focus:border-lava-orange-500"
            {...register('bikeleistung', {})}
          />
          {errors.bikeleistung && (
            <ErrorMessage
              errors={errors}
              name="bikeleistung"
              as="span"
              render={({ message }) => (
                <ErrorMessageCustom>{message}</ErrorMessageCustom>
              )}
            />
          )}
        </div>
      </div>

      <div className="">
        <label
          htmlFor="gpxFile"
          className="block text-sm font-medium text-gray-700"
        >
          Gpx File
        </label>
        <div className="flex justify-center px-6 pt-5 pb-6 mt-1 rounded-md border-2 border-gray-300 border-dashed">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto w-12 h-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative font-medium bg-white rounded-md cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none text-lava-orange-500 focus-within:ring-lava-orange-500 hover:text-lava-orange-500"
              >
                <span>Upload a file</span>

                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  {...register('gPXDaten', {})}
                  onChange={(e) => {
                    readFileContent(e)
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">GPX, GPS, XML up to 10MB</p>
            {errors.gPXDaten && (
              <ErrorMessage
                errors={errors}
                name="gPXDaten"
                as="span"
                render={({ message }) => (
                  <ErrorMessageCustom>{message}</ErrorMessageCustom>
                )}
              />
            )}
          </div>
        </div>
      </div>

      <input
        type="submit"
        className="inline-flex items-center py-2 px-4 mt-2 w-full text-base font-medium text-white rounded-md border border-transparent shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none bg-lava-orange-500 hover:bg-lava-orange-500 focus:ring-lava-orange-500"
      />

      {process.env.NODE_ENV === 'development' ? (
        <div>
          <DevTool control={control} />
        </div>
      ) : null}
    </form>
  )
}

export default function GpxReactForm() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="py-8 px-4 bg-white shadow sm:px-10 sm:rounded-lg">
        <GpxForm />
      </div>
    </div>
  )
}
