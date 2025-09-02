import { Typography } from '@mui/material';

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users', { method: 'GET', credentials: 'include' });
  return res.json();
}

export default async function Home() {
  const users = await getUsers();

  return (
    <div>
      <Typography variant='h4'>{JSON.stringify(users)}</Typography>
    </div>
  );
}
