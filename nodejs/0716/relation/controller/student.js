const { Student, Course, StudentCourse } = require('../models')

// 학생생성
exports.createStudent = async (req, res) => {
    try {
        const { name } = req.body
        const result = await Student.create({ name })
        res.json({ result: true, response: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}
// 코스 생성
exports.createCourse = async (req, res) => {
    try {
        const { title } = req.body
        const result = await Course.create({ title })
        res.json({ result: true, response: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}

// 코스에 학생등록 생성
exports.createSC = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const result = await StudentCourse.create({ studentId, courseId })
        res.json({ result: true, response: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}
// 학생이 어트 코스에 등록되어 있는지 가져오기
exports.getStudent = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Student.findByPk(id, {
            include: [{ model: Course }]
        })
        res.json({ result: true, response: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}
// 코스에 어떤 학생들이 등록되어 있는지 가져오기
exports.getCourse = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Course.findByPk(id, {
            attributes: ['title'],
            include: [{ model: Student }]
        })
        res.json({ result: true, response: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}

// 학생 삭제
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.body;
        await StudentCourse.destroy({ where: { studentId: id } });
        await Student.destroy({ where: { id } });
        res.json({ result: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.body;
        await StudentCourse.destroy({ where: { courseId: id } });
        await Course.destroy({ where: { id } });
        res.json({ result: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}