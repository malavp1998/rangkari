export default async function EditPaintingPage(props: PageProps<'/admin/paintings/[id]/edit'>) {
  const { id } = await props.params
  return (
    <div>
      <h1 className="text-3xl font-bold">Edit Painting</h1>
      <p className="mt-2 text-muted-foreground">Editing {id} — Phase 2</p>
    </div>
  )
}
