const Page = async ({ params }) => {
  const { id } =await params

  console.log(id)

  return (
    <div>{id}</div>
  )
}

export default Page
