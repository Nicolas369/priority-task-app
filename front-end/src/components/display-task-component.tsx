import { DisplayTaskInterface, Styles } from "../definitions/pages-definitions";

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
      height: "100%",
      width: "100%",
      padding: "15px",
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
      // color: "#ffffff",
      borderRadius: "6px",
      padding: "5px",
      margin: "0px"
    },
    textareaSizeTile: {
      minHeight: "75px",
      maxHeight: "150px",
      overflowY: "auto",
      fontSize: "1.5rem",
    },
    textareaSizeDescription: {
      height: "100%",
      minHeight: "200px",
      fontSize: "1rem",
      margin: "0px"
    },
    priorityLv: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      border: "solid 1px #ffffff",
      borderRadius: "6px"
    },
    priorityInput: {
      height: "50x",
      width: "100%",
    },
  };

export const DisplayTaskComponent = ({ taskSelected }: DisplayTaskInterface) => {

    const displayPriorityLv = (priorityLv: number) => {
      if (taskSelected.isComplete) {
        return {
          backgroundColor: "#ffffff",
          opacity: 0.5,
          color: "blueviolet"
        } 
      }

      switch (priorityLv) {
        case 1:
          return {backgroundColor: "#FF2511"};
        case 2:
          return {backgroundColor: "#FFAC1C"};
        case 3:
          return {backgroundColor: "#FBDD00"};
        default: 
          return {backgroundColor: "blueviolet"};
      }
    }

    const priorityStyles = {
      ...styles.priorityLv,
      ...displayPriorityLv(taskSelected?.priorityLv!),
    }

    return (
      <div style={styles.main}>
        <section style={styles.form}>

          <label style={{...styles.formLabel}}>
              Task Title
              <p style={{ ...styles.textarea, ...styles.textareaSizeTile }}>
                  {taskSelected?.title}
              </p>
          </label>

          <label style={styles.formLabel}>
              Task Description
              <p style={{ ...styles.textarea, ...styles.textareaSizeDescription }}>
                  {taskSelected?.description}
              </p>
          </label>

          <div style={styles.formLabel}>
              <fieldset style={priorityStyles} >
                {
                  taskSelected.isComplete 
                  ? (`Task Completed`)
                  : (` Priority: ${taskSelected?.priorityLv}`)
                }
              </fieldset>
          </div>
        </section>
      </div>
    )
}
