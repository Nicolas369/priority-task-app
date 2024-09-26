
import { ModalSectionInterface, Styles } from "../../definitions/pages-definitions";

const styles: Styles = {
    main: {
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "1000",
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modal: {
        width: "60vw",
        height: "80vh",
        backgroundColor: "blueviolet",
        border: "solid 1px #ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    modalHeader: {
        width: "100%",
        height: "10vh",
        border: "solid #ffffff",
        borderWidth: "0px 0px 1px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        overflowX: "scroll",
        paddingLeft: "25px",
    },
    modalBody: {
        width: "100%",
        height: "70vh",
        overflow: "scroll",
    }
}

export const ModalSection = ({ displayComponent, secondaryActions }: ModalSectionInterface) => {

    return (
        <div style={styles.main}>
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    {secondaryActions}  
                </div>
                <div style={styles.modalBody}>
                    { displayComponent }
                </div>
            </div>
        </div>
    )
}