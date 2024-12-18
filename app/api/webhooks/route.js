import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function GET(req) {
  

  return new Response('Webhook received', { status: 200 })
}