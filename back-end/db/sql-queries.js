
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
 */

const create_table_task_list = `
    CREATE TABLE task_list (
        task_id INTEGER PRIMARY KEY NOT NULL,
        task_date TIMESTAMP DEFAULT CURRENT_DATE NOT NULL,
        task_title VARCHART(999) NOT NULL,
        task_description VARCHART(9999) NOT NULL,
        task_priority_lv INTEGER CHECK (task_priority_lv > 0 AND task_priority_lv <= 3) NOT NULL,
        task_is_complete BOOLEAN DEFAULT 0 NOT NULL,
        task_index INTEGER,
        task_start_date DATE, 
        task_finish_date DATE
    );
`;

const insert_value_in_task_list_table = `
    INSERT INTO task_list (
        task_title,
        task_description,
        task_priority_lv,
        task_start_date,
        task_finish_date,
        task_index
    )
    VALUES (
        ?,    
        ?,    
        ?,    
        ?,    
        ?,    
        ?
    );
`;

const update_record_in_task_list_table = `
    UPDATE task_list 
    SET task_title = ?,
        task_description = ?,
        task_priority_lv = ?,
        task_is_complete = ?,
        task_index = ?,
        task_start_date = ?,
        task_finish_date = ?
    WHERE task_id = ?;
`;

const update_task_index_in_task_list_table = `UPDATE task_list SET task_index = ? WHERE task_id = ?;`;

const delete_record_from_task_list_table = `
    DELETE FROM task_list WHERE task_id = ?;
`;

const select_specific_record_from_task_list_table = `
    SELECT * FROM task_list WHERE task_id = ?;
`;

const select_all_records_from_task_list = `
    SELECT * FROM task_list;
`;

module.exports = {
    create_table_task_list,
    select_specific_record_from_task_list_table,
    select_all_records_from_task_list,
    update_record_in_task_list_table,
    update_task_index_in_task_list_table,
    delete_record_from_task_list_table,
    insert_value_in_task_list_table
}