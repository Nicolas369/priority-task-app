# Priority Task API: 

```
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

    The task are order by time and then by index.
    example:

    mon     tue     wed     thu     fri
    ---------------------------------------
    task-1  task-1  task-1  task-1  task-1
    task-2  task-2  task-2  task-2
            task-3          task-3

    [now] <---- flow            
    time ---------->  

```

```
    future:
        [ ] auth 
        [ ] user db 
        [ ] user-task corelation
        [ ] nest.js ? is an backend angular (sirve como para haberlo implementado)
```