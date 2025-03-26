# Invoice Auto-Sender Development Plan

## Priority-Based Development Steps

1. **Project Setup and Authentication** ✅

   - Create React app with TailwindCSS
   - Set up basic folder structure
   - Implement Google sign-in with extended scopes
   - Add "https://mail.google.com/" scope for Gmail access

2. **Document Upload and Preview**

   - Implement DOCX file upload to Firebase Storage ✅
   - Integrate react-doc-viewer for document preview
     - Install via `npm install react-doc-viewer`
     - Create viewer component to display uploaded DOCX
   - Enhance FileUpload component to store files in Firebase Storage

3. **Document Editing**

   - Create Cloud Function to extract text from DOCX files
     - Use docx library to parse document content
     - Return text content to client
   - Enhance InvoiceEditor component:
     - Display current date and invoice number
     - Add input fields for new values
     - Implement UI for confirming changes
   - Create Cloud Function for document modification:
     - Replace specified text using docx library
     - Save modified document back to Storage

4. **Email Scheduling**

   - Create email scheduling interface:
     - Select modified invoice file
     - Input recipient email(s)
     - Set schedule date and time
   - Set up Firestore collection for scheduled emails:
     - Store email details (recipients, subject, body)
     - Store reference to attachment in Storage
     - Store scheduled date/time

5. **Email Sending System**

   - Store user refresh tokens securely:
     - Create Cloud Function to receive and encrypt token
     - Store encrypted token in Firestore
   - Create Cloud Function for sending scheduled emails:
     - Query Firestore for due emails
     - Retrieve and decrypt user's refresh token
     - Generate new access token
     - Send email via Gmail API with attachment

6. **Email History and Management**

   - Create email history view
   - Add functionality to edit or cancel scheduled emails
   - Implement notification system for scheduled emails

7. **UI Refinement and Testing**

   - Enhance overall user interface
   - Add loading states and error handling
   - Implement comprehensive testing
