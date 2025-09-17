interface Props {
  params: Promise<{ id: string }>;
}

const TrackPage = async (props: Props) => {
  const reservationId = (await props.params).id;

  return <div>{reservationId}</div>;
};

export default TrackPage;
