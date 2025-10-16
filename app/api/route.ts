import { NextResponse } from 'next/server';
import { version } from '../../package.json';

export const GET = () => NextResponse.json({ version });
