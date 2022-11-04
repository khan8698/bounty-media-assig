import { Box, Container, Grid, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import { getCountryData } from "../Services/API";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CountryDetail() {
  const [searchParams] = useSearchParams();
  const countryName = searchParams.get("country") || "";
  let navigate = useNavigate();

  const [countryData, setCountryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const getData = useCallback(() => {
    if (countryName) {
      setIsLoading(true);
      getCountryData(countryName)
        .then((response: any) => response.json())
        .then(
          (data: any) => {
            setCountryData(data.length ? data[0] : null);
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [countryName]);

  useEffect(() => {
    getData();
  }, [countryName, getData]);

  const getCurrency = (currency: any) => {
    let curr = Object.keys(currency);
    return `${currency[curr[0]]["name"]} (${currency[curr[0]]["symbol"]})`;
  };

  const getLanguages = (language: any) => {
    let curr = Object.keys(language);
    return curr.reduce((a, b) => {
      return a + " " + language[b];
    }, "");
  };

  return (
    <div className="App">
      <Header />
      <Container maxWidth="xl" sx={{ marginTop: 16, width: "200%" }}>
        <div>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", backgroung: "inherit" }}
          >
            <button
              onClick={() => {
                navigate("/");
              }}
              style={{ padding: 12, border: 0 }}
            >
              <IconButton sx={{ p: 0 }}>
                <ArrowBackIcon />
              </IconButton>
              Back
            </button>
          </Box>
        </div>
        <div>
          <Grid container sx={{ marginTop: 6, textAlign: "left" }}>
            {isLoading || !countryData ? (
              <Loading />
            ) : (
              <>
                <Grid item lg={3} md={12} xs={12}>
                  <img
                    src={countryData.flags.png}
                    alt={countryData.name.common}
                  />
                </Grid>
                <Grid item lg={9} md={12} xs={12}>
                  <Grid container item>
                    <Grid lg={6} xs={12} item>
                      <div>
                        <h1>{countryData.name.common}</h1>
                      </div>
                      <div>Native Name: {countryData.name.common}</div>
                      <div>Population {countryData.population}</div>
                      <div>Region: {countryData.region} </div>
                      <div>Sub Region: {countryData.subregion} </div>
                      <div>Capital: {countryData.capital?.join(",")}</div>
                    </Grid>
                    <Grid lg={6} xs={12} item>
                      <div>Top level Domain: {countryData.tld?.join(",")}</div>
                      <div>
                        Currencies: {getCurrency(countryData.currencies)}
                      </div>
                      <div>
                        {" "}
                        Languages: {getLanguages(countryData.languages)}
                      </div>
                    </Grid>
                    {/* <div>Border Countries:</div> */}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default CountryDetail;
