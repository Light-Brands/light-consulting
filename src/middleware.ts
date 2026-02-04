import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GO_HOSTNAMES = ['go.lightbrands.ai', 'go.lightbrandconsulting.com'];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const hostname = host.split(':')[0];

  if (GO_HOSTNAMES.includes(hostname)) {
    const url = request.nextUrl.clone();
    const path = url.pathname;

    // Rewrite go.lightbrands.ai/* to /go/*
    if (path === '/') {
      url.pathname = '/go';
    } else if (!path.startsWith('/go')) {
      url.pathname = `/go${path}`;
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next.js internals
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|js|css)).*)',
  ],
};
