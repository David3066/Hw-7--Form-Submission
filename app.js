const express = require('express');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');

const app = express();

// Set up Handlebars
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: 'hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Ensure uploads directory exists
const publicDir = path.join(__dirname, 'public');
const uploadsDir = path.join(publicDir, 'uploads');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// GET /register - Display registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// POST /register - Handle form submission
app.post('/register', (req, res) => {
  const form = new multiparty.Form();
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send('Error processing form');
    }

    // Extract form fields
    const fullName = fields.fullName ? fields.fullName[0] : '';
    const email = fields.email ? fields.email[0] : '';
    const course = fields.course ? fields.course[0] : '';

    // Validate file upload
    if (!files.profilePicture || files.profilePicture.length === 0) {
      return res.status(400).send('Please upload a profile picture');
    }

    const uploadedFile = files.profilePicture[0];
    const fileExt = path.extname(uploadedFile.originalFilename);
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];

    // Validate file extension
    if (!allowedExtensions.includes(fileExt.toLowerCase())) {
      return res.status(400).send('Only JPG, JPEG, and PNG files are allowed');
    }

    // Create new filename
    const newFilename = Date.now() + fileExt;
    const newFilePath = path.join(uploadsDir, newFilename);

    // Move file from temp location to uploads folder
    fs.copyFile(uploadedFile.path, newFilePath, (err) => {
      if (err) {
        console.error('File copy error:', err);
        return res.status(500).send('Error saving file: ' + err.message);
      }

      // Delete the temporary file
      fs.unlink(uploadedFile.path, (err) => {
        if (err) {
          console.error('Error deleting temp file:', err);
        }
      });

      // Render profile page with user data
      res.render('profile', {
        fullName: fullName,
        email: email,
        course: course,
        profileImage: `/uploads/${newFilename}`
      });
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Register at http://localhost:${PORT}/register`);
});
