# Priority Task API: 

```
The task are order by time and then by index.

/**
 *   task schema
 *   +--------------+-------------+
 *   |   col_name   | data_type   |
 *   +--------------+-------------+
 *   | tile         | string      |
 *   | description  | string      |
 *   | priorityLv   | number      |
 *   | isComplete   | boolean     |
 *   | index        | number/null |
 *   | startDate    | Date/null   |
 *   | finishDate   | Date/null   |
 *   | date         | Date        |
 *   | id (key)     | number      |
 *   +--------------+-------------+
**/


task order example:

    mon     tue     wed     thu     fri
    task-1  task-1  task-1  task-1  task-1
    task-2  task-2  task-2  task-2
    .       task-3          task-3

    [now] <---- flow            
    time ---------->  


task:
[x] agregar sql-lite
[x] create new db and db-interface (sql)
[x] update handlers 
    [x] express
    [ ] graph-ql





```