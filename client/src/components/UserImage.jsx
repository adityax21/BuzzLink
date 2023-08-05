import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://buzz-link-mc56-5fkk23piv-adityax21.vercel.app/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
