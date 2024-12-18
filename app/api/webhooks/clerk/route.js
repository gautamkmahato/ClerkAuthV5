import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body);

  // Process the user.created event
  if (evt.type === 'user.created') {
    console.log('Received user.created event:', evt);

    const userData = evt.data;
    const { id, email_addresses, first_name, last_name } = userData;

    // Fallback for missing fields
    const email = email_addresses?.[0]?.email_address || 'no-reply@example.com';
    const username =
      userData.username || `${first_name || ''} ${last_name || ''}`.trim() || email.split('@')[0];

    // Prepare data for your API
    const data = {
      clerk_id: id,
      email,
      username,
    };

    console.log('Data to send to API:', data);

    try {
      const response = await fetch('https://sqliteexample.onrender.com/api/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }); 

      const result = await response.json();
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  }

  return new Response('Webhook received', { status: 200 })
}