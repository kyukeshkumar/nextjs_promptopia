import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-sm"/>
        <span className="orange_gradient text-center">
          AI Powered prompts
        </span>
      </h1>
      <p className="desc text-center">
          Promptopia is an AI powered open source tool for modern world to discover,create and share creative contents
      </p>
      <Feed/>

    </section>
  )
}

export default Home