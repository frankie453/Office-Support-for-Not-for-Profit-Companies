import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { Box, Typography, Card, CardContent, CardActions, IconButton, Link } from '@mui/material';
import { Email as EmailIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { loginRequest, graphConfig } from "../authConfig";
import { BASE_URL } from '../constants';

interface Email {
  id: string;
  subject: string;
  from?: {
    emailAddress?: {
      address?: string;
      name?: string;
    }
  };
  sender?: {
    emailAddress?: {
      address?: string;
      name?: string;
    }
  };
  receivedDateTime: string;
  bodyPreview: string;
  categories: string[];
}

interface EmailViewProps {
  category?: string;
  onEmailCountChange?: (count: number) => void;
  limit?: number;
}

const EmailView: React.FC<EmailViewProps> = ({ category, onEmailCountChange, limit }) => {
  const { instance } = useMsal();
  const [emails, setEmails] = useState<Email[]>(() => {
    const cachedEmails = sessionStorage.getItem(`emails-${category}`);
    return cachedEmails ? JSON.parse(cachedEmails) : [];
  });
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (!shouldFetch) return;

    const getEmails = async () => {
      try {
        const token = await instance.acquireTokenSilent(loginRequest);
        console.log('Token:', token.accessToken);

        const response = await fetch(`${BASE_URL}api/emails/${category ? `?category=${category}` : ''}`, {
          headers: {
            'Authorization': `Bearer ${token.accessToken}`,
            'Accept': 'application/json'
          }
        });

        console.log('Response:', response);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Error fetching emails: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Emails data:', data);
        
        if (data.value) {
          setEmails(data.value);
          sessionStorage.setItem(`emails-${category}`, JSON.stringify(data.value));
          if (onEmailCountChange) {
            onEmailCountChange(data.value.length);
          }
        } else {
          console.error('Unexpected data format:', data);
        }
        setShouldFetch(false);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    getEmails();
  }, [instance, category, onEmailCountChange, shouldFetch]);

  useEffect(() => {
    setShouldFetch(true);
  }, [category]);

  return (
    <Box sx={{ mt: 2 }}>
      {emails.length === 0 ? (
        <Typography variant="body1">No emails found</Typography>
      ) : (
        (limit ? emails.slice(0, limit) : emails).map(email => {
          const sender = email.from?.emailAddress || email.sender?.emailAddress;
          return (
            <Card key={email.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {email.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <EmailIcon fontSize="small" /> {sender?.name || 'Unknown'} {sender?.address ? `<${sender.address}>` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Received: {new Date(email.receivedDateTime).toLocaleString()}
                </Typography>
                {email.categories && email.categories.length > 0 ? (
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    {email.categories.map(cat => (
                      <Typography 
                        key={cat} 
                        variant="body2" 
                        sx={{ 
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        {cat}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1,
                      bgcolor: 'grey.300',
                      color: 'text.secondary',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      display: 'inline-block'
                    }}
                  >
                    Uncategorized
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {email.bodyPreview}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`https://outlook.office.com/mail/inbox/id/${email.id}`} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="open in Outlook">
                    <OpenInNewIcon />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default EmailView; 