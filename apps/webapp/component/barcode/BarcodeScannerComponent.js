import { AppBar, Box, Button, Dialog, Grid, makeStyles, Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ButtonComponent from "../generic/ButtonComponent";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const BarcodeScanner = dynamic(() => import("./BarcodeScanner"));

const BarcodeScannerComponent = (props) => {
  return (
    <Dialog fullScreen open={props.open} onClose={props.onClose}>
      <Box bgcolor="primary.main" style={{ height: "100vh" }}>
        <Container disableGutters maxWidth={"xs"}>
          <Grid container>
            <Grid item xs={12}>
              <Box mt={5} style={{ position: "relative" }}>
                <BarcodeScanner
                  onUpdate={(err, result) => {
                    if (err) {
                      alert(err.message);
                    }
                    if (result && result.text) {
                      props.onClose(result.text);
                    }
                  }}
                />
                <Box style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}>
                  <Grid container alignItems="stretch" style={{ height: "100%", width: "100%" }}>
                    <Grid item xs={1}>
                      <Box bgcolor="primary.light" style={{ height: "100%", width: "100%", opacity: 0.3 }}></Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box style={{ height: "100%", width: "100%" }}>
                        <Grid container style={{ height: "100%", width: "100%" }}>
                          <Grid item xs={12}>
                            <Box bgcolor="primary.light" style={{ height: "100%", width: "100%", opacity: 0.3 }}></Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box style={{ height: "100%", width: "100%", position: "relative" }}>
                              <Grid container justify="center" alignItems="center" style={{ height: "100%" }}>
                                <Grid item xs={12}>
                                  <Box textAlign="center">
                                    <CameraAltIcon color="secondary" />
                                    <Typography variant="body1" color="secondary">
                                      Place barcode here
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                              <Box
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  borderTop: "2px solid #fff",
                                  borderLeft: "2px solid #fff",
                                  width: 20,
                                  height: 20,
                                }}
                              ></Box>
                              <Box
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  borderTop: "2px solid #fff",
                                  borderRight: "2px solid #fff",
                                  width: 20,
                                  height: 20,
                                }}
                              ></Box>
                              <Box
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  borderBottom: "2px solid #fff",
                                  borderLeft: "2px solid #fff",
                                  width: 20,
                                  height: 20,
                                }}
                              ></Box>

                              <Box
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                  borderBottom: "2px solid #fff",
                                  borderRight: "2px solid #fff",
                                  width: 20,
                                  height: 20,
                                }}
                              ></Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box bgcolor="primary.light" style={{ height: "100%", width: "100%", opacity: 0.3 }}></Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Box bgcolor="primary.light" style={{ height: "100%", width: "100%", opacity: 0.3 }}></Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={2} mt={2} bgcolor="primary.main">
                <ButtonComponent
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    alert("Not supported");
                  }}
                >
                  직접 입력하기
                </ButtonComponent>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Dialog>
  );
};

export default BarcodeScannerComponent;
