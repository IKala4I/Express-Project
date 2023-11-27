export const findStudentByWorstScore = (students, type) => {
    const firstStudentName = students[0].name
    const firstStudentScore = students[0].scores.find(score => score.type === type).score

    const worstStudent = {
        name: firstStudentName,
        score: firstStudentScore
    }

    students
        .filter(student => student.name !== firstStudentName)
        .forEach(student => {
            const score = student.scores.find(score => score.type === type).score

            if (score < worstStudent.score) {
                worstStudent.name = student.name
                worstStudent.score = score
            }
        })

    return worstStudent
}