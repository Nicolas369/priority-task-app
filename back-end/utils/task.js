const buildTaskForSend = (task) => {
    return {
        title: task.title,
        description: task.description,
        priorityLv: task.priorityLv,
        isComplete: task.isComplete,
        index: task.index,
        startDate: task.startDate,
        finishDate: task.finishDate,
        date: task.date,
        id: task.id
    }
}

module.exports = {
    buildTaskForSend
}