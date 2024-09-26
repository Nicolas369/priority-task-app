import { useEffect, useRef } from "react";
import { ActionButtonComponent } from "./action-button";
import { InputTaskInterface, Styles } from "../definitions/pages-definitions";

const CHECKED_INPUT_SELECTOR = `input[type="radio"]:checked`;

const styles: Styles = {
  main: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "blueviolet",
    fontFamily: "monospace",
    fontSize: "1rem",
    borderRadius: "6px",
  },
  form: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    maxHeight: "550px",
  },
  formLabel: {
    width: "100%",
    padding: "5px 15px",
    boxSizing: "border-box",
  },
  labelPriority: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textarea: {
    width: "100%",
    backgroundColor: "transparent",
    border: "solid 1px #ffffff",
    boxSizing: "border-box",
    color: "#ffffff",
    borderRadius: "6px",
    padding: "5px",
    marginTop: "5px"
  },
  textareaSizeTile: {
    height: "40px",
    minHeight: "1.75rem",
    maxHeight: "125px",
    overflowY: "auto",
    fontSize: "1.5rem",
  },
  descriptionLabel: {
    height: "10%",
    fontSize: "1rem",
  },
  textareaSizeDescription: {
    height: "89%",
    fontSize: "1rem",
    marginTop: "1%",
  },
  descriptionContainer: {
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "red",
    padding: "5px 15px",

  },
  priorityLv: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: "solid 1px #ffffff",
    borderRadius: "6px",
    marginTop: "15px"
  },
  priorityInput: {
    height: "50x",
    width: "100%",
  },
};

export const InputTaskComponent = ({ task, taskSubmit }: InputTaskInterface) => {
  const titleArea = useRef(null);
  const descriptionArea = useRef(null);
  const prioritySection = useRef(null);

  const getTitleInput = (): HTMLTextAreaElement  => (titleArea as any).current;
  const getDescriptionsInput = (): HTMLTextAreaElement => (descriptionArea as any).current;
  const getPriorityLvSection = (): HTMLElement => (prioritySection as any).current;
  const getPriorityTaskInput = (selector: string) => (
    getPriorityLvSection()?.querySelector(selector) as HTMLInputElement
  );
  
  const getCheckedPriorityTaskInput = () => getPriorityTaskInput(CHECKED_INPUT_SELECTOR);

  const getFormValues = () => {
    const taskTitle = getTitleInput().value;
    const taskDescription =  getDescriptionsInput().value;
    const taskPriority = getCheckedPriorityTaskInput()?.value

    return {
      taskTitle,
      taskDescription,
      taskPriority
    }
  }

  const setFormValues = () => {
    const setFieldTaskTitle = (v: string) => getTitleInput().value = v;
    const setFieldTaskDescription = (v: string) => getDescriptionsInput().value = v
    const setFieldPriorityLevel = (lv: number) =>  {
      const priorityInputSelector = `#priorityLv${lv}`
      const priorityElement = getPriorityTaskInput(priorityInputSelector);
      if (priorityElement) priorityElement.checked = true; 
    }

    return {
      setFieldTaskTitle,
      setFieldTaskDescription,
      setFieldPriorityLevel
    }
  }

  const clearFormValues = () => {
    const { setFieldTaskDescription, setFieldTaskTitle } = setFormValues();
    getCheckedPriorityTaskInput().checked = false;
    setFieldTaskDescription("");
    setFieldTaskTitle("");
  }

  const initializeComponent = () => {
    const {
      setFieldTaskTitle,
      setFieldTaskDescription,
      setFieldPriorityLevel
    } = setFormValues();

    setFieldTaskTitle(task.title);
    setFieldTaskDescription(task.description);
    setFieldPriorityLevel(task.priorityLv);
  }
  
  const onTitleChange = () => {
    const titleAreaElement = getTitleInput();
    const titleAreaHeight = `${titleAreaElement.scrollHeight}px`;
    titleAreaElement.style.height = titleAreaHeight;
  };

  const submitTask = () => {
    const {
      taskTitle,
      taskDescription,
      taskPriority
    } = getFormValues();

    if ( taskTitle.length === 0 || taskDescription.length === 0 || !taskPriority ) {
      return;
    }
    
    const newFields = {
      title: taskTitle,
      description: taskDescription,
      priorityLv: parseInt(taskPriority)
    };

    taskSubmit({...task, ...newFields });
    clearFormValues();
  };
  
  useEffect(() => {
    initializeComponent();
  }, []);

  return (
      <div style={styles.main}>
          <form style={styles.form}>

              <label style={styles.formLabel}>
                  Task Title
                  <textarea
                    style={{ ...styles.textarea, ...styles.textareaSizeTile }}
                    onChange={onTitleChange}
                    ref={titleArea}
                    name="title"
                  />
              </label>

                <label style={{...styles.formLabel, height:"100%"}}>
                  <span style={styles.descriptionLabel}>Task Description</span>
                  <textarea
                    style={{ ...styles.textarea, ...styles.textareaSizeDescription }}
                    ref={descriptionArea}
                    name="description"
                  />
                </label>

              <div style={styles.formLabel}>
                  <fieldset style={styles.priorityLv} ref={prioritySection}>
                      <legend>Task Priority Level</legend>
                          <label style={styles.labelPriority}> 
                              level 1
                              <input style={styles.priorityInput} type="radio" id="priorityLv1" name="priorityLv" value={1}/>
                          </label>
                          
                          <label style={styles.labelPriority}> 
                              level 2
                              <input style={styles.priorityInput} type="radio" id="priorityLv2" name="priorityLv" value={2}/>
                          </label>

                          <label style={styles.labelPriority}> 
                              level 3
                              <input style={styles.priorityInput} type="radio" id="priorityLv3" name="priorityLv" value={3}/>
                          </label>
                  </fieldset>
              </div>
          </form>
          <ActionButtonComponent action={submitTask} description="submit"/>
      </div>
  );
};
