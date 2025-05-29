import { Button, Fade, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { getEmailByToken, getUserIdByToken } from "../store/getFromToken";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
const apiUrl = import.meta.env.VITE_APP_API_URL;

const schema = object({
  email: string().email('Invalid email format').required('Email is required'),
  fullName: string().min(5, 'Name must be at least 6 characters').required('Name is required'),
});
const Update = ({ succeedFunc, open, handleClose }: { succeedFunc: Function, open: boolean, handleClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: { email: string; fullName: string }) => {
    const userId = getUserIdByToken();
    console.log("in updateeeeeeeeeeeee");
    console.log(userId);

    try {
      const res = await axios.put(`${apiUrl}/api/User/${userId}`, {
        Email: data.email || getEmailByToken(),
        FullName: data.fullName,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (res.data && res.data.token) {
        sessionStorage.setItem('token', res.data.token);
        succeedFunc(res.data.token);
        // window.location.reload();
      }
      handleClose();
    } catch (e: any) {
      if ((e.response && e.response.status === 404) || e.response.status === 400) {
        alert('Email or password are not correct');
      } else if (e.response && e.response.status === 409) {
        alert('Email already exists.');
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={10}
          sx={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
            p: 4,
            outline: 'none',
            background: 'linear-gradient(145deg, #ffffff 0%, #f9f4ff 100%)',
            boxShadow: '0 8px 32px rgba(100, 50, 200, 0.15)',
            border: '1px solid rgba(153, 102, 255, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: '#5e35b1',
              textShadow: '0px 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            Update Profile
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('fullName')}
              type='text'
              fullWidth
              label='Full Name'
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(153, 102, 255, 0.3)',
                    borderRadius: 1.5,
                  },
                  '&:hover fieldset': {
                    borderColor: '#7c4dff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6200ea',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#7e57c2',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6200ea',
                }
              }}
            />
            <TextField
              type='email'
              fullWidth
              label="Email"
              {...register('email')}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(153, 102, 255, 0.3)',
                    borderRadius: 1.5,
                  },
                  '&:hover fieldset': {
                    borderColor: '#7c4dff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6200ea',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#7e57c2',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6200ea',
                }
              }}
            />

            <Button
              fullWidth
              type='submit'
              variant="contained"
              disableElevation
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                backgroundColor: 'purple',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ba01cf',
                  boxShadow: '0 4px 12px rgb(163, 3, 181)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};
export default Update;
