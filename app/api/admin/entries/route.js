import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  return auth?.value === process.env.ADMIN_PASSWORD;
}

// GET: list all waitlist entries
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('asset_aydem');
    const entries = await db
      .collection('waitlist')
      .find({})
      .sort({ registeredAt: -1 })
      .toArray();

    return NextResponse.json(
      entries.map((e) => ({
        id: e._id.toString(),
        email: e.email,
        ip: e.ip,
        registeredAt: e.registeredAt,
        userAgent: e.userAgent,
      }))
    );
  } catch (err) {
    console.error('[Admin GET entries]', err);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

// DELETE: remove a single entry by id
export async function DELETE(req) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID gerekli.' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('asset_aydem');
    await db.collection('waitlist').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Admin DELETE entry]', err);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
