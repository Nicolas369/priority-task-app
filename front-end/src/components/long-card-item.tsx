const styles = {
    consinter: {
        width: "450px",
        height: "50px",
        padding:"5px"
    },
    item: {
        width: "100%",
        height: "100%",
        border: "solid 1px #ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}

const LongCardItem = ({ item }: any) => {

    return (
        <div style={styles.consinter}>
            <div style={styles.item}>
                { item }
            </div>
        </div>
    )
}

export default LongCardItem;