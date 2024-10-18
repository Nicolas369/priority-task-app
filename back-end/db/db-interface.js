const sqlite3 = require("sqlite3").verbose();
const SQL = require("./sql-queries");


/**
 *   task schema
 *   +--------------+-----------+
 *   |   col_name   | data_type |
 *   +--------------+-----------+
 *   | tile         | string    |
 *   | description  | string    |
 *   | priorityLv   | number    |
 *   | isComplete   | boolean   |
 *   | index        | number    |
 *   | startDate    | Date/null |
 *   | finishDate   | Date/null |
 *   | date         | Date      |
 *   | id (key)     | number    |
 *   +--------------+-----------+
**/


/**
 * @description Connect to the Database
 * @private
 */
const openConnection = () => {
    return new sqlite3.Database(__dirname + "/task.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err);
    });
}

/**
 * @description Write Database
 * @private
 */
const queryWriteDB = async (db, sql, arrayOfParams, errorDescription) => {
    return await new Promise((resolve) => {

        const callBack = (err) => {
            if (err) {
                console.error(err);
                throw new Error(errorDescription);
            }
            resolve();
        }

        db.run(sql, [...arrayOfParams], callBack);
    })
}


/**
 * @description Make query to Database
 * @private
 */
const queryReadDB = async (db, sql, arrayOfParams, errorDescription) => {
    return await new Promise((resolve) => {

        const callBack = (err, rows) => {
            if (err) {
                console.error(err);
                throw new Error(errorDescription);
            }
            resolve(rows);
        }

        arrayOfParams
        ? db.all(sql, [...arrayOfParams], callBack)
        : db.all(sql, callBack);
    })
}


/**
 * @description create new task_list TABLE
 * @private
 */
const createTaskTable = () => {
    const db = openConnection();

    db.run(SQL.create_table_task_list,(err) => {
        if (err) return console.error(err);
    });

    db.close();
}


/**
 *  @param  { number } taskId 
 *  @return { Array | null } - return Array of Tasks 
 *  @throws - Error in bad db query
 *  @description - SELECT all task records in TABLE task_list ···
 */
const getTaskList = async () => {
    const db = openConnection();

    const taskList = await queryReadDB(
        db, 
        SQL.select_all_records_from_task_list,
        null,
        "Error in SELECT all Task in task_list Table query: select_all_records_from_task_list"
    )

    db.close();
    return taskList;
}


/**
 *  @param { Array } tasks - Array of task
 *  @description UPDATE all index of the past task Array following the index position of array 
 */
const updateListTaskIndex = async (tasks) => {
    const db = openConnection();

    for (let index = 0; index < tasks.length; index++ ) {
        let task = tasks[index];
        console.log(task);
                
        await queryWriteDB(
            db, 
            SQL.update_task_index_in_task_list_table,
            [index, task.id], 
            "Error in UPDATE Task in task_list Table query: update_task_index_in_task_list_table"
        );
    }

    db.close();
}


/**
 *  @param { Array } task 
 *  @description INSERT task record in task_list TABLE with a task object pass as array:···
 * 
 *  @param task_title       - task[0]: { string  }
 *  @param task_description - task[1]: { string  }
 *  @param task_priority_lv - task[2]: { number  }
 *  @param task_start_date  - task[3]: { string  }
 *  @param task_finish_date - task[4]: { string  }
 */
const addNewTask = async (task) => {
    const db = openConnection();
    await queryWriteDB(
        db, 
        SQL.insert_value_in_task_list_table,
        [...task], 
        "Error in Inserting new Task in task_list Table query: insert_value_in_task_list_table"
    );
    db.close();
}


/**
 *  @param { Array } task 
 *  @description UPDATE task record in task_list TABLE with a task object pass as array:···
 * 
 *  @param task_title       - task[0]: { string  }
 *  @param task_description - task[1]: { string  }
 *  @param task_priority_lv - task[2]: { number  }
 *  @param task_is_complete - task[3]: { boolean }
 *  @param task_index       - task[4]: { number  }
 *  @param task_start_date  - task[5]: { string  }
 *  @param task_finish_date - task[6]: { string  }
 *  @param task_id          - task[7]: { number  }
 */
const updateTask = async (task) => {
    const db = openConnection();

    await queryWriteDB(
        db,
        SQL.update_record_in_task_list_table,
        [...task],
        "Error in UPDATE Task in task_list TABLE query: update_record_in_task_list_table"
    )

    db.close();
}


/**
 *  @param { number } taskId 
 *  @description DELETE task record in task_list TABLE with a task_id ···
 */
const deleteTask = async (taskId) => {
    const db = openConnection();

    await queryWriteDB(
        db,
        SQL.delete_record_from_task_list_table,
        [taskId],
        "Error in DELETE Task in task_list TABLE query: delete_record_from_task_list_table"
    )

    db.close();
}


/**
 *  @param  { number } taskId 
 *  @return { Object } 
 *  @description SELECT task record in task_list TABLE with a task_id ···
 */
const selectTask = async (taskId) => {
    const db = openConnection();

    const task = await queryReadDB(
        db, 
        SQL.select_specific_record_from_task_list_table,
        [taskId],
        "Error in SELECT one Task by id in task_list Table query: select_all_records_from_task_list"
    )

    db.close();
    return task.pop();
}

module.exports = {
    getTaskList,
    addNewTask,
    updateTask,
    updateListTaskIndex,
    deleteTask,
    selectTask
}