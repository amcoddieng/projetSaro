const app = require('./src/app');
const db = require('./config/database');

const PORT = process.env.PORT || 3000;

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
