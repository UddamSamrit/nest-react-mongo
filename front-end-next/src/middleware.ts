import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token') || request.headers.get('Authorization');
    console.log("token"+token);
    const publicPaths = ['/auth/login', '/auth/register'];

    if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|static).*)'],
};
