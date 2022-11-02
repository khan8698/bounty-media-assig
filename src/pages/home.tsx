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
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import { getAllCountries, getCountriesByRegion } from "../Services/API";

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
          console.log(data);
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
            <TextField
              id="filled-search"
              label="Search for a country..."
              type="search"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <div>
              <Select
                displayEmpty={false}
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                }}
                label="Age"
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
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={country.flags.png}
                            alt={country.name.common}
                          />
                          <CardContent>
                            <div>Country Name: {country.name.common}</div>
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
