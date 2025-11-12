import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid code input' }, 
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY not found');
      return NextResponse.json(
        { error: 'API key not configured' }, 
        { status: 500 }
      );
    }

    console.log('🔍 Calling Gemini API...');

    // Use gemini-2.0-flash-exp (current working model)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this JavaScript code and explain what it does, potential bugs, and improvements:\n\n${code}`
            }]
          }]
        })
      }
    );

    console.log('📡 Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini error:', errorText);
      return NextResponse.json(
        { error: `Gemini API failed: ${response.status}`, details: errorText }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Success');
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('💥 Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}