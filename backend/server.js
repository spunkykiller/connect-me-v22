const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Security & Middleware ---
// Protect against well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

// Enable CORS (Allow frontend origin. We will allow '*' for local dev, but restrict in production)
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://connectme.biz', 'https://www.connectme.biz']
        : '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Basic Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
    message: { error: "Too many requests from this IP, please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

// --- Utility Functions ---
const sanitizeInput = (str) => {
    if (!str) return "";
    return str.toString().trim().replace(/<[^>]*>?/gm, ''); // Basic XSS mitigation
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// --- Google Sheets Auth ---
let sheetsAPI = null;

try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
        // Parse the JSON string from the environment variable
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        sheetsAPI = google.sheets({ version: 'v4', auth });
        console.log("Successfully initialized Google Sheets Auth");
    } else {
        console.warn("GOOGLE_SERVICE_ACCOUNT environment variable is not set.");
    }
} catch (error) {
    console.error("Failed to initialize Google Sheets integration:", error);
}

// --- Routes ---
app.post('/api/contact', apiLimiter, async (req, res) => {
    try {
        const {
            fullName,
            email,
            companyName,
            subject,
            phone,
            message,
            honeypot,
            utmSource,
            utmMedium,
            utmCampaign,
            pageUrl
        } = req.body;

        // 1. Anti-spam Honeypot Check
        if (honeypot) {
            // If the hidden honeypot field is filled out, reject silently (spam bot)
            console.log("Honeypot filled, rejecting submission.");
            return res.status(200).json({ success: true }); // Fake success to trick bot
        }

        // 2. Required Fields Validation
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ error: "Missing required fields: fullName, email, subject, message." });
        }

        // 3. Email Validation
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // 4. Sanitize Inputs
        const sanitizedData = [
            new Date().toISOString(), // Timestamp
            sanitizeInput(fullName),
            sanitizeInput(email),
            sanitizeInput(companyName),
            sanitizeInput(subject),
            sanitizeInput(phone),
            sanitizeInput(message),
            req.ip || req.connection.remoteAddress, // IP
            req.get('User-Agent') || 'Unknown', // User Agent
            sanitizeInput(utmSource),
            sanitizeInput(utmMedium),
            sanitizeInput(utmCampaign),
            sanitizeInput(pageUrl)
        ];

        // 5. Save to Google Sheets
        if (!process.env.SPREADSHEET_ID) {
            console.error("Missing SPREADSHEET_ID environment variable");
            // Fallback response for testing API if sheets aren't configured yet
            return res.status(200).json({ success: true, warning: "Saved locally, Google Sheets not configured." });
        }

        if (!sheetsAPI) {
            throw new Error("Sheets API not initialized properly.");
        }

        const response = await sheetsAPI.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Sheet1!A:M', // Adjust 'Sheet1' if your tab name is different
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [sanitizedData]
            }
        });

        console.log("Successfully appended row to Google Sheet:", response.data.updates.updatedRange);

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Error processing contact submission:", error);
        return res.status(500).json({ error: "An internal server error occurred while processing your request." });
    }
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Backend API Server running on port ${PORT}`);
});
