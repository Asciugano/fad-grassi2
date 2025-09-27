export default async function NewsByIdComponent({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return <div>{id}</div>
}
