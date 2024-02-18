import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function getSessionData(req: NextRequest) {
  const encryptedSessionData = cookies().get('session')?.value;
  return encryptedSessionData ? encryptedSessionData : null;
}

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('session');

  if (!cookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/profile', '/create', '/edit/:catalogId*'],
};
