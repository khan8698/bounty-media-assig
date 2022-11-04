import { Container, Grid, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import { getCountryData } from "../Services/API";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
      <Container maxWidth="xl" sx={{ marginTop: 16, width: "100%" }}>
        <div>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", backgroung: "inherit" }} 
          >
            <Button
              onClick={() => {
                navigate("/");
              }}
              sx={{ paddingRight: 4 ,paddingLeft: 3 ,borderRadius: '7px' ,background:"white" , border:"3px solid white" , boxShadow: 3, color:"black"
            }}
            >
              <IconButton sx={{ p: 0 }}>
                <ArrowBackIcon />
              </IconButton>
              Back
            </Button>
          </Box>
        </div>
        <div>
          <Grid container sx={{ marginTop: 6, textAlign: "left" }}>
            {isLoading || !countryData ? (
              <Loading />
            ) : (
              <>
                
                <Grid item lg={4} md={5} xs={12} sm={12} xl={4} >
                  <img
                    src={countryData.flags.png}
                    alt={countryData.name.common}
                  />
                </Grid>
                <Grid item lg={8}md={7} xl={8} sm={12} xs={12} sx={{width: "100%", background:""}}>

                  <Grid container lg={12} xs={12} item md={12}>

                    <Grid lg={4} md={5} sm={12} xs={12} item sx={{background:""}}>
                      <h2>{countryData.name.common}</h2>
                       <div>Native Name: {countryData.name.common}</div>
                      <div>Population {countryData.population}</div>
                      <div>Region: {countryData.region} </div>
                      <div>Sub Region: {countryData.subregion} </div>
                      <div>Capital: {countryData.capital?.join(",")}</div>
                    </Grid>

                    <Grid lg={4} md={7} sm={12} xs={12} item >
                      <div className="cData">
                      <div>Top level Domain: {countryData.tld?.join(",")}</div>
                      <div>Currencies: {getCurrency(countryData.currencies)}</div>
                      <div>{" "}Languages: {getLanguages(countryData.languages)}</div>
                      </div>
                    </Grid>
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
