📝 Notion Clone – Built with Next.js

A fully functional Notion-style workspace built using Next.js, featuring page creation, nested documents, rich text editing, authentication, and a modern UI.
This project mimics the core experience of Notion while remaining lightweight, fast, and extendable.

🚀 Features
🔐 Authentication
Secure auth using Clerk
User-specific documents & data isolation

📄 Documents & Hierarchy
Create, update, and delete documents
Nested pages (infinite hierarchy)
Sidebar with real-time syncing
Page icons, cover images, and titles

🖊️ Rich Text Editing
Powerful editor built with TipTap
Text formatting (bold, italic, underline, headings, lists, etc.)
Keyboard shortcuts
Auto-saving

🌙 UI/UX

Modern Notion-inspired layout
Light & dark mode
Smooth transitions
Responsive design
Uses Tailwind CSS and shadcn/ui

☁️ Database & Backend
Built with Convex 
Real-time updates
Optimized queries
Secure document-level access

🧰 Tech Stack
Category	Tech
Framework	Next.js 14 / App Router
Styling	Tailwind CSS, shadcn/ui
Editor	TipTap 
Backend	Convex 
Auth	Clerk
Deployment	Vercel

📦 Installation & Setup
git clone https://github.com/keliaa1/mento.git
cd notion-clone
npm install


Add your environment variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CONVEX_DEPLOYMENT=


(Replace with the variables required for your setup)

Run the development server:

npm run dev


Open your browser at:

http://localhost:3000



🧪 Future Improvements
Drag-and-drop page reordering
Collaborative editing
Templates
File & image uploads
AI-powered document creation


📄 License
This project is licensed under the MIT License.
