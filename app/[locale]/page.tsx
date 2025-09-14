export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;

  console.log(params.q);
  return <div>{params.q}</div>;
}
