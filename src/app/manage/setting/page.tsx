"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  TextField,
} from '@mui/material';

export default function SettingsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notifications
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Email Notifications"
                secondary="Receive email updates about your invoices"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Invoice Alerts"
                secondary="Get notified when invoices are due"
              />
              <ListItemSecondaryAction>
                <Switch defaultChecked />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Monthly Reports"
                secondary="Receive monthly summary reports"
              />
              <ListItemSecondaryAction>
                <Switch />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Company Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Company Name"
              defaultValue="Acme Corporation"
              fullWidth
            />
            <TextField
              label="Business Email"
              defaultValue="contact@acmecorp.com"
              fullWidth
            />
            <TextField
              label="Phone Number"
              defaultValue="+1 (555) 123-4567"
              fullWidth
            />
            <TextField
              label="Address"
              defaultValue="123 Business Street, Suite 100"
              fullWidth
              multiline
              rows={2}
            />
            <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
