import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import { getAllCountries, getCountriesByRegion } from "../Services/API";

import "./styles.css";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";

function Home() {
  const [countriesList, setCountriesList] = useState<Array<any>>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const getAllCountriesList = () => {
    setIsLoading(true);
    getAllCountries()
      .then((response) => response.json())
      .then(
        (data: any) => {
          setCountriesList(data);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedRegion) {
      getCountriesByRegion(selectedRegion)
        .then((response) => response.json())
        .then(
          (data: any) => {
            setCountriesList(data);
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getAllCountriesList();
    }
  }, [selectedRegion]);

  return (
    <div className="App">
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", backgroung: "inherit" }}
            >
              <div>
                <FormControl
                  fullWidth
                  sx={{ marginTop: 16, width: "200%", boxShadow: 3 }}
                >
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{ p: 2, paddingRight: 1 }}
                      >
                        <SearchIcon />
                      </InputAdornment>
                    }
                    placeholder="Search for a Country"
                  />
                </FormControl>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Select
                displayEmpty
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                }}
                sx={{
                  marginTop: 16,
                  width: "25%",
                  float: "right",
                  marginRight: "2rem",
                }}
                label="Regions"
                // onChange={handleChange}
              >
                <MenuItem value=""> - </MenuItem>
                {regions.map((region, i) => {
                  return (
                    <MenuItem key={i} value={region}>
                      {region}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </Grid>
        </Grid>
        <div>
          <Grid container>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {countriesList.map((country, i) => {
                  return (
                    <Grid
                      item
                      onClick={() => {
                        navigate(`detail?country=${country.name.common}`);
                      }}
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                      key={i}
                    >
                      <Card
                        sx={{
                          maxWidth: 345,
                          marginTop: 8,
                          marginX: "8",
                          padding: 2,
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            image={country.flags.png}
                            alt={country.name.common}
                            sx={{ height: "150px" }}
                          />
                          <CardContent
                            sx={{ height: "150px", textAlign: "left" }}
                          >
                            <div>
                              <h2>{country.name.common}</h2>
                            </div>
                            <div>Population {country.population}</div>
                            <div>Region: {country.region} </div>
                            <div>Capital: {country.capital?.join(",")}</div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Home;
