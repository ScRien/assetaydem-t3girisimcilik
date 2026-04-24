import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('asset_aydem');
    const collection = db.collection('waitlist');

    // Duplicate check
    const existing = await collection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'Bu e-posta zaten ön erişim listesinde.' },
        { status: 409 }
      );
    }

    // Get IP
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    await collection.insertOne({
      email,
      ip,
      userAgent: req.headers.get('user-agent') || 'unknown',
      registeredAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Ön erişim listesine başarıyla eklendiniz!' },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Waitlist POST]', err);
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
