import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Domain API: Campaigns, Broadcasts, Template Messages & SMS Fallback
 */

let mockApprovedTemplates = [
  {
    id: 'tpl-1',
    name: 'welcome',
    category: 'Marketing',
    status: 'Approved',
    language: 'English',
    lastUpdated: '9/27/2026',
    bodyText: 'Welcome to AIONEX! 🎉 We are thrilled to have you onboard. Let us know how we can accelerate your WhatsApp marketing.',
    variables: ['name'],
    headerType: 'None'
  },
  {
    id: 'tpl-2',
    name: 'default_welcome_v2',
    category: 'Marketing',
    status: 'Approved',
    language: 'English (US)',
    lastUpdated: '9/27/2026',
    bodyText: 'Hello {{name}}, welcome to our VIP family! Enjoy 15% off your next consultation using code AIONEX15.',
    variables: ['name'],
    headerType: 'Image'
  },
  {
    id: 'tpl-3',
    name: 'welcome_wati_v3',
    category: 'Marketing',
    status: 'Approved',
    language: 'English (US)',
    lastUpdated: '9/27/2026',
    bodyText: 'Hi {{name}}, your enterprise WhatsApp Cloud API setup is completed and verified.',
    variables: ['name'],
    headerType: 'None'
  },
  {
    id: 'tpl-4',
    name: 'welcome_wati_v4',
    category: 'Marketing',
    status: 'Approved',
    language: 'English (US)',
    lastUpdated: '9/27/2026',
    bodyText: 'Greetings from AIONEX! Here is your quick onboarding tour link: {{link}}.',
    variables: ['name', 'link'],
    headerType: 'None'
  },
  {
    id: 'tpl-5',
    name: 'newthanks_v2',
    category: 'Marketing',
    status: 'Approved',
    language: 'Hebrew',
    lastUpdated: '9/27/2026',
    bodyText: 'תודה רבה שבחרת ב-AIONEX! נציג השירות שלנו יחזור אליך בהקדם.',
    variables: [],
    headerType: 'None'
  }
]

let mockLibraryTemplates = [
  {
    id: 'lib-1',
    title: 'Pre-Travel_Reminder',
    category: 'Travel',
    categoryTag: 'Travel',
    content: 'Hi [Customer Name],\n\nYour exciting trip to [Destination] is just around the corner! 🌍 Here is a quick reminder of your upcoming flight details:\n\n✈️ Flight: [Flight Number]\n📅 Departure Date: [Departure Date]\n🏨 Hotel: [Hotel Name]\n\nMake sure to pack everything you need and arrive at least 3 hours before. Safe travels,\n[Your Company Name]',
    language: 'English'
  },
  {
    id: 'lib-2',
    title: 'Booking_Confirmation',
    category: 'Travel',
    categoryTag: 'Travel',
    content: 'Great news! Your trip to [Destination] is confirmed! 🎉 Here are your booking details:\n\n🌍 Destination: [Destination Name]\n📅 Travel Dates: [Start Date] - [End Date]\n✈️ Flight Number: [Flight Number]\n🏨 Hotel: [Hotel Name]\n\n👉 You can access your full itinerary here: [Link]\nSafe travels and thank you for choosing [Travel Agency Name]!',
    language: 'English'
  },
  {
    id: 'lib-3',
    title: 'Prescription_Renewal',
    category: 'Healthcare',
    categoryTag: 'Healthcare',
    content: 'Hi {{name}},\n\nThis is a friendly reminder that it\'s time to renew your prescription for [Medication Name]. To ensure you don\'t run out of your medication, please submit a renewal request before [Date].\n\n👉 Click here to request your prescription renewal: [Link]\nThank you for choosing [Clinic/Hospital Name]!',
    language: 'English'
  },
  {
    id: 'lib-4',
    title: 'Lab_Test_Results',
    category: 'Healthcare',
    categoryTag: 'Healthcare',
    content: 'Hi {{name}},\n\nYour lab results from your recent tests at [Clinic/Hospital Name] are now ready for viewing.\n\n👉 Click here to view your results securely: [Link]\n\nIf you have any questions or would like to schedule a follow-up consultation with your doctor, feel free to contact us.\nThank you for choosing [Clinic/Hospital Name] for your healthcare needs.',
    language: 'English'
  },
  {
    id: 'lib-5',
    title: 'Order_Confirmation',
    category: 'E-Commerce',
    categoryTag: 'E-Commerce',
    content: 'Hi {{name}},\n\nThank you for shopping with us! Your order #[Order Number] has been confirmed.\n\nHere\'s a summary of your purchase:\n🛍️ <Product Name>\n🛍️ [Product Name]\n\nYour order will be shipped soon. You can track your order status here: [Link]\nThanks again for choosing [Your Company Name]!',
    language: 'English'
  },
  {
    id: 'lib-6',
    title: 'Order_Shipped',
    category: 'E-Commerce',
    categoryTag: 'E-Commerce',
    content: 'Hi {{name}},\n\nGreat news! Your order #[Order Number] has been shipped and is on its way to you.\n\nYou can track your delivery here: [Link]\nExpected delivery: within 2-3 business days.',
    language: 'English'
  },
  {
    id: 'lib-7',
    title: 'Order_Delivered',
    category: 'E-Commerce',
    categoryTag: 'E-Commerce',
    content: 'Hi {{name}},\n\nYour order #[Order Number] has been delivered! We hope you\'re loving your new items. ⭐\n\nIf you have any questions or concerns about your order, feel free to reach out to us right here on WhatsApp.',
    language: 'English'
  },
  {
    id: 'lib-8',
    title: 'Payment_Received',
    category: 'E-Commerce',
    categoryTag: 'E-Commerce',
    content: 'Hi {{name}},\n\nYour payment of [Amount] for order #[Order Number] has been successfully received. 💳\n\nThank you for your purchase! We\'ll keep you updated on the status of your shipment.',
    language: 'English'
  },
  {
    id: 'lib-9',
    title: 'Order_Support',
    category: 'E-Commerce',
    categoryTag: 'E-Commerce',
    content: 'Hi {{name}},\n\nThank you for reaching out to us. We\'ve received your inquiry regarding your order #[Order Number], and we want you to know that we\'re on it! 👀\nOur support team will respond shortly.',
    language: 'English'
  },
  {
    id: 'lib-10',
    title: 'Abandoned_Cart',
    category: 'E-Commerce',
    categoryTag: 'E-Commerce',
    content: 'Hi {{name}},\n\nWe noticed you left something behind in your cart! 👀 Don\'t miss out on your [Product Name]. Complete your purchase now and get [Discount] on your order using code: CART10.\n👉 [Link]',
    language: 'English'
  },
  {
    id: 'lib-11',
    title: 'Festival_Special_Offer',
    category: 'Festival',
    categoryTag: 'Festival',
    content: 'Happy Festive Season! 🪔✨ Celebrate with exclusive festive discounts across our entire collection! Use coupon FESTIVE25 to get flat 25% off today only.\n👉 [Link]',
    language: 'English'
  },
  {
    id: 'lib-12',
    title: 'Webinar_Admissions_Invite',
    category: 'Education',
    categoryTag: 'Education',
    content: 'Hi {{name}},\n\nJoin our live masterclass on [Topic] this Saturday at 4 PM IST. Learn directly from industry leaders. Reserve your seat here: [Link]',
    language: 'English'
  }
]

let mockTwilioConfig = {
  accountSid: '',
  authToken: '',
  twilioPhone: '',
  isConnected: false,
  fallbackEnabled: false
}

export const campaignsApi = {
  async getApprovedTemplates() {
    return { success: true, data: [...mockApprovedTemplates] }
  },

  async getLibraryTemplates(category = 'All') {
    let list = [...mockLibraryTemplates]
    if (category && category !== 'All') {
      list = list.filter((t) => t.category.toLowerCase() === category.toLowerCase())
    }
    return { success: true, data: list }
  },

  async createTemplate(template) {
    const newTpl = {
      ...template,
      id: `tpl-${Date.now()}`,
      status: 'Approved',
      lastUpdated: new Date().toLocaleDateString('en-US')
    }
    mockApprovedTemplates.unshift(newTpl)
    return { success: true, data: newTpl }
  },

  async deleteTemplate(id) {
    mockApprovedTemplates = mockApprovedTemplates.filter((t) => t.id !== id)
    return { success: true }
  },

  async duplicateTemplate(id) {
    const original = mockApprovedTemplates.find((t) => t.id === id)
    if (!original) return { success: false }
    const copy = {
      ...original,
      id: `tpl-${Date.now()}`,
      name: `${original.name}_copy`,
      lastUpdated: new Date().toLocaleDateString('en-US')
    }
    mockApprovedTemplates.push(copy)
    return { success: true, data: copy }
  },

  async getTwilioConfig() {
    return { success: true, data: { ...mockTwilioConfig } }
  },

  async saveTwilioConfig(config) {
    mockTwilioConfig = { ...mockTwilioConfig, ...config, isConnected: true, fallbackEnabled: true }
    return { success: true, data: { ...mockTwilioConfig } }
  }
}
