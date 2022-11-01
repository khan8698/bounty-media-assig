import { Container, Grid, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Loading from "../components/loading";
import { getAllCountries, getCountriesByRegion } from "../Services/API";

function Home() {
  const [countriesList, setCountriesList] = useState<Array<any>>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const [isLoading, setIsLoading] = useState(false);

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
      {/* <header>
        Where in the world
        <span>Dark Mpde</span>
      </header> */}

      <Header />

      <Container maxWidth="lg">
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                }}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={""}> - </MenuItem>
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
                    <Grid item lg={3} xs={12} key={i}>
                      <img src={country.flags.png} alt={country.name.common} />
                      <div>Country Name: {country.name.common}</div>
                      <div>Population {country.population}</div>
                      <div>Region: {country.region} </div>
                      <div>Capital: {country.capital?.join(",")}</div>
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
