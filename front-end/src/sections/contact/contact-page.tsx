import { Box, Typography } from "@mui/material";
import { displayCenter, appBorder } from "../../theme/style";
import { ContainerComponent } from "../../components/container-component";
import { Styles } from "../../definitions/global-definitions";

export const ContactPage = () => {

  const styles: Styles = {
    container: {
      height: "100%",
      width: "100vw",
      ...displayCenter,
    },
    creatorBannerImage: {
        height: "125px",
        marginBottom: "-62.5px"
    },
    creatorImage: {
      borderRadius: "50%",
      height: "125px",
      width: "125px",
      marginBottom: "1rem",
    },
    creatorName: {
      fontSize: "1.75rem",
    },
    creatorTitle: {
        fontSize: "1.25rem",
        marginBottom: "1rem",
        opacity: 0.85,
    },
    socialNetworkBtn: {
      marginTop: ".15rem",
      height: "auto",
      width: "250px",
      ...appBorder(),
      cursor: "pointer"
    },
  };

  return (
    <Box sx={styles.container}>
      <ContainerComponent
        sx={{ width: "300px", height: "525px"}}
        sxChildren={{
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0rem 1rem 1rem",
          overflow: "hidden"
        }}
      >
        <Box sx={{ ...displayCenter, flexDirection: "column" }}>
        
          <img
            style={styles.creatorBannerImage}
            src={"/1599759761026.jpg"}
            alt="photo"
          />
          <img
            style={styles.creatorImage}
            src={"/1524234960663.jpg"}
            alt="photo"
          />
          <Typography sx={styles.creatorName}>Nicolas Gabrenas</Typography>
          <Typography sx={styles.creatorTitle}>Fullstack Developer</Typography>
        </Box>

        <Box sx={{ ...displayCenter, height:"fit-content", flexDirection: "column"}}>
            <a href="https://drive.google.com/uc?id=1Qv1BKAGNTuRIPh9ezzDfswCe58n7I3dx&export=download">
                <img
                    style={styles.socialNetworkBtn}
                    src={"/CV.png"}
                    alt="photo"
                />
            </a>

            <a href="https://www.linkedin.com/in/nicolas-gabrenas-540918152/" target="_blank">
                <img
                    style={styles.socialNetworkBtn}
                    src={"/LinkedIn.png"}
                    alt="photo"
                />
            </a>

            <a href="https://github.com/Nicolas369/priority-task-app" target="_blank">                
                <img
                    style={styles.socialNetworkBtn}
                    src={"/Github.png"}
                    alt="photo"
                />
            </a>
        </Box>
      </ContainerComponent>
    </Box>
  );
};
