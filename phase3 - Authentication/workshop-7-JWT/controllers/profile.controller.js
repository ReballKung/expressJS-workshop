const getProfile = (req, res) => {
    const name = 'Sukrit Saeliao';
    const role = 'FullStack'
    const skills = ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "PHP", "C", "C#", "Blazor", "HTML", "CSS", "TailwindCSS", "Bootstrap"];


    res.json({
        name,
        role,
        skills
    });
};

module.exports = {getProfile}