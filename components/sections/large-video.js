import Video from '../elements/video'

const LargeVideo = ({ data }) => {
  return (
    <section className="container flex flex-col pt-12 pb-16 text-center align-middle">
      <h2 className="mb-6 title">{data.title}</h2>
      <p className="mb-10 text-lg">{data.description}</p>
      {/* Video wrapper */}
      <div className="overflow-hidden mx-auto w-full shadow-2xl lg:w-9/12">
        <Video
          media={data?.video}
          poster={data.poster}
          className="w-full max-h-full"
        />
      </div>
    </section>
  )
}

export default LargeVideo
