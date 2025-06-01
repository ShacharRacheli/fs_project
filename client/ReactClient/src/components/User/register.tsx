import { yupResolver } from "@hookform/resolvers/yup";
import { AccountCircle, Email,  Person, Visibility, VisibilityOff,Lock } from "@mui/icons-material";
import { alpha, Box, Button, Fade, IconButton,  InputAdornment, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const schema = object({
  email: string().email('Invalid email format').required('Email is required'),
  password: string().min(5, 'Password must be at least 6 characters').required('Password is required'),
  fullName: string().min(3, 'Name must be at least 3 characters').required('Name is required'),
});
const Register = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string; fullName: string }) => {

    try {
      const res = await axios.post(`${apiUrl}/api/User/register`, {
        FullName: data.fullName,
        Password: data.password,
        Email: data.email,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (res.status === 200 && res.data && res.data.token) {
        sessionStorage.setItem('token', res.data.token);
        succeedFunc(res.data.token);
        navigate('/');
        reset();

      }
      handleClose();
    } catch (e: any) {
      if ((e.response && e.response.status === 400)) {
        alert('Registration failed. Email may already exist.Please try again');
      }
    }
  }

  return (
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   closeAfterTransition
    //   sx={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Fade in={open}>
    //     <Paper
    //       elevation={10}
    //       sx={{
    //         width: '100%',
    //         maxWidth: 400,
    //         borderRadius: 2,
    //         p: 4,
    //         outline: 'none',
    //         background: 'linear-gradient(145deg, #ffffff 0%, #f9f4ff 100%)',
    //         boxShadow: '0 8px 32px rgba(100, 50, 200, 0.15)',
    //         border: '1px solid rgba(153, 102, 255, 0.1)',
    //       }}
    //     >
    //       <Typography
    //         variant="h5"
    //         component="h2"
    //         align="center"
    //         sx={{
    //           mb: 3,
    //           fontWeight: 700,
    //           color: '#5e35b1',
    //           textShadow: '0px 1px 2px rgba(0,0,0,0.05)'
    //         }}
    //       >
    //         Create an Account
    //       </Typography>

    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <TextField
    //           {...register('email')}
    //           type='email'
    //           fullWidth
    //           label="Email"
    //           variant="outlined"
    //           error={!!errors.email}
    //           helperText={errors.email?.message}
    //           sx={{
    //             mb: 3,
    //             '& .MuiOutlinedInput-root': {
    //               '& fieldset': {
    //                 borderColor: 'rgba(153, 102, 255, 0.3)',
    //                 borderRadius: 1.5,
    //               },
    //               '&:hover fieldset': {
    //                 borderColor: '#7c4dff',
    //               },
    //               '&.Mui-focused fieldset': {
    //                 borderColor: '#6200ea',
    //               },
    //             },
    //             '& .MuiInputLabel-root': {
    //               color: '#7e57c2',
    //             },
    //             '& .MuiInputLabel-root.Mui-focused': {
    //               color: '#6200ea',
    //             }
    //           }}
    //         />

    //         <TextField
    //           type={showPassword ? 'text' : 'password'}
    //           fullWidth
    //           {...register('password')}
    //           label='Password'
    //           variant="outlined"
    //           error={!!errors.password}
    //           helperText={errors.password?.message}
    //           sx={{
    //             mb: 3,
    //             '& .MuiOutlinedInput-root': {
    //               '& fieldset': {
    //                 borderColor: 'rgba(153, 102, 255, 0.3)',
    //                 borderRadius: 1.5,
    //               },
    //               '&:hover fieldset': {
    //                 borderColor: '#7c4dff',
    //               },
    //               '&.Mui-focused fieldset': {
    //                 borderColor: '#6200ea',
    //               },
    //             },
    //             '& .MuiInputLabel-root': {
    //               color: '#7e57c2',
    //             },
    //             '& .MuiInputLabel-root.Mui-focused': {
    //               color: '#6200ea',
    //             }
    //           }}
    //           slotProps={{
    //             input: {
    //               endAdornment: (
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     onClick={togglePasswordVisibility}
    //                     edge="end"
    //                     sx={{ color: '#7e57c2' }}
    //                   >
    //                     {showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               ),
    //             },
    //           }}
    //         />

    //         <TextField
    //           error={!!errors.fullName}
    //           helperText={errors.fullName?.message}
    //           type='text'
    //           fullWidth
    //           label='Full Name'
    //           variant="outlined"
    //           {...register('fullName')}
    //           sx={{
    //             mb: 3,
    //             '& .MuiOutlinedInput-root': {
    //               '& fieldset': {
    //                 borderColor: 'rgba(153, 102, 255, 0.3)',
    //                 borderRadius: 1.5,
    //               },
    //               '&:hover fieldset': {
    //                 borderColor: '#7c4dff',
    //               },
    //               '&.Mui-focused fieldset': {
    //                 borderColor: '#6200ea',
    //               },
    //             },
    //             '& .MuiInputLabel-root': {
    //               color: '#7e57c2',
    //             },
    //             '& .MuiInputLabel-root.Mui-focused': {
    //               color: '#6200ea',
    //             }
    //           }}
    //         />

    //         <Button
    //           fullWidth
    //           type='submit'
    //           variant="contained"
    //           disableElevation
    //           sx={{
    //             py: 1.5,
    //             borderRadius: 2,
    //             textTransform: 'none',
    //             fontWeight: 600,
    //             fontSize: '1rem',
    //             backgroundColor: 'purple',
    //             color: 'white',
    //             '&:hover': {
    //               backgroundColor: '#ba01cf',
    //               boxShadow: '0 4px 12px rgb(163, 3, 181)',
    //               transform: 'translateY(-1px)'
    //             },
    //             transition: 'all 0.2s ease-in-out'
    //           }}
    //         >
    //           Sign Up
    //         </Button>
    //       </form>
    //     </Paper>
    //   </Fade>
    // </Modal>
     <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 440,
            borderRadius: 4,
            overflow: "hidden",
            outline: "none",
            background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${alpha("#e2e8f0", 0.3)}`,
          }}
        >
          {/* Decorative Background Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -64,
              right: -64,
              width: 128,
              height: 128,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)",
              opacity: 0.6,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -48,
              left: -48,
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
              opacity: 0.4,
            }}
          />

          <Box sx={{ position: "relative", p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  background: "linear-gradient(135deg,rgb(239, 83, 241) 0%,rgb(158, 9, 156) 100%)",
                  boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.25)",
                  mb: 3,
                }}
              >
                <AccountCircle sx={{ fontSize: 32, color: "white" }} />
              </Box>

              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Create Account
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                Join us today and get started
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Email sx={{ fontSize: 16, color: "#6b7280" }} />
                  Email Address
                </Typography>
                <TextField
                {...register('email')}
                type="email"
                  fullWidth
                  placeholder="Enter your email"
                   error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: alpha("#ffffff", 0.7),
                      backdropFilter: "blur(8px)",
                      transition: "all 0.2s ease-in-out",
                      "& fieldset": {
                        borderWidth: 2,
                        borderColor: errors.email ? "#ef4444" : "#e2e8f0",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.email ? "#ef4444" : "#cbd5e1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.email ? "#ef4444" : "#7c3aed",
                        boxShadow: errors.email
                          ? `0 0 0 3px ${alpha("#ef4444", 0.1)}`
                          : `0 0 0 3px ${alpha("#7c3aed", 0.1)}`,
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.05)",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      mt: 0.5,
                      "&::before": {
                        content: '"•"',
                        marginRight: "4px",
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Lock sx={{ fontSize: 16, color: "#6b7280" }} />
                  Password
                </Typography>
                <TextField
                  fullWidth
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{
                            color: "#6b7280",
                            "&:hover": {
                              backgroundColor: alpha("#f1f5f9", 0.8),
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: alpha("#ffffff", 0.7),
                      backdropFilter: "blur(8px)",
                      transition: "all 0.2s ease-in-out",
                      "& fieldset": {
                        borderWidth: 2,
                        borderColor: errors.password ? "#ef4444" : "#e2e8f0",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.password ? "#ef4444" : "#cbd5e1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.password ? "#ef4444" : "#7c3aed",
                        boxShadow: errors.password
                          ? `0 0 0 3px ${alpha("#ef4444", 0.1)}`
                          : `0 0 0 3px ${alpha("#7c3aed", 0.1)}`,
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.05)",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      mt: 0.5,
                      "&::before": {
                        content: '"•"',
                        marginRight: "4px",
                      },
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Person sx={{ fontSize: 16, color: "#6b7280" }} />
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  {...register('fullName')}
                  placeholder="Enter your full name"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: alpha("#ffffff", 0.7),
                      backdropFilter: "blur(8px)",
                      transition: "all 0.2s ease-in-out",
                      "& fieldset": {
                        borderWidth: 2,
                        borderColor: errors.fullName ? "#ef4444" : "#e2e8f0",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.fullName ? "#ef4444" : "#cbd5e1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.fullName ? "#ef4444" : "#7c3aed",
                        boxShadow: errors.fullName
                          ? `0 0 0 3px ${alpha("#ef4444", 0.1)}`
                          : `0 0 0 3px ${alpha("#7c3aed", 0.1)}`,
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.05)",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      mt: 0.5,
                      "&::before": {
                        content: '"•"',
                        marginRight: "4px",
                      },
                    },
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{
                  height: 48,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  background: "linear-gradient(135deg,rgb(137, 6, 146) 0%,rgb(174, 0, 187) 100%)",
                  boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.25)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(135deg,rgb(199, 40, 217) 0%,rgb(153, 17, 162) 100%)",
                    boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.3)",
                    transform: "translateY(-2px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              >
                Create Account
              </Button>
            </Box>

            {/* Footer */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                }}
              >
                By creating an account, you agree to our{" "}
                <Box
                  component="button"
                  sx={{
                    color: "purple",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#6d28d9",
                    },
                  }}
                >
                  Terms of Service
                </Box>{" "}
                and{" "}
                <Box
                  component="button"
                  sx={{
                    color: "purple",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#6d28d9",
                    },
                  }}
                >
                  Privacy Policy
                </Box>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
}
export default Register;
