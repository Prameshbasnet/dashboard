// material-ui
import { Box, useMediaQuery } from "@mui/material";

// project import
import Profile from "./Profile";
import MobileSection from "./MobileSection";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <Notification /> */}
        {!matchesXs && <Profile />}
        {matchesXs && <MobileSection />}
      </div>
    </>
  );
};

export default HeaderContent;
