const express = require('express');
const app = express();
const PORT = 8001

app.get('/api/profile', (req, res) => {
    const name = 'Sukrit Saeliao';
    const role = 'FullStack'
    const skills = ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "PHP", "C", "C#", "Blazor", "HTML", "CSS", "TailwindCSS", "Bootstrap"];


    res.json({ 
         name,
         role,
         skills
    })
})

app.post('/api/hello', (req , res) => {
    res.json({ message: "This is a POST method" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});