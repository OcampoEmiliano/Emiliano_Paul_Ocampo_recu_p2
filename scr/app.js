const express = require('express');
const students = require('./db')

const app = express();
app.use(express.json());
const PORT = 4321;

app.get('/students', (req,res) => {
    res.json(students)
});

app.get('/students/:id',(req,res) => {
    const iden = req.params.id
const id = +iden;
    
    const getStudent = students.find((student) => student.id === id)
    res.json(getStudent)
});

app.post('/students',(req,res) => {

    try {
    const id = new Date().getTime();
    const {fullName,age,curse} = req.body;
    

        if (!fullName.trim() ||!age.trim() ||!curse.trim()) {
        return res.status(400).send("datos no validos")
    } else if (typeof fullName !== 'string' || typeof curse !== 'string' || typeof age !== 'number') {
        return res.status(400).send('Los tipos de datos de nombre completo, adad y curso no son válidos');

    }

        students.push({
            "id":id,
            "fullName":fullName,
            "age":age,
            "curse":curse
    });
        res.json({ message: 'alumno agregado' });

    } catch (error) {
        res.status(400).send("error al agregar")
    }

});

app.put('/students/:id',(req,res) => {
    try {
    const iden = req.params.id;
    const id = +iden;
    const { fullName, age, curse } = req.body;

    if (!fullName.trim() ||!age.trim() ||!curse.trim()) {
        return res.status(400).send("datos no validos")
    } else if (typeof fullName !== 'string' || typeof age !== 'string' || typeof curse !== 'number') {
        return res.status(400).send('Los tipos de datos de nombre completo, edad y curso no son válidos');
    }

    const getStudent = students.findIndex((student) => student.id === id);
    getStudent.fullName = fullName;
    getStudent.age = age;
    getStudent.curse = curse;

    res.json({ message: "estudiante actualizado",getStudent });
} catch (error) {
    res.status(400).send("error al actualizar")
}
});

app.delete("/students/:id", (req, res) => {
    const idStu = req.params.id;
    const id = +idStu;

    const getStudent = libros.find((libros) => libros.id === id);
    const studentIndex = students.indexOf(getStudent);
    students.splice(studentIndex, 1);

    res.json({ message: "alumno eliminado" });
});

app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));