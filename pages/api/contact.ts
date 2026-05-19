// pages/api/contact.ts — Contact form with email notification
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, company, message } = req.body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER || 'pratik.sde16@gmail.com',
      replyTo: email,
      subject: `🚀 New Contact: ${name}${company ? ` from ${company}` : ''}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px;">
          <div style="background: #070710; border-radius: 12px; padding: 32px; border: 1px solid #1E1E2E;">
            <h2 style="color: #00D4FF; margin: 0 0 24px; font-size: 1.3rem;">
              New Contact Form Submission
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 0.85rem; width: 100px;">Name</td>
                <td style="padding: 8px 0; color: #F0F0FF; font-size: 0.9rem; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 0.85rem;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00D4FF;">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 0.85rem;">Company</td>
                <td style="padding: 8px 0; color: #F0F0FF; font-size: 0.9rem;">${company}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 0.85rem;">Time</td>
                <td style="padding: 8px 0; color: #9CA3AF; font-size: 0.85rem;">${timestamp} IST</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #1E1E2E;">
              <p style="color: #6B7280; font-size: 0.85rem; margin: 0 0 8px;">Message</p>
              <div style="background: #0D0D1A; border-radius: 8px; padding: 16px; color: #D1D5DB; font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 24px;">
              <a href="mailto:${email}?subject=Re: Your message to Pratik Sharma"
                style="display: inline-block; background: #00D4FF; color: #000; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 0.85rem; font-weight: 600;">
                Reply to ${name} →
              </a>
            </div>
          </div>
          <p style="color: #4B5563; font-size: 0.75rem; text-align: center; margin-top: 16px;">
            Sent via pratik-portfolio contact form
          </p>
        </div>
      `,
      text: `New contact from ${name} (${email})${company ? ` at ${company}` : ''}\n\n${message}\n\nSent: ${timestamp}`,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    // Still return success to user even if email fails (log for debugging)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
