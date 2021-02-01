import React from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";
import Webcam from "react-webcam";

const BarcodeScannerComponent = ({ onUpdate }) => {
  const webcamRef = React.useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (imageSrc) {
      codeReader
        .decodeFromImage(undefined, imageSrc)
        .then((result) => {
          onUpdate(null, result);
        })
        .catch((err) => {
          onUpdate(err);
        });
    }
  }, [codeReader, onUpdate]);

  React.useEffect(() => {
    setInterval(capture, 100);
  }, []);

  return (
    <Webcam
      ref={webcamRef}
      width="100%"
      height="100%"
      screenshotFormat="image/png"
      videoConstraints={{
        facingMode: "environment",
        aspectRatio: 0.7,
        
      }}
    />
  );
};

export default BarcodeScannerComponent;
