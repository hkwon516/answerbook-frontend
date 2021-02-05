import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const BarcodeScannerComponent = ({ onUpdate }) => {
  const webcamRef = useRef(null);
  const { BrowserBarcodeReader } = require("@zxing/library");
  const codeReader = new BrowserBarcodeReader();
  const [device, setDevice] = useState(undefined);

  const initReader = async () => {
    const devices = await codeReader.getVideoInputDevices();
    if (devices && devices[0]) {
      setDevice(devices[0]);
    } else {
      onUpdate(new Error("Device Error"));
    }
  };

  const read = async () => {
    try {
      const result = await codeReader.decodeOnceFromVideoDevice(device.deviceId);

      onUpdate(undefined, result);
    } catch (error) {
      onUpdate(error);
    }
  };

  useEffect(() => {
    if (device && device.deviceId) {
      read();
    }
  }, [device]);

  useEffect(() => {
    initReader();
  }, []);

  return device && device.deviceId ? (
    <Webcam
      ref={webcamRef}
      width="100%"
      height="100%"
      screenshotFormat="image/png"
      videoConstraints={{
        facingMode: "environment",
        aspectRatio: 0.7,
        deviceId: device.deviceId,
      }}
    />
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default BarcodeScannerComponent;
