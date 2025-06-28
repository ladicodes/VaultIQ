vaultiq-backend/
├── api/                  # Express/Fastify backend
│   ├── routes/           # Upload, vault, user routes
│   ├── controllers/
│   ├── middleware/       # Auth, file parsing
│   └── services/         # VaultService, ChainlinkService
├── ai-verifier/          # Python-based AI microservice
│   ├── main.py           # FastAPI app
│   ├── models/           # NLP/CV pipelines
│   └── utils/
├── chainlink/            # Functions + contracts
│   ├── contracts/
│   ├── functions/
│   └── deploy/
├── storage/              # IPFS or AWS S3 integration
├── db/                   # Prisma/SQLAlchemy + migrations
├── jobs/                 # Queue workers
├── tests/
└── .env

api/index.js
Main backend server.

Sets up the Express server and routes.

Handles file uploads and JSON body parsing.

Receives document + metadata from the frontend.

Calls the AI verifier and IPFS upload service.

Saves the result in the database.

Secured with an authentication middleware.

api/services.js
Handles external services.

uploadToIPFS: Uploads the document to IPFS and returns a public URL.

callVerifierAPI: Sends the document + metadata to the AI verifier API and gets back a score/status.

api/middleware/auth.js
Wallet-based authentication.

Checks the user's wallet address (probably via a signature or token).

Makes sure only authenticated users can submit documents.



uploads/
Temporary file storage.

Stores files locally before uploading them to IPFS.

Managed by multer (the upload middleware).

node_modules/ + package.json
Project dependencies and setup.

Lists all required npm packages (like Express, Prisma, Multer, etc.).

Includes scripts to run the server and manage Prisma.


this part will explain what functions i made and what each files function for:
for the index.js: This backend part  powers the document verification part of the VaultIQ app. It lets users upload a document (like a PDF), checks if they’re authenticated, and then:

Uploads the document to IPFS – a decentralized storage system.

Sends the document + extra info to an AI verifier – to check if it’s legit.

Stores the result in the database – including the verification status, score, and user wallet.

What Happens When You Submit a Document?
The user uploads a file through the frontend.

The backend:

Checks if the user is logged in (via wallet).

Saves the file temporarily.

Uploads it to IPFS.

Sends it to the AI to verify.

Saves everything in the database.

Returns a response with:

Document ID

Verification status

AI confidence score

 Security
Uses middleware to check that the request is coming from an authenticated user (probably via wallet signature).


part remaining for the document verification part:

prisma/schema.prisma
Database schema definition.

Defines the Asset model and its fields (file URL, metadata, score, owner, etc.).

Used by Prisma to generate the database structure.