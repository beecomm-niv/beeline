interface Props {
  children: React.ReactNode;
}

const SettingsPage = (props: Props) => {
  return <div>SettingsPage{props.children}</div>;
};

export default SettingsPage;
