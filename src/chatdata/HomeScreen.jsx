import React, { useEffect, useState } from "react";
import "../assets/css/_homescreen.scss";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
function HomeScreen() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 6000);
  }, []);
  const homescreen = {
    backgroundColor: loading ? "black" : null,
    width: "100%",
    height: "100vh",
  };
  return (
    <Box>
      <Box className="homescreen" style={homescreen}>
        <Box>
          <Box>
            {loading ? (
              <Box className="loader">
                <DotLoader
                  color="green"
                  size={100}
                  loading={loading}
                ></DotLoader>
              </Box>
            ) : (
              <Box>
                <img
                  data-aos="zoom-out"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeScreen;
