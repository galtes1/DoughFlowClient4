import React, { useEffect } from "react";
import { Container, Typography, Button, Box, Grid , Paper} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Users/Providers/UserProvider";

import theme from "../../Styles/theme";
import { motion } from "framer-motion";


export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) navigate("/summary");
  }, [user, navigate]);

  // אנימציות
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          backgroundColor: theme.colors.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={4}
                sx={{
                  p: 5,
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text,
                  borderRadius: 4,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  Welcome to DoughFlow
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                  Your personal finance tracker. Plan smart. Spend wisely. Save more.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate("/signup")}
                      sx={{
                        backgroundColor: theme.colors.success,
                        color: theme.colors.text,
                        fontWeight: "bold",
                        px: 4,
                        py: 1.2,
                        '&:hover': {
                          backgroundColor: "#b4d1b4",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate("/login")}
                      sx={{
                        borderColor: theme.colors.border,
                        color: theme.colors.text,
                        fontWeight: "bold",
                        px: 4,
                        py: 1.2,
                        '&:hover': {
                          backgroundColor: theme.colors.secondary,
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
                   <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/avatars/NewLogo.png`}
                alt="Finance illustration"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  display: "block",
                  mx: "auto",
                }}
              />
            </motion.div>
          </Grid>               
          
        </Grid>
      </Container>
    </motion.div>
  );
}