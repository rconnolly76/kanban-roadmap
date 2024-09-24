import { NextResponse } from 'next/server';

const roadmapAPI = 'https://sitecore.atlassian.net/rest/api/3/search?jql=project=SMAP&fields=summary,status,customfield_15464; // Replace with your actual API endpoint

export async function GET() {
  try {
    // Fetch data from the external API
    const response = await fetch(roadmapAPI);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: 500 });
    }

    const data = await response.json();

    // Return the fetched data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmap data' }, { status: 500 });
  }
}