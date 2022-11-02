import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import { Grid, IconButton } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Where in the world?
              </Typography>
            </Grid>
            <Grid item xs={6} justifyContent="flex-end">
              <IconButton>
                <NightlightOutlinedIcon />
              </IconButton>
              Dark Mode
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
