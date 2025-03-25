# Product Requirements Document (PRD)

## 1. **Product Overview**

**Name:** Invoice Auto-Sender\
**Description:** A web app that allows users to upload Google Doc invoices, automatically updates the invoice date, allows minor modifications, and sends it to specified recipients via Gmail API on a scheduled basis.
**Target Audience:** Freelancers, small business owners, and professionals who send recurring invoices.

---

## 2. **Core Features**

### 2.1 Invoice Input

- Users **provide a Google Docs link** for their invoice.
- The app fetches and **parses the document content** using the Google Docs API.
- Users can **edit the date and amount** before sending.
- Invoice is converted to **PDF format** before sending.

### 2.2 Auto-Update Invoice Fields

- **Date** automatically updates each month.
- **Amount** remains the same (unless manually modified).
- Users receive a **review notification** before the invoice is sent.

### 2.3 Email Scheduling & Sending

- Users add **multiple recipient emails**.
- Invoices are sent via **Gmail API** on a recurring schedule.
- **Reminder notification** is sent before dispatch.
- Users receive a **confirmation notification** after successful sending.

### 2.4 Google Authentication

- Users **sign in via Google OAuth** for a seamless experience.
- Ensures **secure** integration with Google Docs & Gmail API.

### 2.5 Web App Interface

- **Simple dashboard** to view & manage invoices.
- **Form to update invoice details** before sending.
- **Email history/log** of sent invoices.

---

## 3. **Technical Stack**

### 3.1 Frontend

- **React.js** (for UI)
- **TailwindCSS** (for styling)

### 3.2 Backend

- **Node.js + Express.js** (for API handling)
- **Google Docs API** (for invoice editing)
- **Gmail API** (for sending invoices via email)

### 3.3 Database

- **Firebase Firestore** (to store user & invoice details)
- **PostgreSQL (optional)** if structured storage is needed

### 3.4 Third-Party Services

- **Gmail API** (for sending emails, free for up to 500 emails/day)
- **Google Docs API** (for editing invoices)
- **SendGrid (optional backup email provider)**

---

## 4. **User Flow**

1. **User logs in via Google OAuth.**
2. **User uploads a Google Docs link** of their invoice.
3. **App fetches and allows modifications** (date & amount).
4. **User enters recipient email(s).**
5. **System schedules invoice for monthly sending.**
6. **Reminder notification is sent before dispatch.**
7. **Invoice is converted to PDF and sent via Gmail API.**
8. **User receives confirmation of sent invoice.**

---

## 5. **Security & Privacy Considerations**

- **Google OAuth** ensures secure authentication.
- **Data encryption** for storing invoice details.
- **Rate-limiting & API key protection** to prevent abuse.
- **Secure API communication** using HTTPS.
- **Access control mechanisms** to prevent unauthorized usage.
- **Privacy policy & user consent** for accessing Google Docs.

---

