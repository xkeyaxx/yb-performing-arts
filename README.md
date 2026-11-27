# YB Performing Arts — complete Next.js project

This is a complete standalone Next.js website project with five separate pages:

- `/` — Home
- `/events` — Public event listings (no sample/filler events)
- `/discussion` — Visitors can publish discussion posts
- `/tickets` — Visitors can submit ticket/registration requests for published events
- `/cabinet` — Cabinet members sign in and publish new events

## Requirements

- Node.js 20.9 or newer
- npm

## Open and run in VS Code

1. Extract the ZIP file.
2. In VS Code, choose **File → Open Folder** and select the extracted `yb-performing-arts-complete` folder.
3. Open the VS Code terminal (**Terminal → New Terminal**).
4. Run:

   ```bash
   npm install
   ```

5. Copy `.env.local.example` to a new file named `.env.local` in the project root. Set your own private values:

   ```env
   CABINET_PASSCODE=choose-a-private-passcode
   CABINET_SESSION_SECRET=use-a-long-random-secret-string
   ```

   Do not share `.env.local` or commit it to source control. If the cabinet values are missing, cabinet login will not work.

6. Start the website:

   ```bash
   npm run dev
   ```

7. Open **http://localhost:3000** in your browser.

To stop the local server, press `Ctrl + C` in the terminal.

## How the features work

- Discussion posts are submitted through `/api/discussion` and saved to `data/site-data.json`.
- Cabinet sign-in is checked on the server. Only a valid cabinet session can create events through `/api/events`.
- New events are saved and appear automatically on Home, Events, and Tickets.
- Ticket requests are saved through `/api/tickets`; they are registration requests, not paid checkout transactions.
- Events, posts, and ticket requests persist in the local JSON data file across local server restarts. The data file starts empty intentionally.

## Important deployment note

This project uses a local JSON file as a simple persistent store for running the site on your own computer. It is suitable for local development and demonstration. A public multi-user deployment needs a hosted database (for example PostgreSQL/Supabase) and a production authentication setup; many hosting platforms do not provide durable writable local files. Ticket payments are not connected; a payment provider and its server-side checkout integration would be needed to collect money.

The original visual direction is retained and refined: Playfair Display and DM Sans typography, deep burgundy, black, warm cream, and antique gold. No orange tones are used.
