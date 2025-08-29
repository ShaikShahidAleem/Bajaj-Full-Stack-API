const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// User information (you can modify these)
const USER_INFO = {
  fullName: "john_doe",
  email: "john@xyz.com",
  rollNumber: "ABCD123",
  birthDate: "17091999" // DDMMYYYY format
};

// Array processing logic
function processArray(data) {
  try {
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const alphabetChars = [];

    data.forEach(item => {
      const str = String(item).trim();
      
      // Check if it's a number
      if (!isNaN(str) && str !== '') {
        const num = parseInt(str);
        sum += num;
        
        if (num % 2 === 0) {
          evenNumbers.push(str);
        } else {
          oddNumbers.push(str);
        }
      }
      // Check if it's an alphabet
      else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        // Add individual characters for concatenation
        alphabetChars.push(...str.split(''));
      }
      // Check if it's a special character
      else if (/^[^a-zA-Z0-9\s]+$/.test(str)) {
        specialCharacters.push(str);
      }
    });

    // Create concatenated string in reverse order with alternating caps
    const concatString = alphabetChars
      .reverse()
      .map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');

    return {
      is_success: true,
      user_id: `${USER_INFO.fullName}_${USER_INFO.birthDate}`,
      email: USER_INFO.email,
      roll_number: USER_INFO.rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: String(sum),
      concat_string: concatString
    };
  } catch (error) {
    throw new Error('Error processing array: ' + error.message);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Bajaj Full Stack API',
    version: '1.0.0',
    endpoints: {
      'POST /bfhl': 'Process array data',
      'GET /': 'API information'
    },
    user_info: {
      user_id: `${USER_INFO.fullName}_${USER_INFO.birthDate}`,
      email: USER_INFO.email,
      roll_number: USER_INFO.rollNumber
    }
  });
});
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Validation
    if (!data) {
      return res.status(400).json({
        is_success: false,
        error: 'Missing required field: data'
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Data must be an array'
      });
    }

    if (data.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: 'Data array cannot be empty'
      });
    }

    // Process the array
    const result = processArray(data);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error in /bfhl endpoint:', error);
    res.status(500).json({
      is_success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found',
    available_endpoints: ['GET /', 'POST /bfhl', 'GET /health']
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    is_success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}`);
  console.log(`Main endpoint: http://localhost:${PORT}/bfhl`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
