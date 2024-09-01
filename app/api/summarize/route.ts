// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { video_url } = await request.json();

//     const response = await fetch('http://localhost:5000/summarize', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ video_url }),
//     });

//     if (!response.ok) {
//       return NextResponse.json({ error: 'Failed to fetch summary' }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json({ summary: data.summary });
//   } catch (error) {
//     return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
//   }
// }
