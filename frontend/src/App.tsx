import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './App.css';
import { CustomInputs } from './components/Input';
import axios from 'axios';
import moment from 'moment';

const FirstItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flex: '1 1 auto',
  height: '77vh',
}));

const SecondItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'fixed',
  bottom: '20px',
  width: '70%',
}));

function App() {
  const [prompt, setPrompt] = useState('');
  const [propmtData, setPromptData] = useState<any[]>([]);

  const handleInputChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      request: {
        type: 'USER',
        createdAt: Date.now(),
        isPositive: true,
        message: prompt,
        sources: [
          {
            title: 'Summarize layup demo script.doc',
            url: 'https://docs.google.com/document/d/sample-url1',
          },
        ],
        usageId: 'usageId',
      },
    };

    setPromptData((prev: any[]) => [...prev, data]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/chatblock`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
          },
        }
      );

      const res = [response.data];
      setPromptData((prev: any[]) => [
        ...prev.slice(0, prev.length - 1),
        ...res,
      ]);

    } catch (error) {
      // Handle the error
      console.log(error);
    }
    setPrompt('');
  };

  return (
    <Box sx={{ width: '70%', mx: 'auto' }}>
      <Typography variant="h2">Weather report</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <FirstItem>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'start',
                gap: '10px',
                padding: '10px',
                backgroundColor: 'white',
                '&::-webkit-scrollbar': {
                  borderRadius: '10px',
                  width: '5px',
                  backgroundColor: 'white',
                },
              }}
            >
              {propmtData.length > 0 ? (
                propmtData.map((item, index) => (
                  <Box sx={{ width: '100%' }} key={index} >
                    {item.request && (
                      <Box>
                        <Typography textAlign={'end'}>
                          {item.request.type}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            gap: '10px',
                            padding: '4px',
                            borderRadious: '10px',
                          }}
                        >
                          <Box
                            sx={{
                              padding: '6px',
                              borderRadius: '4px',
                              backgroundColor: '#276cd2',
                              color: 'white',
                            }}
                          >
                            <Typography>{item.request.message}</Typography>
                          </Box>
                        </Box>
                        <Typography textAlign={'end'}>
                          {moment(item.request.createdAt).fromNow()}
                        </Typography>
                      </Box>
                    )}
                    {item.response && (
                      <Box>
                        <Typography textAlign={'start'}>
                          {item.response.type}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            gap: '10px',
                          }}
                        >
                          <Box
                            sx={{
                              padding: '6px',
                              borderRadius: '4px',
                              backgroundColor: '#E7EBF0',
                            }}
                          >
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: item.response.message,
                              }}
                            ></Typography>
                          </Box>
                        </Box>
                        <Typography textAlign={'start'}>
                          {moment(item.response.createdAt).fromNow()}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))
              ) : (
                <Typography textAlign={'center'} width={'100%'}>
                  No Messages
                </Typography>
              )}
            </Box>
          </FirstItem>
        </Grid>
        <Grid item xs={12}>
          <SecondItem>
            <form
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                flexDirection: 'row',
                gap: '10px',
                height: '100%',
              }}
            >
              <CustomInputs multiline onInput={handleInputChange} value={prompt}  />
              <Button
                variant="outlined"
                color="primary"
                size="large"
                type="submit"
              >
                <SendIcon />
              </Button>
            </form>
          </SecondItem>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
