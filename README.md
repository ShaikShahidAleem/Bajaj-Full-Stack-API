# Bajaj Full Stack API - Array Processing Service

A comprehensive REST API built with Node.js that processes arrays and returns categorized data including even/odd numbers, alphabets, special characters, sum calculations, and string concatenation.

## Features - as mentioned in the given question pdf

- **Array Processing**: Categorizes input data into numbers, alphabets, and special characters
- **Number Analysis**: Separates even and odd numbers, calculates sum
- **String Processing**: Converts alphabets to uppercase, creates reverse concatenated strings with alternating caps
- **Error Handling**: Comprehensive validation and error responses
- **Security**: Rate limiting, CORS, and security headers
- **Frontend Interface**: Beautiful web interface for testing the API
- **Health Monitoring**: Health check endpoint for monitoring

## Tech Stack

- **Backend**: Node.js, Express.js
- **Security**: Helmet, CORS, Rate Limiting
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Deployment Ready**: Vercel, Railway, Render compatible


## API Endpoints

### POST /bfhl

Processes an array and returns categorized data.

**Request:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /

Returns API information and available endpoints.

### GET /health

Returns server health status and uptime.

##  Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure vercel.json** (optional)
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

### Railway Deployment

1. **Connect GitHub repository to Railway**
2. **Set environment variables** (if needed)
3. **Deploy automatically**

### Render Deployment

1. **Create new Web Service**
2. **Connect GitHub repository**
3. **Set build command**: `npm install`
4. **Set start command**: `npm start`

## Testing

### Using the Frontend

1. Open `http://localhost:3000`
2. Enter comma-separated values in the input field
3. Click "Process Array" to test

### Using cURL

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

### Using Postman

1. Create a new POST request
2. URL: `http://localhost:3000/bfhl`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "data": ["a", "1", "334", "4", "R", "$"]
   }
   ```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Cross-origin resource sharing enabled
- **Helmet**: Security headers for protection
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Graceful error responses

## Project Structure

```
bajaj-fullstack-api/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── public/
│   └── index.html         # Frontend interface
├── README.md              # Documentation
└── extract_pdf.py         # PDF extraction utility
```
