/**
 * Sorted list of evidence fields with descriptions.
 * @const
 */
export const EVIDENCE_FIELDS = {
  basic: {
    "Customer Name": "The name on the credit card used for a transaction.",
    "Email Address": "The email address associated with a transaction.",
    "Shipping Address": "The billing address associated with the credit card used for a transaction.",
    "Billing Address": "The address where the merchandise was shipped (if applicable).",
    "CC Expiration Date": "The expiration date on the credit card used for a transaction."
  },
  advanced: {
    "Location Address": "The physical location of the store or call center where a transaction took place.",
    "Terminal ID": "The unique ID number designating which specific POS terminal was used for a transaction.",
    "Authorization Number": "The unique number provided by the issuing (cardholder’s) bank at the time of transaction, signifying the transaction was authorized.",
    "AVS Code": "A three-digit code, located on the back of the credit card used for a transaction.",
    "Customer Notes": " Any type of additional customer comments or information not otherwise requested on this form.",
    "Phone Number": " A phone number associated with the credit card used for a transaction.",
    "Profile / Login Name": "",
    "Order Number": "The unique order number your business associates with a transaction.",
    "Verified by Visa Code": "",
    "Transaction Number": "The unique identifier number for a specific transaction, usually found on the receipt.",
    "Social Media Account": "Any information regarding a social media account the customer may have used to log onto your site.",
    "Customer Number": ""
  },
  sales: {
    "Voice Signature": "",
    "Digital Download Number": "",
    "Profile Chat Log": "The text log of any online chats held with the purchaser at the time of a transaction.",
    "Device ID": "",
    "Device Name": "",
    "Subscription ID": "",
    "Account Login ID": "",
    "IP Address": "",
    "IP Location": ""
  },
  industry: {
    "Event Date": "",
    "Service Date": "",
    "Cancellation Date": "",
    "Original Usage Date": "",
    "Last Usage Date": "",
    "Travel Sales Agent": "",
    "Ticket / Itinerary Number": "",
    "Ticketing Event Name": "",
    "Ticketing Sales Agent": ""
  }
};
