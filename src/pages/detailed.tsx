import { Container, Grid, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import { getCountryData } from "../Services/API";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CountryDetail() {
  const [searchParams] = useSearchParams();
  const countryName = searchParams.get("country") || "";

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
      <Container maxWidth="lg">
        <div>
          <button>
            <IconButton sx={{ p: 0 }}>
              <ArrowBackIcon />
            </IconButton>
            Back
          </button>
        </div>
        <div>
          <Grid container>
            {isLoading || !countryData ? (
              <Loading />
            ) : (
              <>
                <Grid item lg={3} xs={12}>
                  <img
                    src={countryData.flags.png}
                    alt={countryData.name.common}
                  />
                </Grid>
                <Grid item lg={3} xs={12}>
                  <div>Native Name: {countryData.name.common}</div>
                  <div>Population {countryData.population}</div>
                  <div>Region: {countryData.region} </div>
                  <div>Sub Region: {countryData.subregion} </div>
                  <div>Capital: {countryData.capital?.join(",")}</div>
                  <div>Top level Domain: {countryData.tld?.join(",")}</div>
                  <div>Currencies: {getCurrency(countryData.currencies)}</div>
                  <div> Languages: {getLanguages(countryData.languages)}</div>
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
