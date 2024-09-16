const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});


app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

    
    fs.appendFile('userdata.txt', userData, (err) => {
        if (err) {
            console.error('Error saving user data:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('User data saved!');
        res.send('Thank you for signing up!');
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
