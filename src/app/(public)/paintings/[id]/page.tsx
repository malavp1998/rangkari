export default async function PaintingDetailPage(props: PageProps<'/paintings/[id]'>) {
  const { id } = await props.params
  return (
    <div className="min-h-screen p-8">
      <p className="text-muted-foreground">Painting detail for {id} — Phase 3</p>
    </div>
  )
}
