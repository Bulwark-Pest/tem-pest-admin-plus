export const transferMessageAlerts = {
  EXTERNAL_CALL: {severity:'success', content: "An email and text will be sent to the Specialist {name}.<br>Please take a moment to call them right now in order to live transfer the lead.<br>{phoneNumber}" },
  INTERNAL_CALL: {severity:'success', content: "Lead has been emailed to the appropriate team.<br>Please call a Specialist at extension {extension} to live transfer the lead." },
  EMAIL_ONLY: {severity:'success', content: `No live transfer needed.<br>Inform the customer/lead: "A specialist will be reaching out to you as soon as possible."` },
  BATON: {severity:'success', content: `No live transfer needed.<br>Inform the customer/lead: "A specialist will be reaching out to you as soon as possible."` },
  SELL_YOURSELF: {severity:'error', content: "(This will not transfer. Sell this yourself)" },
}
