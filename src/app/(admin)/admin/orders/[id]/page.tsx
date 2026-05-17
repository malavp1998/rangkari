export default async function OrderDetailPage(props: PageProps<'/admin/orders/[id]'>) {
  const { id } = await props.params
  return (
    <div>
      <h1 className="text-3xl font-bold">Order {id}</h1>
      <p className="mt-2 text-muted-foreground">Order detail — Phase 5</p>
    </div>
  )
}
